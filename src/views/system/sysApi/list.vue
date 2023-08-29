<template>
  <div class="app-container">
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="接口名称">
              <el-input
                v-model="searchObj.apiName"
                style="width: 100%"
                placeholder="接口名称"
              />
            </el-form-item>
          </el-col>
          <!-- 路径 -->
          <el-col :span="8">
            <el-form-item label="访问地址">
              <el-input
                v-model="searchObj.path"
                style="width: 100%"
                placeholder="访问地址"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display: flex">
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="fetchData()"
            >搜索</el-button
          >
          <el-button icon="el-icon-refresh" size="mini" @click="resetData"
            >重置</el-button
          >
        </el-row>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%; margin-top: 10px"
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="apiName" label="接口名称" />
      <el-table-column prop="path" label="接口路径" />
      <el-table-column prop="httpMethod" label="HTTP 方法" />
      <el-table-column prop="parameterName" label="参数名称" />
      <el-table-column prop="parameterType" label="参数类型" />
      <el-table-column prop="requestParameters" label="请求参数示例(json)" />
      <el-table-column
        prop="responseDataStructure"
        label="响应数据示例(json)"
      ></el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-receiving"
            size="mini"
            @click="invoke(scope.row.id)"
          />
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit(scope.row.id)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeDataById(scope.row.id)"
          />
          <el-button
            type="primary"
            icon="el-icon-view"
            size="mini"
            @click="showAssociatedProjects(scope.row.id)"
          />
          <el-button
            v-if="scope.row.httpMethod === 'GET'"
            type="primary"
            icon="el-icon-s-tools"
            size="mini"
            @click="assignSimulation()"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="tools-div">
      <el-button type="success" icon="el-icon-plus" size="mini" @click="add"
        >添 加</el-button
      >
    </div>
    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%">
      <el-form
        ref="dataForm"
        :model="sysApi"
        label-width="150px"
        size="small"
        style="padding-right: 40px"
      >
        <el-form-item label="接口名称">
          <el-input v-model="sysApi.apiName" />
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="sysApi.path" />
        </el-form-item>
        <el-form-item label="HTTP 方法">
          <el-input v-model="sysApi.httpMethod" />
        </el-form-item>
        <el-form-item label="参数名称">
          <el-input v-model="sysApi.parameterName" />
        </el-form-item>
        <el-form-item label="参数类型">
          <el-input v-model="sysApi.parameterType" 
             type="textarea"
            :rows="2"/>
        </el-form-item>
        <el-form-item label="请求参数示例(json)">
          <el-input
            v-model="sysApi.requestParameters"
            type="textarea"
            :rows="15"
          />
        </el-form-item>
        <el-form-item label="响应数据示例(json)">
          <el-input
            v-model="sysApi.responseDataStructure"
            type="textarea"
            :rows="15"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="small"
          icon="el-icon-refresh-right"
          @click="dialogVisible = false"
          >取 消</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-check"
          size="small"
          @click="saveOrUpdate"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog title="调用接口" :visible.sync="invokeDialog" width="60%">
      <el-form
        ref="invokeForm"
        :model="Parameters"
        label-width="150px"
        size="small"
        style="padding-right: 40px"
      >
        <el-form-item label="路径">
          <el-input v-model="Parameters.url" />
        </el-form-item>
        <el-form-item label="HTTP 方法">
          <el-input v-model="Parameters.method" />
        </el-form-item>
        <el-form-item label="参数名称">
          <el-input v-model="Parameters.parameterName" />
        </el-form-item>
        <el-form-item label="参数类型">
          <el-input v-model="Parameters.parameterType" />
        </el-form-item>
        <el-form-item label="请求参数示例(json)">
          <el-input
            v-model="Parameters.exampleParameters"
            type="textarea"
            :rows="8"
          />
        </el-form-item>
        <!-- 动态显示路径参数输入框 -->
        <el-form-item
          v-for="(param, index) in Parameters.pathParameter"
          :key="index"
          :label="param.name"
        >
          <el-input v-model="param.value" />
        </el-form-item>
        <!-- 输入请求参数 -->
        <el-form-item
          label="请求参数(不可为空且应是json)"
          v-if="showRequestParameterInput"
        >
          <el-input
            v-model="Parameters.requestParameter"
            type="textarea"
            :rows="8"
          />
        </el-form-item>
        <!-- 响应格式 -->
        <el-form-item label="响应数据格式" v-if="responseData">
          <el-select
            v-model="responseDataFormat"
            placeholder="请选择响应数据格式"
          >
            <el-option label="JSON" value="json" />
            <el-option label="XML" value="xml" />
            <el-option label="YAML" value="yaml" />
          </el-select>
          <el-button type="primary" @click="formatInvoke">确定转化</el-button>
        </el-form-item>

        <!-- 响应回显 -->
        <el-form-item label="响应数据">
          <pre
            style="
              width: 100%;
              max-width: 500px;
              max-height: 300px;
              overflow: auto;
            "
            >{{ responseData }}</pre
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          icon="el-icon-check"
          size="small"
          @click="invokeApi"
          >调 用</el-button
        >
        <el-button
          size="small"
          icon="el-icon-refresh-right"
          @click="closeInvokeDialog"
          >退 出</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="关联项目"
      :visible.sync="showAssociatedDialog"
      width="60%"
    >
      <div
        v-if="Item.returnItem && Item.returnItem.length > 0"
        class="associated-projects"
      >
        <div
          v-for="projectName in Item.returnItem"
          :key="projectName"
          class="project-block"
        >
          {{ projectName }}
        </div>
      </div>
      <div v-else>暂无关联项目</div>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="small"
          icon="el-icon-refresh-right"
          @click="closeAssociatedDialog"
        >
          关 闭
        </el-button>
      </span>
    </el-dialog>

    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />
  </div>
</template>

<script>
import api from "@/api/system/api"; // 导入前端 API
import Api from "@/api/system/format";
import apiApi from "@/api/system/itemApi";

export default {
  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      limit: 3,
      listLoading: false,
      searchObj: {
        apiName: "",
      },
      dialogVisible: false,
      sysApi: {
        apiName: "",
        path: "",
        httpMethod: "",
        parameterName: "",
        parameterType: "",
        responseDataStructure: "",
        requestParameters: {},
      },
      invokeDialog: false,
      Parameters: {
        id: "",
        url: "",
        method: "",
        parameterName: "",
        parameterType: "",
        requestParameter: [],
        exampleParameters: {},
        pathParameter: {},
        requestValue: [],
        requestKey: [],
      },
      responseData: "",
      responseDataFormat: "json",
      showAssociatedDialog: false,
      FormatObj: {
        data: "",
        updateFormat: "",
      },
      Item: {
        returnItem: "",
      },
    };
  },
  mounted() {
    this.fetchData();
  },

  computed: {
    showRequestParameterInput() {
      const isGetOrDelete =
        this.Parameters.method === "GET" || this.Parameters.method === "DELETE";
      const isSinglePathParam = this.Parameters.pathParameter.length >0;
      return !isGetOrDelete || !isSinglePathParam;
    },
  },
  methods: {
    fetchData(page = 1) {
      debugger;
      this.page = page;
      if (this.createTimes && this.createTimes.length == 2) {
        this.searchObj.createTimeBegin = this.createTimes[0];
        this.searchObj.createTimeEnd = this.createTimes[1];
      }

      api
        .getPageList(this.page, this.limit, this.searchObj)
        .then((response) => {
          // this.list = response.data.list
          this.list = response.data.records;
          this.total = response.data.total;

          // 数据加载并绑定成功
          this.listLoading = false;
        });
    },
     assignSimulation() {
      this.$router.push(
        "/system/assignSimulation"
      );
    },

    // 重置查询表单
    resetData() {
      console.log("重置查询表单");
      this.searchObj = {};
      this.createTimes = [];
      this.fetchData();
    },

    edit(id) {
      this.dialogVisible = true;
      api.getById(id).then((response) => {
        this.sysApi = response.data;
      });
    },
    invoke(id) {
      api
        .getById(id)
        .then((response) => {
          this.Parameters.id = response.data.id;
          this.Parameters.url = response.data.path;
          this.Parameters.method = response.data.httpMethod;
          this.Parameters.exampleParameters = response.data.requestParameters;
          this.Parameters.parameterName = response.data.parameterName;
          this.Parameters.parameterType = response.data.parameterType;
          const matches = response.data.path.match(/\{([^}]+)\}/g);
          const pathParameters = matches
            ? matches.map((match) => ({ name: match.slice(1, -1), value: "" }))
            : [];

          this.Parameters.pathParameter = pathParameters;

          this.invokeDialog = true;
        })
        .catch((error) => {
          this.$message.error("获取信息失败");
        });
    },
    replaceBracketsWithCurlyBraces(data) {
      return JSON.stringify(data).replace(/\[/g, "{").replace(/\]/g, "}");
    },

    invokeApi() {
      const requestParamsInput = this.Parameters.requestParameter;
      if (this.Parameters.method === "POST") {
        if (
          requestParamsInput == null ||
          requestParamsInput == "" ||
          requestParamsInput == "[object Object]"
        ) {
          this.$message.error("请求参数不能为空");
          return;
        }
        let requestObject;
        try {
          requestObject = JSON.parse(requestParamsInput);
        } catch (error) {
          this.$message.error("请求参数格式不正确");
          return;
        }
        const keys = Object.keys(requestObject);
        if (keys.length === 0) {
          this.$message.error("请求参数不能为空对象");
          return;
        }
        const requestKeyList = [];
        const requestValueList = [];
        for (const key of keys) {
          const value = requestObject[key];
          requestKeyList.push(key);
          requestValueList.push(value);
        }
        this.Parameters.requestKey = requestKeyList;
        this.Parameters.requestValue = requestValueList;
        api
          .invokeAddApi(this.Parameters)
          .then((response) => {
            this.responseData = response;
            this.$message.success("调用成功");
          })
          .catch((error) => {
            this.responseData = error.response.data;
            this.$message.error("调用失败");
          });
      } else if (this.Parameters.method === "PUT") {
        if (
          requestParamsInput == null ||
          requestParamsInput == "" ||
          requestParamsInput == "[object Object]"
        ) {
          this.$message.error("请求参数不能为空");
          return;
        }
        if (this.Parameters.pathParameter.length > 0) {
          const pathParameter = this.Parameters.pathParameter[0];
          if (pathParameter.value == null || pathParameter.value == "") {
            this.$message.error("路径参数不能为空");
            return;
          }
        }
        let requestObject;
        try {
          requestObject = JSON.parse(requestParamsInput);
        } catch (error) {
          this.$message.error("请求参数格式不正确");
          return;
        }

        const keys = Object.keys(requestObject);
        if (keys.length === 0) {
          this.$message.error("请求参数不能为空对象");
          return;
        }

        const requestKeyList = [];
        const requestValueList = [];

        // 动态获取属性并添加到数组中
        keys.forEach((key) => {
          requestKeyList.push(key);
          requestValueList.push(requestObject[key]);
        });
        this.Parameters.requestKey = requestKeyList;
        this.Parameters.requestValue = requestValueList;

        const pathParametersForApiCall = {};
        this.Parameters.pathParameter.forEach((param) => {
          pathParametersForApiCall[param.name] = param.value;
        });

        // ...

        // 将路径参数与其他参数合并，用于 API 调用
        const parametersForApiCall = {
          ...this.Parameters,
          pathParameter: pathParametersForApiCall,
        };
        api
          .invokeUpdateApi(parametersForApiCall)
          .then((response) => {
            this.responseData = response;

            this.$message.success("调用成功");
          })
          .catch((error) => {
            this.responseData = error.response.data;
            this.$message.error("调用失败");
          });
      } else if (this.Parameters.method === "DELETE") {
        if (
          this.Parameters.pathParameter.length > 0 &&
          this.Parameters.requestParameter.length === 0
        ) {
          // 只有路径参数的情况
          for (const pathParameter of this.Parameters.pathParameter) {
            if (pathParameter.value == null || pathParameter.value === "") {
              this.$message.error("路径参数不能为空");
              return;
            }
          }
          const pathParametersForApiCall = {};
          this.Parameters.pathParameter.forEach((param) => {
            pathParametersForApiCall[param.name] = param.value;
          });
          // 执行 DELETE 调用
          this.Parameters.requestParameter = null;

          // 将路径参数与其他参数合并，用于 API 调用
          const parametersForApiCall = {
            ...this.Parameters,
            pathParameter: pathParametersForApiCall,
          };
          // 执行 DELETE 调用
          this.Parameters.requestParameter = null;
          api
            .invokeDeleteApi(parametersForApiCall)
            .then((response) => {
              this.responseData = response;
              this.$message.success("调用成功");
            })
            .catch((error) => {
              this.responseData = error.response.data;
              this.$message.error("调用失败");
            });
        } else {
          // 不只有路径参数的情况
          if (
            requestParamsInput == null ||
            requestParamsInput == "" ||
            requestParamsInput == "[object Object]"
          ) {
            this.$message.error("请求参数不能为空");
            return;
          }

          let requestObject;
          try {
            requestObject = JSON.parse(requestParamsInput);
          } catch (error) {
            this.$message.error("请求参数格式不正确");
            return;
          }

          const keys = Object.keys(requestObject);
          if (keys.length === 0) {
            this.$message.error("请求参数不能为空对象");
            return;
          }

          const pathParametersForApiCall = {};
          this.Parameters.pathParameter.forEach((param) => {
            pathParametersForApiCall[param.name] = param.value;
          });

          // ...

          // 将路径参数与其他参数合并，用于 API 调用
          const parametersForApiCall = {
            ...this.Parameters,
            pathParameter: pathParametersForApiCall,
          };

          api
            .invokeDeleteApi(parametersForApiCall)
            .then((response) => {
              this.responseData = response;
              this.$message.success("调用成功");
            })
            .catch((error) => {
              this.responseData = error.response.data;
              this.$message.error("调用失败");
            });
        }
      } else if (this.Parameters.method === "GET") {
        if (
          this.Parameters.pathParameter.length > 0 &&
          this.Parameters.requestParameter.length === 0
        )
          for (const pathParameter of this.Parameters.pathParameter) {
            if (pathParameter.value == null || pathParameter.value === "") {
              this.$message.error("路径参数不能为空");
              return;
            }
          }
        const pathParametersForApiCall = {};
        this.Parameters.pathParameter.forEach((param) => {
          pathParametersForApiCall[param.name] = param.value;
        });

        // 将路径参数与其他参数合并，用于 API 调用
        const parametersForApiCall = {
          ...this.Parameters,
          pathParameter: pathParametersForApiCall,
        };

        api
          .invokeGetApi(parametersForApiCall)
          .then((response) => {
            this.responseData = response;
            this.$message.success("调用成功");
          })
          .catch((error) => {
            this.responseData = error.response.data;
            this.$message.error("调用失败");
          });
      }else {
        this.$message.error("请求方法不是 POST,PUT,GET,DELETE 中的一种");
        return;
      }
    },
    closeInvokeDialog() {
      this.invokeDialog = false; // 关闭对话框
      this.responseData = ""; // 清空 responseData
      this.Parameters.requestParameter = ""; // 清空请求参数
      this.responseDataFormat = "json"; // 重置响应数据格式
    },
    closeAssociatedDialog(){
      this.showAssociatedDialog = false; // 关闭对话框
    },
    removeDataById(id) {
      this.$confirm("确认删除该接口吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api.removeById(id).then((response) => {
            this.$message.success("删除成功");
            this.fetchData();
          });
        })
        .catch(() => {
          this.$message.info("取消删除");
        });
    },
    saveOrUpdate() {
      if (!this.sysApi.id) {
        this.save();
      } else {
        this.update();
      }
    },
    add() {
      this.dialogVisible = true;
      this.sysApi = {};
    },
    save() {
      // 调用保存接口
      api.save(this.sysApi).then((response) => {
        this.$message.success("保存成功");
        this.dialogVisible = false;
      });
    },
    update() {
      // 调用更新接口
      api.updateById(this.sysApi).then((response) => {
        this.$message.success("更新成功");
        this.dialogVisible = false;
      });
    },
    formatInvoke() {
      const selectedFormat = this.responseDataFormat;
      const responseData = this.responseData;
      this.FormatObj.data = responseData;
      this.FormatObj.updateFormat = selectedFormat;

      Api.jXY(this.FormatObj).then((response) => {
        console.log("我进来了");
        console.log(URL);
        this.responseData = response.data;
        this.$message.success("转化成功");
      });
    },
    showAssociatedProjects(Id) {
      this.showAssociatedDialog = true;
      apiApi
        .getItemsByApiId(Id)
        .then((response) => {
          this.Item.returnItem = response.data;
          this.$message.success("调用成功");
          console.log(this.Item.returnItem);
        })
        .catch((error) => {
          this.$message.error("无法检索信息。");
        });
    },
  },
};
</script>

<style scoped>
/* 添加关联项目的样式 */
.associated-projects {
  display: flex;
  flex-wrap: wrap;
}

.project-block {
  display: inline-block;
  margin: 5px;
  padding: 10px;
  background-color: #f0f0f0; /* 设置背景颜色 */
  border-radius: 5px;
}

.app-container {
  padding: 20px;
}
.search-div {
  margin-bottom: 20px;
}
</style>
