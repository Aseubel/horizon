<template>
  <div class="page-container">
    <div class="team-header">
      <h1 class="page-title">研究团队</h1>
      <p class="team-description">我们拥有一支充满激情和创造力的研究团队，致力于推动机器人技术的前沿发展</p>
    </div>
    
    <div class="team-filter">
      <el-radio-group v-model="selectedTypeId" @change="fetchMembers" size="large">
        <el-radio-button v-for="type in memberTypes" :key="type.typeId" :label="type.typeId">
          {{ type.typeName }}
        </el-radio-button>
      </el-radio-group>
    </div>
    
    <div class="team-members">
      <div v-for="member in members" :key="member.memberId" 
           class="member-card animate__animated animate__fadeIn"
           @click="showMemberDetails(member)">
        <div class="member-image-container">
          <img :src="member.image" alt="member image" class="member-image" />
          <div class="member-overlay">
            <el-button type="primary" circle icon="el-icon-view"></el-button>
          </div>
        </div>
        <div class="member-info">
          <h3>{{ member.memberName }}</h3>
          <p>{{ member.major }}</p>
        </div>
      </div>
    </div>

    <!-- 成员详情模态框 -->
    <el-dialog
      v-model="dialogVisible"
      title="成员详情"
      width="50%"
      custom-class="member-dialog"
    >
      <div v-if="selectedMember" class="member-details">
        <div class="member-profile">
          <img :src="selectedMember.image" alt="member profile" class="profile-image" />
          <div class="profile-info">
            <h2>{{ selectedMember.memberName }}</h2>
            <p><strong>专业:</strong> {{ selectedMember.major }}</p>
          </div>
        </div>
        
        <div class="member-links">
          <el-row :gutter="20">
            <el-col :span="12" v-if="selectedMember.github">
              <a :href="selectedMember.github" target="_blank" class="social-link">
                <i class="fab fa-github"></i> GitHub
              </a>
            </el-col>
            <el-col :span="12" v-if="selectedMember.blog">
              <a :href="selectedMember.blog" target="_blank" class="social-link">
                <i class="fas fa-blog"></i> 个人博客
              </a>
            </el-col>
            <el-col :span="12" v-if="selectedMember.bilibili">
              <a :href="selectedMember.bilibili" target="_blank" class="social-link">
                <i class="fab fa-bilibili"></i> Bilibili
              </a>
            </el-col>
            <el-col :span="12" v-if="selectedMember.csdn">
              <a :href="selectedMember.csdn" target="_blank" class="social-link">
                <i class="fas fa-code"></i> CSDN
              </a>
            </el-col>
          </el-row>
        </div>
        
        <div class="member-experience" v-if="selectedMember.experience">
          <h3>研究经历</h3>
          <p>{{ selectedMember.experience }}</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '@/api/request'

// 定义类型接口
interface Member {
  memberId: string;
  typeId: string;
  memberName: string;
  grade: number;
  major: string;
  experience: string | null;
  image: string;
  github: string;
  blog: string;
  bilibili: string;
  csdn: string;
}
interface Type {
  typeId: string;
  typeName: string;
  pageId: number;
}
const memberTypes = ref<Type[]>([])
const members = ref<Member[]>([])
const selectedTypeId = ref('')
const dialogVisible = ref(false)
const selectedMember = ref<Member | null>(null)

const fetchMemberTypes = async () => {
  try {
    const response = await axios.get('/api/member/type', { params: { pageId: 2 } })
    if (response.data.code === 200) {
      memberTypes.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching member types:', error)
  }
}

const fetchMembers = async (typeId: any) => {
  try {
    const response = await axios.get('/api/member/', { params: { typeId } })
    if (response.data.code === 200) {
      members.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching members:', error)
  }
}

const showMemberDetails = (member: Member) => {
  selectedMember.value = member
  dialogVisible.value = true
}

const closeDialog = () => {
  dialogVisible.value = false
}

onMounted(() => {
  fetchMemberTypes()
})
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.team-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  color: #3E9BD4;
  margin-bottom: 1rem;
}

.team-description {
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
}

.team-filter {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.team-members {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.member-card {
  width: 280px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  background: white;
}

.member-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.member-image-container {
  position: relative;
  overflow: hidden;
}

.member-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
  transition: transform 0.5s;
}

.member-card:hover .member-image {
  transform: scale(1.05);
}

.member-overlay {
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

.member-card:hover .member-overlay {
  opacity: 1;
}

.member-info {
  padding: 1.5rem;
  text-align: center;
}

.member-info h3 {
  margin: 0 0 0.5rem;
  font-size: 1.3rem;
  color: #3E9BD4;
}

.member-info p {
  margin: 0;
  color: #666;
}

.member-dialog {
  border-radius: 10px;
  overflow: hidden;
}

.member-details {
  padding: 1rem;
}

.member-profile {
  display: flex;
  margin-bottom: 2rem;
}

.profile-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 2rem;
}

.profile-info h2 {
  margin-top: 0;
  color: #3E9BD4;
}

.member-links {
  margin-bottom: 2rem;
}

.social-link {
  display: block;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: background 0.3s;
  margin-bottom: 1rem;
}

.social-link:hover {
  background: #e0e0e0;
}

.member-experience h3 {
  color: #3E9BD4;
  margin-bottom: 1rem;
}
</style>