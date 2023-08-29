<template>
  <div class="oper-log-page">
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="模块标题">
              <el-input v-model="searchObj.title" placeholder="模块标题" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作人员">
              <el-input v-model="searchObj.operName" placeholder="操作人员" />
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
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="selectedRows.length === 0"
            @click="batchDeleteData"
          >
            批量删除
          </el-button>
        </el-row>
      </el-form>
    </div>

    <el-table
      v-loading="listLoading"
      :data="operLogList"
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
      <el-table-column prop="title" label="模块标题" />
      <el-table-column prop="operName" label="操作人员" />
      <el-table-column prop="operIp" label="操作IP地址" />
      <el-table-column prop="requestMethod" label="请求方式" />
      <el-table-column prop="operUrl" label="请求URL" />
      <el-table-column prop="operParam" label="请求参数" />
      <el-table-column prop="jsonResult" label="返回参数" />
      <el-table-column prop="status" label="操作状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0">异常</span>
          <span v-else-if="scope.row.status === 1">正常</span>
        </template>
      </el-table-column>
      <el-table-column prop="errorMsg" label="错误消息" />
      <el-table-column prop="operTime" label="操作时间" width="180">
        <template slot-scope="scope">
          {{ formatDate(scope.row.operTime) }}
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

    <div class="pagination-div">
      <el-pagination
        :current-page="pagination.page"
        :total="pagination.total"
        :page-size="pagination.limit"
        style="padding: 30px 0; text-align: center"
        layout="total, prev, pager, next, jumper"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import api from "@/api/system/operLog";
export default {
  data() {
    return {
      operLogList: [],
      listLoading: false,
      searchObj: {
        title: "",
        operName: "",
      },
      pagination: {
        page: 1,
        limit: 2,
        total: 0,
      },
      selectedRows: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      api
        .getLoginLogList(
          this.pagination.page,
          this.pagination.limit,
          this.searchObj
        )
        .then((response) => {
          this.operLogList = response.data.records;
          this.pagination.total = response.data.total;
        })
        .finally(() => {
          this.listLoading = false;
        });
    },
    resetData() {
      this.searchObj.title = "";
      this.searchObj.operName = "";
      this.fetchData();
    },
    handleSelectionChange(rows) {
      this.selectedRows = rows;
    },
    batchDeleteData() {
      const idList = this.selectedRows.map((row) => row.id);
      this.$confirm("确认删除选中的日志记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api
            .batchDeleteLoginLogs(idList)
            .then(() => {
              this.$message.success("批量删除成功");
              this.fetchData();
            })
            .catch(() => {
              this.$message.error("批量删除失败");
            });
        })
        .catch(() => {
          // Do nothing if cancelled
        });
    },
    removeDataById(id) {
      this.$confirm("确认删除该日志记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api
            .deleteLoginLog(id)
            .then(() => {
              this.$message.success("删除成功");
              this.fetchData();
            })
            .catch(() => {
              this.$message.error("删除失败");
            });
        })
        .catch(() => {
          // Do nothing if cancelled
        });
    },
    handleSizeChange(size) {
      this.pagination.limit = size;
      this.fetchData();
    },
    handleCurrentChange(page) {
      this.pagination.page = page;
      this.fetchData();
    },
    formatDate(date) {
      // Implement your date formatting logic here
      // For example:
      const formattedDate = new Date(date).toLocaleString();
      return formattedDate;
    },
    handlePageChange(page) {
      this.pagination.page = page;
      this.fetchData();
    },
  },
};
</script>
