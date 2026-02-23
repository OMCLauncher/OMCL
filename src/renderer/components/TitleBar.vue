<template>
  <div class="title-container">
    <div class="window-controls">
      <button @click="minimize">−</button>
      <button @click="toggleMaximize">{{ isMaximized ? '❐' : '□' }}</button>
      <button @click="close">×</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isMaximized = ref(false);

const minimize = () => {
  window.electronAPI.minimize();
};

const toggleMaximize = () => {
  if (isMaximized.value) {
    window.electronAPI.unmaximize();
  } else {
    window.electronAPI.maximize();
  }
  isMaximized.value = !isMaximized.value;
};

const close = () => {
  window.electronAPI.close();
};
</script>

<style scoped>
.title-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: rgb(35, 168, 242);
  -webkit-app-region: drag; /* 允许拖拽窗口 */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
}

.window-controls button {
  background: none;
  border: none;
  outline: none; /* 移除默认聚焦边框 */
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
  -webkit-app-region: no-drag; /* 按钮区域不允许拖拽 */
}

.window-controls button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* 点击时去除默认边框 */
.window-controls button:focus {
  outline: none;
  border: none;
}
</style>