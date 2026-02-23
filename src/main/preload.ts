const { contextBridge, ipcRenderer } = require('electron');

// 暴露 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message) => ipcRenderer.send('message', message),
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  unmaximize: () => ipcRenderer.send('window-unmaximize'),
  close: () => ipcRenderer.send('window-close'),
});