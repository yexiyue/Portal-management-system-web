<template>
    <div class="container">
        <div class="header-bg">
            <div class="search">
                <el-popover placement="bottom" :visible="visible" title="搜索结果" width="50%">
                    <template #reference>
                        <el-input :prefix-icon="Search" type="search" @input="visible = true" @blur="visible = false"
                            v-model="searchStr" placeholder="请输入新闻标题" class="input-with-select">
                        </el-input>
                    </template>
                    <div v-if="searchList.length !== 0">
                        <div @click="toNewsDetail(item.id)" class="search-item" v-for="item in searchList" :key="item.id">
                            {{ item.title }}
                        </div>
                    </div>
                    <div v-else>
                        <el-empty description="亲~暂时没有搜索到该标题" :image-size="50" />
                    </div>
                </el-popover>
            </div>
        </div>
        <!-- 顶部最新新闻 -->
        <div class="topNews">
            <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-col style="cursor: pointer;" :span="6" v-for="item in topNewsList" :key="item.id">
                    <el-card @click="toNewsDetail(item.id)" shadow="hover" :body-style="{ padding: '0px', }">
                        <img :src="item.cover" class="image" />
                        <div style="padding: 14px">
                            <p class="news-text">{{ item.title }}</p>
                            <div class="bottom">
                                <time class="time">{{ formatTime(item.updateTime) }}</time>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>

            <!-- 标签页分类 -->
            <el-tabs v-model="activeName">
                <el-tab-pane v-for="item in tabList" :label="item.label" :name="item.name">
                    <el-row justify="space-between">
                        <el-col :span="14">
                            <el-card @click="toNewsDetail(item2.id)" class="tabList-card" v-for="item2 in tabListData[item.name]" shadow="hover"
                                :body-style="{ padding: '0px', }">
                                <div class="tabList-card-item">
                                    <img :src="item2.cover" />
                                    <div style="padding: 14px;">
                                        <p class="news-text">{{ item2.title }}</p>
                                        <div class="bottom">
                                            <time class="time">{{ formatTime(item2.updateTime) }}</time>
                                        </div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="8">
                            <!-- 时间线 -->
                            <el-timeline style="margin: 20px;">
                                <el-timeline-item @click="toNewsDetail(item3.id)" v-for="item3 in tabListData[item.name]" :key="item3.id"
                                    :timestamp="formatTime(item3.updateTime)">
                                    {{ item3.title }}
                                </el-timeline-item>
                            </el-timeline>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <el-backtop :right="100" :bottom="100" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { getNews, type News } from '@/api'
import { formatTime } from '@/hooks/formatTime'
import { useRouter } from 'vue-router';
const searchStr = ref('')
const visible = ref(false)
const data = ref<News[]>([])
const activeName = ref(0)
const router=useRouter()

const toNewsDetail=(id:number)=>{
    router.push(`/news/${id}`)
}
onMounted(async () => {
    data.value = (await getNews()).data
})

const searchList = computed(() => {
    return searchStr.value ? data.value.filter(item => item.title.includes(searchStr.value)) : []
})

const topNewsList = computed(() => {
    return data.value.slice(0, 4)
})

const tabListData = computed(() => {
    return data.value.reduce((pre, cur) => {
        if (cur.category === 1) {
            pre[0].push(cur)
        } else if (cur.category === 2) {
            pre[1].push(cur)
        } else {
            pre[2].push(cur)
        }
        return pre
    }, <News[][]>[[], [], []])
})

const tabList = [
    {
        label: '最新动态',
        name: 0
    },
    {
        label: '典型案例',
        name: 1
    },
    {
        label: '通知公告',
        name: 2
    }
]

</script>

<style scoped>
.container {}

.search {
    width: 50%;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, 0);
}

.header-bg {
    width: 100%;
    height: 400px;
    background-image: url('../../assets/2030898.jpg');
    background-size: cover;
    position: relative;
}

.search-item {
    height: 25px;
    line-height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.search-item:hover {
    color: #1296db;
    cursor: pointer;
    background-color: #ddd;
}

.topNews {
    margin: 20px;
    padding-bottom: 20px;
}

.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.image {
    width: 100%;
    display: block;
    object-fit: cover;
}

.news-text {
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.tabList-card {
    margin: 20px;
}

.tabList-card-item {
    display: flex;
    align-items: center;
}

.tabList-card-item img {
    width: 35%;
    object-fit: cover;
}
</style>