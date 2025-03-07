<template>
    <div class="page-container">
        <div class="publications-header">
            <h1 class="page-title">学术论著</h1>
            <p class="publications-description">我们团队在国内外重要学术期刊和会议发表的研究成果</p>
        </div>

        <div class="publications-content">
            <el-tabs type="border-card" class="custom-tabs">
                <el-tab-pane v-for="type in treatiseTypes" :key="type.typeId" :label="type.typeName">
                    <div class="publication-list">
                        <div v-for="treatise in treatises[type.typeId]" :key="treatise.treatiseId"
                            class="publication-card">
                            <div class="publication-content">
                                <a :href="treatise.link" target="_blank" class="publication-title">
                                    <h3>{{ treatise.title }}</h3>
                                </a>
                                <div class="publication-meta">
                                    <p class="authors">
                                        <el-icon>
                                            <User />
                                        </el-icon>
                                        {{ treatise.author }}
                                    </p>
                                    <p class="publish-info">
                                        <el-icon>
                                            <Document />
                                        </el-icon>
                                        {{ treatise.publish }}
                                    </p>
                                </div>
                                <div class="publication-actions">
                                    <el-button type="primary" size="small" @click="openLink(treatise.link)">
                                        <el-icon>
                                            <Link />
                                        </el-icon>
                                        查看详情
                                    </el-button>
                                </div>
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
import { User, Calendar, Link, Document } from '@element-plus/icons-vue'

// 定义类型接口
interface Treatise {
    treatiseId: string;
    typeId: string;
    title: string;
    author: string;
    publish: string;
    link: string;
}
interface TreatiseType {
    typeId: string;
    pageId: string;
    typeName: string;
}

const treatiseTypes = ref<TreatiseType[]>([])
const treatises = ref<Record<string, Treatise[]>>({})

const fetchTreatiseTypes = async () => {
    try {
        const response = await axios.get('/api/treatise/type', { params: { pageId: 4 } })
        if (response.data.code === 200) {
            treatiseTypes.value = response.data.data
            fetchTreatisesByType()
        }
    } catch (error) {
        console.error('Error fetching treatise types:', error)
    }
}

const fetchTreatisesByType = async () => {
    try {
        for (const type of treatiseTypes.value) {
            const response = await axios.get('/api/treatise', { params: { typeId: type.typeId } })
            if (response.data.code === 200) {
                treatises.value[type.typeId] = response.data.data
            }
        }
    } catch (error) {
        console.error('Error fetching treatises:', error)
    }
}

const openLink = (link: string) => {
    window.open(link, '_blank')
}

onMounted(() => {
    fetchTreatiseTypes()
})
</script>

<style scoped>
.page-container {
    padding: 2rem;
    /* background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); */
    min-height: 100vh;
}

.publications-header {
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

.publications-description {
    font-size: 1.2rem;
    color: #666;
    max-width: 800px;
    margin: 1.5rem auto 0;
}

.publications-content {
    max-width: 1200px;
    margin: 0 auto;
}

.custom-tabs {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.publication-list {
    padding: 1.5rem;
}

.publication-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s, box-shadow 0.3s;
}

.publication-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.publication-title h3 {
    color: #3E9BD4;
    margin: 0 0 1rem 0;
    font-size: 1.3rem;
    transition: color 0.3s;
}

.publication-title:hover h3 {
    color: #2a7db2;
}

.publication-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 1rem;
}

.publication-meta p {
    display: flex;
    align-items: center;
    margin: 0;
    color: #666;
}

.publication-meta .el-icon {
    margin-right: 0.5rem;
    color: #3E9BD4;
}

.publication-actions {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
}

@media (max-width: 768px) {
    .publication-meta {
        flex-direction: column;
        gap: 0.5rem;
    }
}
</style>