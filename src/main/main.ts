import { app, BrowserWindow, ipcMain, Menu, session } from 'electron';
import { join } from 'path';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1020,
    height: 630,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2] || 3000;
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  } else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }

  Menu.setApplicationMenu(null);

  // 监听窗口最大化/还原事件
  mainWindow.on('maximize', () => {
    mainWindow?.webContents.send('window-maximized');
  });

  mainWindow.on('unmaximize', () => {
    mainWindow?.webContents.send('window-unmaximized');
  });
}

app.whenReady().then(() => {
  createWindow();

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ["script-src 'self'"],
      },
    });
  });

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// 监听来自渲染进程的消息
ipcMain.on('message', (event, message) => {
  console.log(message);
});

// 窗口操作 IPC 监听器
ipcMain.on('window-minimize', () => {
  mainWindow?.minimize();
});

ipcMain.on('window-maximize', () => {
  mainWindow?.maximize();
});

ipcMain.on('window-unmaximize', () => {
  mainWindow?.unmaximize();
});

ipcMain.on('window-close', () => {
  mainWindow?.close();
});

export { mainWindow };