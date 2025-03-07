<script setup lang="ts">
import { ref, markRaw, onMounted } from 'vue'
import axios from '@/api/request'
import {
  Opportunity,
  Connection,
  TrendCharts,
  DataAnalysis
} from "@element-plus/icons-vue"

const banners = ref([
  {
    title: '智能机器人前沿研究',
    description: '探索人工智能与机器人技术深度融合',
    image: '/images/banner1.jpg'
  },
  {
    title: '产学研合作平台',
    description: '与多家知名企业建立联合实验室',
    image: '/images/banner2.jpg'
  }
])

const features = ref([
  {
    icon: markRaw(Connection),
    title: '跨学科融合',
    description: '整合计算机视觉、自动控制、认知科学等多领域专家',
    color: '#409EFF'
  },
  {
    icon: markRaw(TrendCharts),
    title: '创新成果',
    description: '累计发表顶刊论文100+，授权专利30余项',
    color: '#67C23A'
  },
  {
    icon: markRaw(DataAnalysis),
    title: '先进设备',
    description: '拥有价值千万的机器人研发实验平台',
    color: '#E6A23C'
  }
])
const introduction = ref(
  "成立于2014年<br>宗旨：以科技创新,促进大学生创新创业<br>理念：培养研究生的模式来培养本科生<br>为同学提供一个融合了课外学术研究、科技创新、思政道德培养的学习平台，让同学们在本科拥有实操的机会，获得丰富的学术研究机会，拓宽知识面，提高科研能力。"
)
onMounted(() => {
  axios.get('/api/index/').then(res => {
    if (res.data.code === 200) {
      introduction.value = res.data.data.about.replace(/\n/g, '<br>')
    }
  })
})
</script>

<template>
  <div class="home-container">
    <!-- 轮播图区域 -->
    <div class="hero-section">
      <el-carousel height="500px" :interval="5000" trigger="hover" class="banner-carousel" indicator-position="outside">
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <div class="banner-content" :style="{ backgroundImage: `url(${item.image})` }">
            <div class="banner-overlay">
              <h1 class="animate__animated animate__fadeInDown">{{ item.title }}</h1>
              <p class="animate__animated animate__fadeInUp">{{ item.description }}</p>
              <el-button type="primary" size="large" class="animate__animated animate__fadeInUp">了解更多</el-button>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 实验室介绍 -->
    <div class="section">
      <h2 class="section-title">实验室简介</h2>
      <el-row :gutter="30">
        <el-col :md="16" :sm="24">
          <div class="intro-content">
            <p class="intro-text" v-html="introduction"></p>
          </div>
        </el-col>
        <el-col :md="8" :sm="24">
          <el-image src="/images/lab-photo.jpg" fit="cover" class="lab-photo" />
        </el-col>
      </el-row>
    </div>

    <!-- 特色优势模块 -->
    <div class="section features-section">
      <h2 class="section-title">我们的优势</h2>
      <el-row :gutter="30">
        <el-col v-for="(feature, index) in features" :key="index" :md="8" :sm="24">
          <div class="feature-card animate__animated animate__fadeIn">
            <el-icon :size="50" :color="feature.color">
              <component :is="feature.icon" />
            </el-icon>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  margin-bottom: 60px;
}

.banner-content {
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10%;
  color: white;
}

.banner-overlay h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: white;
  max-width: 60%;
}

.banner-overlay p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  max-width: 50%;
  color: white;
}

.section {
  /* padding: 60px 20px; */
  padding: 10px 20px 60px 20px;
  margin-bottom: 40px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.section-title {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 40px;
  color: #3E9BD4;
  position: relative;
}

.section-title:after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: #3E9BD4;
}

.intro-content {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.intro-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
}

.lab-photo {
  width: 100%;
  height: 100%;
  min-height: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.features-section {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.feature-card {
  background: white;
  padding: 30px 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  margin-bottom: 30px;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.feature-card h3 {
  margin: 20px 0;
  font-size: 1.5rem;
  color: #3E9BD4;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .banner-overlay h1 {
    font-size: 2rem;
    max-width: 90%;
  }

  .banner-overlay p {
    font-size: 1.2rem;
    max-width: 90%;
  }
}
</style>