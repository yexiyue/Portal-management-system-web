<template>
    <el-carousel v-if="data.length !== 0" :height="height + 'px'" direction="vertical" :autoplay="false">
        <el-carousel-item v-for="item in data" :key="item.id">
            <div :style="{ backgroundImage: `url(${item.cover})`, width: '100%', height: '100%', backgroundSize: 'cover' }">
                <el-card class="box-card">
                    <template #header>
                        <h2>{{ item.title }}</h2>
                        <p style="color:#1296db">{{ formatTime(item.updateTime) }}</p>
                    </template>
                    <div>
                        {{ item.description }}
                    </div>
                    <div class="detail">
                        {{ item.detail }}
                    </div>
                </el-card>
            </div>
        </el-carousel-item>
    </el-carousel>
    <el-empty v-else description="暂无产品" />
</template>

<script setup lang="ts">
import { getProduct, type Product } from '@/api';
import { formatTime } from '@/hooks/formatTime';
import { onMounted, ref } from 'vue';

const height = ref(window.innerHeight - 60)
onresize = () => {
    height.value = window.innerHeight - 60
}
const data = ref<Product[]>([])
onMounted(async () => {
    data.value = (await getProduct()).data

    console.log(data.value)
})

</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.box-card{
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
}

.detail{
    margin-top: 20px;
}
</style>