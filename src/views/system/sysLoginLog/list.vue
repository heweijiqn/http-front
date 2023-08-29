<template>
  <div class="login-log-page">
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名">
              <el-input v-model="searchObj.username" placeholder="用户名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间范围">
              <el-date-picker
                v-model="searchObj.dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display: flex">
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="fetchData"
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
      :data="loginLogList"
      stripe
      border
      style="width: 100%; margin-top: 10px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (pagination.page - 1) * pagination.limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="ipaddr" label="登录IP地址" />
      <el-table-column prop="status" label="登录状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 1">成功</span>
          <span v-else-if="scope.row.status === 0">失败</span>
        </template>
      </el-table-column>
      <el-table-column prop="msg" label="提示信息" />
      <el-table-column prop="accessTime" label="访问时间" width="180">
        <template slot-scope="scope">
          {{ formatDate(scope.row.accessTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180">
        <template slot-scope="scope">
          {{ formatDate(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            title="删除"
            @click="removeDataById(scope.row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
    <div class="tools-div">
      <el-button class="btn-add" size="mini" @click="batchRemove()"
        >批量删除</el-button
      >
    </div>
    <el-pagination
      :current-page="pagination.page"
      :total="pagination.total"
      :page-size="pagination.limit"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script>
import api from "@/api/system/login";

export default {
  data() {
    return {
      listLoading: false,
      multipleSelection: [], // 批量删除选中的记录列表
      loginLogList: [],
      searchObj: {
        username: "",
        dateRange: null,
      },
      pagination: {
        page: 1,
        limit: 3,
        total: 0,
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      const { username, dateRange } = this.searchObj;
      const [createTimeBegin, createTimeEnd] = dateRange || [];

      api
        .getLoginLogList(this.pagination.page, this.pagination.limit, {
          username,
          createTimeBegin,
          createTimeEnd,
        })
        .then((response) => {
          this.loginLogList = response.data.records;
          this.pagination.total = response.data.total;
          this.listLoading = false;
        });
    },
    resetData() {
      this.searchObj.username = "";
      this.searchObj.dateRange = null;
      this.fetchData();
    },
    handlePageChange(page) {
      this.pagination.page = page;
      this.fetchData();
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const formattedDate = date.toLocaleString();
      return formattedDate;
    },
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
          return api.deleteLoginLog(id);
        })
        .then((response) => {
          this.fetchData(this.page);
          this.$message.success(response.message || "删除成功");
        })
        .catch(() => {
          this.$message.info("取消删除");
        });
    },
    batchRemove() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning("请选择要删除的记录！");
        return;
      }
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击确定，远程调用ajax
          // 遍历selection，将id取出放入id列表
          var idList = [];
          this.multipleSelection.forEach((item) => {
            idList.push(item.id);
          });
          // 调用api
          return api.batchDeleteLoginLogs(idList);
        })
        .then((response) => {
          this.fetchData();
          this.$message.success(response.message);
        })
        .catch((error) => {
          if (error === "cancel") {
            this.$message.info("取消删除");
          }
        });
    },
    handleSelectionChange(selection) {
      console.log(selection);
      this.multipleSelection = selection;
    },
  },
};
</script>

<style scoped>
.login-log-page {
  margin-top: 10px;
}

.search-div {
  margin-bottom: 10px;
}
</style>
