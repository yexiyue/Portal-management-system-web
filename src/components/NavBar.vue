<template>
    <div class="navBar">
        <el-menu
        :default-active="route.fullPath"
        class="el-menu-demo"
        mode="horizontal"
        router
        >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/news">新闻中心</el-menu-item>
        <el-menu-item index="/product">产品与服务</el-menu-item>
        <el-menu-item index="" @click="handleLoginClick" >登录</el-menu-item>
        </el-menu>
        <div class="title">
            企业门户官网
        </div>
    </div>
    
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route=useRoute()

const handleLoginClick=()=>{
    window.location.replace('/admin')
}
</script>

<style scoped>
.navBar{
    position: sticky;
    top: 0px;
    z-index: 999;
}



.title{
    position: fixed;
    top: 0;
    right: 20px;
    z-index: 1000;
    line-height: 60px;
    font-size: 14px;
}
</style>