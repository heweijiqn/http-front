<template>
  <div class="dashboard-container">
    <div class="dashboard-content">
      <h1 class="dashboard-title">欢迎使用 API 管理控制台</h1>
      <p class="dashboard-description">
        该控制台提供了全面的工具，用于管理 API、角色和权限。
      </p>

      <div class="dashboard-features">
        <div class="dashboard-feature">
          <h2 class="feature-title">Swagger 导入</h2>
          <p class="feature-description">
            轻松导入 Swagger 文档，自动生成 API 信息。
          </p>
        </div>

        <div class="dashboard-feature">
          <h2 class="feature-title">角色与权限分配</h2>
          <p class="feature-description">
            为用户分配角色和权限，确保安全访问和控制。
          </p>
        </div>

        <div class="dashboard-feature">
          <h2 class="feature-title">成员管理</h2>
          <p class="feature-description">
            添加、编辑和删除成员信息，进行系统成员管理。
          </p>
        </div>

        <div class="dashboard-feature">
          <h2 class="feature-title">项目管理</h2>
          <p class="feature-description">
            创建、编辑和管理多个关联 API 的项目。
          </p>
        </div>

        <div class="dashboard-feature">
          <h2 class="feature-title">角色管理</h2>
          <p class="feature-description">
            添加、编辑和删除角色信息，进行角色管理。
          </p>
        </div>

        <div class="dashboard-feature">
          <h2 class="feature-title">API 管理</h2>
          <p class="feature-description">
            轻松创建、编辑和删除 API 信息，进行 API 管理。
          </p>
        </div>

        <div class="dashboard-feature">
          <h2 class="feature-title">API 测试与监控</h2>
          <p class="feature-description">
            测试 API 并监控性能数据，实现高效管理。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-title {
    font-size: 36px;
    margin-bottom: 20px;
    color: #ff0000;
  }

  &-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  &-section {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(255 0 0);
  }

  h2 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #ff0000;
  }

  p {
    font-size: 14px;
    color: #ff0000;
    margin-bottom: 5px;
  }

  .permission-text {
    font-size: 12px;
    color: #ff0000;
  }
}
</style>
