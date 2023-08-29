<template>
  <div class="app-container">
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="项目名">
              <el-input
                v-model="searchObj.name"
                style="width: 100%"
                placeholder="项目名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
              <!-- 项目描述 -->
            <el-form-item label="项目描述">
              <el-input
                v-model="searchObj.description"
                style="width: 100%"
                placeholder="描述"
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
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%; margin-top: 10px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <!-- 表格列定义 -->
      <el-table-column prop="name" label="项目名" width="180" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            title="修改"
            @click="edit(scope.row.id)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            title="删除"
            @click="removeDataById(scope.row.id)"
          />
          <el-button
            type="warning"
            icon="el-icon-baseball"
            size="mini"
            title="分配角色"
            @click="showAssignRole(scope.row)"
          />
          <el-button
            type="warning"
            icon="el-icon-s-claim"
            size="mini"
            title="分配接口"
            @click="showAssignApi(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>

    <!-- 工具条 -->
    <div class="tools-div">
      <el-button type="success" icon="el-icon-plus" size="mini" @click="add"
        >添 加</el-button
      >
      <!-- 添加swagger导入按钮 -->
      <el-button
        type="primary"
        size="small"
        icon="el-icon-folder"
        @click="importSwagger()"
      >从Swagger导入</el-button>
    </div>

    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />

    <!-- 分配成员对话框 -->
    <el-dialog title="分配成员" :visible.sync="dialogRoleVisible">
      <div style="margin-bottom: 20px">
        <el-alert
          title="请注意一个成员只能属于一个项目，分配时请分配属于这个项目的成员"
          type="warning"
        />
      </div>
      <el-form label-width="80px">
        <el-form-item label="项目名">
          <el-input disabled :value="sysItem.name" />
        </el-form-item>

        <el-form-item label="成员列表">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0" />
          <el-checkbox-group v-model="userIds" @change="handleCheckedChange">
            <el-checkbox
              v-for="user in allUsers"
              :key="user.id"
              :label="user.id"
              >{{ user.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" size="small" @click="assignRole"
          >保存</el-button
        >
        <el-button size="small" @click="dialogRoleVisible = false"
          >取消</el-button
        >
      </div>
    </el-dialog>
    <!-- 分配接口 -->
    <el-dialog title="分配接口" :visible.sync="dialogApiVisible">
      <!-- 添加提示信息 -->
      <div style="margin-bottom: 20px">
        <el-alert
          title="请注意一个接口只能属于一个项目，分配时请分配属于这个项目的接口"
          type="warning"
        />
      </div>
      <el-form label-width="80px">
        <el-form-item label="项目名">
          <el-input disabled :value="sysItem.name" />
        </el-form-item>

        <el-form-item label="接口列表">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isApiIndeterminate"
            @change="handleCheckAllApiChange"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0" />
          <el-checkbox-group v-model="apiIds" @change="handleCheckedApiChange">
            <el-checkbox v-for="api in allApis" :key="api.id" :label="api.id">{{
              api.apiName
            }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" size="small" @click="assignApi"
          >保存</el-button
        >
        <el-button size="small" @click="dialogApiVisible = false"
          >取消</el-button
        >
      </div>
    </el-dialog>

    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%">
      <el-form
        ref="dataForm"
        :model="sysItem"
        label-width="150px"
        size="small"
        style="padding-right: 40px"
      >
        <el-form-item label="项目名">
          <el-input v-model="sysItem.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="sysItem.description" />
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
          @click="saveOrUpdate()"
          >确 定</el-button
        >
      </span>
    </el-dialog>

      <!-- swagger导入对话框 -->
    <el-dialog title="导入Swagger项目" :visible.sync="dialogSwaggerVisible">
      <el-form :model="sysApi" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="projInfo.name" disabled />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="projInfo.description" disabled />
        </el-form-item>
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-change="handleFileChange"
          :file-list="fileList"
          :multiple="false"
        >
          <el-button
            slot="trigger"
            size="small"
            type="primary"
          >选取文件</el-button>
        </el-upload>
        <el-table :data="apiList" style="width: 100%">
          <el-table-column prop="path" label="Path" />
          <el-table-column prop="httpMethod" label="HTTP Method" />
          <el-table-column
            label="Parameter Name"
          >
            <template>
              <div v-for="parameterName in (sysApi.parameterName).split(',')" :key="parameterName">
                {{ parameterName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Parameter Type"
          >
            <template>
              <div v-for="parameterType in (sysApi.parameterType).split(',')" :key="parameterType">
                {{ parameterType }}
              </div>
            </template>
          </el-table-column>
          </el-table-column></el-table>
      </el-form>
      <div slot="footer">
        <el-button
          type="primary"
          size="small"
          @click="assignRole"
        >保存</el-button>
        <el-button
          size="small"
          @click="dialogSwaggerVisible = false"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api/system/item"; // 导入前端 API
import userApi from "@/api/system/itemUser";
import apiApi from "@/api/system/itemApi";

export default {
  data() {
    return {
      list: [], //项目列表数据
      total: 0, // 总记录数
      page: 1, // 当前页码
      limit: 3, // 每页显示数量
      listLoading: false, // 列表加载状态
      searchObj: {
        name: "", // 搜索条件-项目名称
      },
      dialogVisible: false, // 添加/修改对话框是否可见
      sysItem: {}, // 当前编辑的项目信息
      saveBtnDisabled: false,

      dialogRoleVisible: false,

      // swagger模块数据
      dialogSwaggerVisible: false, // swaggerDialog
      fileList: [], // swagger文件列表
      apiList: [], // 接口列表
      projInfo: {
        name: "",
        description: "",
      },
      sysApi: {
        apiName: "",
        path: "",
        httpMethod: "",
        parameterName: "",
        parameterType: "",
        responseDataStructure: "",
        requestParameters: {},
      }, // 每个接口信息

      allUsers: [], // 所有用户列表
      userIds: [], // 项目的用户ID的列表
      isIndeterminate: false, // 是否是不确定的
      checkAll: false, // 是否全选

      dialogApiVisible: false,
      allApis: [], // 所有api列表
      apiIds: [], // 项目的apiID的列表
      isApiIndeterminate: false, // 是否是不确定的
      checkApiAll: false, // 是否全选
    };
  },
  mounted() {
    this.fetchData(); // 页面加载时获取项目列表数据
  },
  methods: {
    // 获取项目列表数据
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

    // 重置查询表单
    resetData() {
      console.log("重置查询表单");
      this.searchObj = {};
      this.createTimes = [];
      this.fetchData();
    },

    // 根据id删除数据
    removeDataById(id) {
      // debugger
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // promise
          // 点击确定，远程调用ajax
          return api.removeById(id);
        })
        .then((response) => {
          this.fetchData(this.page);
          this.$message.success(response.message || "删除成功");
        })
        .catch(() => {
          this.$message.info("取消删除");
        });
    },

    // 弹出添加表单
    add() {
      this.dialogVisible = true;
      this.sysItem = {};
    },
    // 编辑
    edit(id) {
      this.dialogVisible = true;
      api.getById(id).then((response) => {
        this.sysItem = response.data; // 更新为 this.sysItem
      });
    },

    // 添加或更新
    saveOrUpdate() {
      if (!this.sysItem.id) {
        this.save();
      } else {
        this.update();
      }
    },

    // 添加
    save() {
      api.save(this.sysItem).then((response) => {
        this.$message.success("操作成功");
        this.dialogVisible = false;
        this.fetchData(this.page);
      });
    },

    // 更新
    update() {
      api.updateById(this.sysItem).then((response) => {
        this.$message.success(response.message || "操作成功");
        this.dialogVisible = false;
        this.fetchData(this.page);
      });
    },

    showAssignRole(row) {
      this.sysItem = row;
      this.dialogRoleVisible = true;
      userApi.getUserByItemId(row.id).then((response) => {
        this.allUsers = response.data.allUsers;
        this.userIds = response.data.userIds;
        this.checkAll = this.userIds.length === this.allUsers.length;
        this.isIndeterminate =
          this.userIds.length > 0 && this.userIds.length < this.allUsers.length;
      });
    },

    /*
    全选勾选状态发生改变的监听
    */
    handleCheckAllChange(value) {
      // value 当前勾选状态true/false
      // 如果当前全选, userRoleIds就是所有角色id的数组, 否则是空数组
      this.userIds = value ? this.allUsers.map((item) => item.id) : [];
      // 如果当前不是全选也不全不选时, 指定为false
      this.isIndeterminate = false;
    },

    /*
    角色列表选中项发生改变的监听
    */
    handleCheckedChange(value) {
      const { userIds, allUsers } = this;
      this.checkAll = userIds.length === allUsers.length && allUsers.length > 0;
      this.isIndeterminate =
        userIds.length > 0 && userIds.length < allUsers.length;
    },

    // 分配角色
    assignRole() {
      const assginUserVo = {
        itemId: this.sysItem.id,
        userIdList: this.userIds,
      };
      userApi.assginUsers(assginUserVo).then((response) => {
        this.$message.success(response.message || "分配成员成功");
        this.dialogRoleVisible = false;
        this.fetchData(this.page);
      });
    },
    showAssignApi(row) {
      this.sysItem = row;
      this.dialogApiVisible = true;

      // Fetch all available APIs and APIs assigned to the project
      apiApi.getApiByItemId(row.id).then((response) => {
        this.allApis = response.data.allApis;
        this.apiIds = response.data.apiIds;
        this.checkApiAll = this.apiIds.length === this.allApis.length;
        this.isApiIndeterminate =
          this.apiIds.length > 0 && this.apiIds.length < this.allApis.length;
      });
    },

    handleCheckAllApiChange(value) {
      this.apiIds = value ? this.allApis.map((api) => api.id) : [];
      this.isApiIndeterminate = false;
    },

    handleCheckedApiChange(value) {
      const { apiIds, allApis } = this;
      this.checkApiAll = apiIds.length === allApis.length && allApis.length > 0;
      this.isApiIndeterminate =
        apiIds.length > 0 && apiIds.length < allApis.length;
    },

    assignApi() {
      const assginApiVo = {
        itemId: this.sysItem.id,
        apiIdList: this.apiIds,
      };
      apiApi.assginApi(assginApiVo).then((response) => {
        this.$message.success(response.message || "API assignment successful");
        this.dialogApiVisible = false;
        this.fetchData(this.page);
      });
    },

    // 新增/更改swagger文件，并解析
    handleFileChange(file) {
      this.fileList = []; // 清空先前的文件列表
      const { name, raw } = file;
      this.fileList.push(file); // 添加新选择的文件
      this.$message.success(`文件 ${name} 上传成功!`);
      // console.log("Selected file:", name, file);
      // 判断文件格式是否为json
      if (raw.type === "application/json") {
        // console.log(raw.type);
        const reader = new FileReader();
        let jsonData;
        // console.log(raw);
        reader.onload = (e) => {
          try {
            this.apiList = [];
            jsonData = JSON.parse(e.target.result);
            // 展示项目信息
            this.projInfo.name = jsonData.info.title.split("：")[1] || jsonData.info.title;
            this.projInfo.description =
              jsonData.info.description.split("：")[1] || jsonData.info.description;
            // 传给后端的数据
            const { paths } = jsonData;
            for (const [path, methods] of Object.entries(paths)) {
              for (const [method, methodInfo] of Object.entries(methods)) {
                this.sysApi = {};
                this.sysApi.path = path;
                this.sysApi.httpMethod = method;
                this.sysApi.apiName = methodInfo.summary;
                if (methodInfo.parameters !== undefined) {
                  const { parameters } = methodInfo;
                  this.sysApi.parameterName = "";
                  this.sysApi.parameterType = "";
                  console.log(parameters.length);
                  for (let i = 0; i < parameters.length; i++) {
                    const type =
                      parameters[i].type || parameters[i].schema.type || "";
                    console.log(
                      parameters[i].type || parameters[i].schema.type
                    );
                    this.sysApi.parameterName += parameters[i].name + ",";
                    this.sysApi.parameterType += type + ",";
                  }
                }
                this.apiList.push(this.sysApi);
                console.log(this.apiList);
              }
            }
            // 调用
            api
              .postSwaggerInfo(JSON.stringify(this.projInfo),this.apiList.map((obj) => JSON.stringify(obj)))
              .then((response) => {
                // this.apiList = response.data;
              })
              .catch((err) => console.log("Error:", err));
          } catch (error) {
            console.error("Error parsing JSON", error);
          }
        };
        reader.readAsText(raw);
      }
    },

    // 弹出导入swagger文档表单
    importSwagger() {
      this.dialogSwaggerVisible = true;
      // this.swaggerInfo = {};
    },
  },
};
</script>
