<template>
  <div class="page-container">
    <div class="research-header">
      <h1 class="page-title">研究成果</h1>
      <p class="research-description">探索我们在机器人技术领域的最新研究成果和创新项目</p>
    </div>

    <div class="research-content">
      <el-tabs type="border-card" class="custom-tabs">
        <el-tab-pane v-for="type in researchTypes" :key="type.typeId" :label="type.typeName">
          <div class="research-grid">
            <div v-for="research in researches[type.typeId]" :key="research.researchId" class="research-card"
              @click="openLink(research.link)">
              <div class="research-image-container">
                <el-image :src="research.image" :alt="research.title" fit="cover" class="research-image"
                  :preview-src-list="[research.image]" />
                <div class="research-overlay">
                  <el-button type="primary" circle>
                    <el-icon>
                      <Link />
                    </el-icon>
                  </el-button>
                </div>
              </div>
              <div class="research-info">
                <h3>{{ research.title }}</h3>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '@/api/request'
import { Link } from '@element-plus/icons-vue'

// 定义类型接口
interface Research {
  researchId: string;
  typeId: string;
  title: string;
  link: string;
  image: string;
}
interface ResearchType {
  typeId: string;
  pageId: string;
  typeName: string;
}

const researchTypes = ref<ResearchType[]>([])
const researches = ref<Record<string, Research[]>>({})

const fetchResearchTypes = async () => {
  try {
    const response = await axios.get('/api/research/type', { params: { pageId: 3 } })
    if (response.data.code === 200) {
      researchTypes.value = response.data.data
      fetchResearchesByType()
    }
  } catch (error) {
    console.error('Error fetching research types:', error)
  }
}

const fetchResearchesByType = async () => {
  try {
    for (const type of researchTypes.value) {
      const response = await axios.get('/api/research', { params: { typeId: type.typeId } })
      if (response.data.code === 200) {
        researches.value[type.typeId] = response.data.data
        researches.value[type.typeId].forEach(research => {
          research.image = "http://127.0.0.1:611/api/file/picture?filePath=" + research.image
        })
      }
    }
  } catch (error) {
    console.error('Error fetching researches:', error)
  }
}

const openLink = (link: string) => {
  window.open(link, '_blank')
}

onMounted(() => {
  fetchResearchTypes()
})
</script>

<style scoped>
.page-container {
  padding: 2rem;
  /* background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); */
  min-height: 100vh;
}

.research-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  color: #3E9BD4;
  margin-bottom: 0.5rem;
  position: relative;
  display: inline-block;
}

.page-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: #3E9BD4;
}

.research-description {
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 1.5rem auto 0;
}

.research-content {
  max-width: 1200px;
  margin: 0 auto;
}

.custom-tabs {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.research-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1.5rem;
}

.research-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.research-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.research-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.research-image {
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
}

.research-card:hover .research-image {
  transform: scale(1.05);
}

.research-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.research-card:hover .research-overlay {
  opacity: 1;
}

.research-info {
  padding: 1.2rem;
  text-align: center;
}

.research-info h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #3E9BD4;
}

@media (max-width: 768px) {
  .research-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }
}
</style>