<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <header>
      <div class="wrapper">
        <div class="logo animate__animated animate__bounceIn">
          <el-avatar size="large" style="background-image: url(/public/images/PixPin_2025-03-07_16-04-19.png);" />
          <span class="logo-text">AutoGo Lab</span>
        </div>
        <nav class="main-nav animate__animated animate__fadeInDown">
          <RouterLink to="/">首页</RouterLink>
          <RouterLink to="/team">团队</RouterLink>
          <RouterLink to="/research">研究</RouterLink>
          <RouterLink to="/publications">论著</RouterLink>
          <RouterLink to="/platform">机器人平台</RouterLink>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* 全局背景设置 */
body {
  margin: 0;
  padding: 0;
  background-image: url('/images/banner1.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* 这是关键属性，使背景图固定不随滚动而移动 */
  min-height: 100vh;
}

/* 添加一个半透明覆盖层，使内容更易读 */
.app-container {
  min-height: 100vh;
  background-color: rgba(255, 255, 255, 0.85); /* 白色半透明背景 */
}

.main-content {
  padding-bottom: 2rem;
}
</style>

<style scoped>
header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.wrapper {
  max-width: 90%;
  height: 70px;
  margin: 0 2% 0 0;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  padding: 1rem 0;
  display: flex;
  align-items: center;
}

.logo img {
  height: 60px;
}

.logo-text {
  margin-left: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #3E9BD4;
}

.main-nav {
  display: flex;
  gap: 5rem;
}

.main-nav a {
  color: grey;
  text-decoration: none;
  font-size: 1rem;
  padding: 1.5rem 0;
  position: relative;
}

.main-nav a:hover {
  color: #007bff;
}

.main-nav a.router-link-active {
  color: #007bff;
}

.main-nav a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #007bff;
}

@media (max-width: 768px) {
  .wrapper {
    flex-direction: column;
  }

  .main-nav {
    gap: 1rem;
  }
}
</style>
