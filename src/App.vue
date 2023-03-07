<template>
  <nav-bar></nav-bar>
  <router-view></router-view>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Tracker from 'yexiyue_tracker'

//进行数据上报
new Tracker({
  requestUrl:'/adminapi/sdk',
  jsError:true,
  performanceTracker:true,
  historyTracker:true,
  domTracker:true
})
</script>

<style>
*{
  margin: 0;
  padding: 0;
}

:root,#app{
  width: 100%;
  height: 100vh;
  user-select: none;

}
::-webkit-scrollbar{
  width:5px;
  height: 5px;
}
::-webkit-scrollbar-thumb{
  background-color: #1296db;
}

::-webkit-scrollbar-track{
  background-color: #ddd;
}
</style>