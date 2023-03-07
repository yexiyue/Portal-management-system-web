<template>
    <el-carousel :height="height + 'px'">
        <el-carousel-item>
            <img src="../../assets/2021812.jpg" alt="">
        </el-carousel-item>
        <el-carousel-item>
            <img src="../../assets/2030824.jpg" alt="">
        </el-carousel-item>
        <el-carousel-item>
            <img src="../../assets/2050960.jpg" alt="">
        </el-carousel-item>
    </el-carousel>
    <div class="title">
        人因不惜而散，茶因不饮而凉
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const height = ref(window.innerHeight - 60)
onresize=()=>{
    height.value=window.innerHeight - 60
}
</script>

<style scoped>
img {
    object-fit: cover;
    width: 100%;
}

.title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: white;
    font-size: 25px;
}
</style>