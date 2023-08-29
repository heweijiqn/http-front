<template>
  <div class="app-container">
    <div class="search-div">
      <el-alert
        title="请注意模拟数据不能过长，否则添加不成功！"
        type="warning"
      />
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="接口名称">
              <el-input
                style="width: 100%"
                v-model="searchObj.name"
                placeholder="接口名称"
              ></el-input>
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
      fit
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

      <el-table-column prop="name" label="接口名称" />
      <el-table-column prop="mockData" label="模拟数据(json)" />
      <el-table-column prop="createTime" label="创建时间" width="160" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit(scope.row.id)"
            title="修改"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeDataById(scope.row.id)"
            title="删除"
          />
        </template>
      </el-table-column>
    </el-table>

    <!-- 工具条 -->
    <div class="tools-div">
      <el-button type="success" icon="el-icon-plus" size="mini" @click="add"
        >添 加</el-button
      >
    </div>

    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />

    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%">
      <el-form
        ref="dataForm"
        :model="sysMock"
        label-width="150px"
        size="small"
        style="padding-right: 40px"
      >
        <el-form-item label="接口名称">
          <el-input v-model="sysMock.name" />
        </el-form-item>
        <el-form-item label="模拟数据(json)">
          <el-input
            v-model="sysMock.mockData"
            type="textarea"
            :rows="8"
            class="bigger-input"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="dialogVisible = false"
          size="small"
          icon="el-icon-refresh-right"
          >取 消</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-check"
          @click="saveOrUpdate()"
          size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api/system/mockData"; // 导入前端 API

export default {
  data() {
    return {
      list: [],
      total: 0, // 总记录数
      page: 1, // 当前页码
      limit: 3, // 每页显示数量
      listLoading: false, // 列表加载状态
      searchObj: {
        name: "",
      },
      dialogVisible: false, // 添加/修改对话框是否可见
      sysMock: {},
    };
  },
  mounted() {
    this.fetchData(); // 页面加载时获取职位列表数据
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
          //this.list = response.data.list
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

    //弹出添加表单
    add() {
      this.dialogVisible = true;
      this.sysMock = {};
    },
    //编辑
    edit(id) {
      this.dialogVisible = true;
      api.getById(id).then((response) => {
        this.sysMock = response.data;
      });
    },

    //添加或更新
    saveOrUpdate() {
      if (!this.sysMock.id) {
        this.save();
      } else {
        this.update();
      }
    },

    //添加
    save() {
      api.save(this.sysMock).then((response) => {
        this.$message.success("操作成功");
        this.dialogVisible = false;
        this.fetchData(this.page);
      });
    },

    //更新
    update() {
      api.updateById(this.sysMock).then((response) => {
        this.$message.success(response.message || "操作成功");
        this.dialogVisible = false;
        this.fetchData(this.page);
      });
    },
  },
};
</script>
<style>
.bigger-input {
  width: 100%; /* 设置更大的输入框宽度 */
}
</style>
