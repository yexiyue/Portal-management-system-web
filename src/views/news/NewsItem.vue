<template>
    <el-row>
        <el-col :span="17" :offset="1">
            <div class="news-detail">
                <h2 class="news-title">{{ newsDetail?.title }}</h2>
                <div class="news-time">{{ formatTime(newsDetail?.updateTime!) }}</div>
                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>
                <div class="news-content" v-html="newsDetail?.content">
                </div>
            </div>
        </el-col>
        <el-col :span="5" :offset="1" :pull="1">
            <el-card class="box-card" style="width:100%;margin-top:35px;margin-left: 15px;">
                <template #header>
                    <div class="card-header" style="font-weight: bold;">
                        <span>最近新闻</span>
                    </div>
                </template>
                <div v-for="item in lastNews" :key="item.id">
                    <div class="news-item" @click="toNewsDetail(item.id)">
                        <h5>{{ item.title }}</h5>
                        <p>{{ formatTime(item.updateTime) }}</p>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
    <el-backtop :right="100" :bottom="100" />
</template>

<script setup lang="ts">
import { getNewsById, type News ,getNewsLast} from '@/api';
import {  onMounted, ref,  watchEffect,onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { formatTime } from '@/hooks/formatTime';
import { StarFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

const router=useRouter()
const newsDetail = ref<News>()
const route = useRoute()
const lastNews=ref<News[]>([])

onMounted(async () => {
    newsDetail.value = (await getNewsById(+route.params.id)).data
    lastNews.value=(await getNewsLast(6)).data
})

const stopHandle=watchEffect(async()=>{
    //所以加层判断
    if(+route.params.id){
        newsDetail.value = (await getNewsById(+route.params.id)).data
    }
})
//没啥用，因为当组件销毁时watchEffect先执行
onBeforeUnmount(()=>{
    stopHandle()
})
const toNewsDetail=(id:number)=>{
    router.push(`/news/${id}`)
}
</script>

<style scoped>
.el-row {
    margin-top: 30px;
}

.news-title {
    margin-bottom: 20px;
}

.news-time {
    font-size: 13px;
    color: gray;
}

.news-content {
    width: 80%;
    line-height: 30px;
    text-align: center;
    text-indent: 2rem;
}

:deep(.news-content p img) {
    width: 90%;
}

.news-item{
    margin: 20px 0;
    cursor: pointer;
    transition: .5s;
}
.news-item h5{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 10px;
}
.news-item p{
    font-size: 12px;
    color: gray;
}

.news-item:hover{
    box-shadow: 0px 5px 5px #ccc;
    color: #1296db;
}
</style>