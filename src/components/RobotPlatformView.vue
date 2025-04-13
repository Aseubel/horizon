<template>
  <div class="page-container">
    <div class="platform-header">
      <h1 class="page-title">机器人平台</h1>
      <p class="platform-description">探索我们先进的机器人研发平台，了解前沿技术应用</p>
    </div>

    <div class="platform-layout">
      <div class="type-list">
        <el-menu :default-active="selectedTypeId" class="type-menu" @select="selectType">
          <el-menu-item v-for="type in deviceTypes" :key="type.typeId" :index="type.typeId">
            <el-icon>
              <Monitor />
            </el-icon>
            <span>{{ type.typeName }}</span>
          </el-menu-item>
        </el-menu>
      </div>

      <div class="device-display">
        <el-carousel height="550px" :interval="0" trigger="hover" indicator-position="outside" arrow="always">
          <el-carousel-item v-for="(device, index) in devices" :key="index" class="carousel-item">
            <div class="device-card">
              <div class="device-content-wrapper">
                <div class="device-image-container">
                  <el-image :src="device.image" alt="device image" fit="contain" class="device-image"
                    :preview-src-list="[device.image]" />
                </div>
                <div class="device-content">
                  <h2 class="device-title">{{ device.deviceName }}</h2>
                  <div class="device-introduction">
                    <p>{{ device.introduction }}</p>
                  </div>
                  <el-button type="primary" :icon="Link" @click="openLink(device.link)" class="device-link-btn">
                    了解更多
                  </el-button>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '@/api/request'
import { Monitor, Link } from '@element-plus/icons-vue'

// 定义类型接口
interface Device {
  deviceId: string;
  typeId: string;
  deviceName: string;
  image: string;
  introduction: string;
  link: string;
}
interface DeviceType {
  typeId: string;
  pageId: string;
  typeName: string;
}

const deviceTypes = ref<DeviceType[]>([])
const devices = ref<Device[]>([])
const selectedTypeId = ref('')

const fetchDeviceTypes = async () => {
  try {
    const response = await axios.get('/api/device/type', { params: { pageId: 5 } })
    if (response.data.code === 200) {
      deviceTypes.value = response.data.data
      if (deviceTypes.value.length > 0) {
        selectType(deviceTypes.value[0].typeId)
      }
    }
  } catch (error) {
    console.error('Error fetching device types:', error)
  }
}

const selectType = async (typeId: string) => {
  selectedTypeId.value = typeId
  try {
    const response = await axios.get('/api/device', { params: { typeId } })
    if (response.data.code === 200) {
      devices.value = response.data.data
      devices.value.forEach(device => {
        console.log(device.image)
        device.image = "http://127.0.0.1:611/api/file/picture?filePath=" + device.image
        console.log(device.image)
      })
    }
  } catch (error) {
    console.error('Error fetching devices:', error)
  }
}

const openLink = (link: string) => {
  window.open(link, '_blank')
}

onMounted(() => {
  fetchDeviceTypes()
})
</script>

<style scoped>
.page-container {
  padding: 2rem;
  min-height: 100vh;
}

.platform-header {
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

.platform-description {
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 1.5rem auto 0;
}

.platform-layout {
  display: flex;
  gap: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.type-list {
  width: 250px;
  background: #f8f9fa;
}

.type-menu {
  border-right: none;
}

.device-display {
  flex: 1;
  padding: 2rem;
}

.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.device-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.device-content-wrapper {
  display: flex;
  height: 100%;
}

.device-image-container {
  flex: 1;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.device-image {
  width: 100%;
  /* max-height: 500px; */
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.device-content {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.device-title {
  font-size: 1.8rem;
  color: #3E9BD4;
  margin-bottom: 1rem;
}

.device-introduction {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  /* 隐藏滚动条但保留功能 */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
}

/* 为Webkit浏览器（Chrome、Safari等）自定义滚动条 */
.device-introduction::-webkit-scrollbar {
  width: 6px;
}

.device-introduction::-webkit-scrollbar-track {
  background: transparent;
}

.device-introduction::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}

.device-introduction p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
}

.device-link-btn {
  align-self: flex-end;
}

@media (max-width: 992px) {
  .platform-layout {
    flex-direction: column;
  }

  .type-list {
    width: 100%;
  }

  .type-menu {
    display: flex;
    flex-wrap: wrap;
  }

  .device-content-wrapper {
    flex-direction: column;
  }

  .device-image-container {
    height: 300px;
  }

  .device-image {
    max-height: 280px;
  }

  .device-content {
    padding-top: 0;
  }
}
</style>