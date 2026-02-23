<script setup lang="ts">
import TitleBar from './components/TitleBar.vue';
import HelloWorld from './components/HelloWorld.vue'

window.electronAPI.sendMessage('Hello from App.vue!');
</script>

<template>
  <TitleBar />
  <HelloWorld msg="你好啊，欢迎来到OMCL" />
</template>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}
</style>
