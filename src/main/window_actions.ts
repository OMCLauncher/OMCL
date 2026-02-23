import { ipcMain } from 'electron'
import { mainWindow } from './main'

export const windowActions = {
  minimize: () => {
    mainWindow?.minimize()
  },
  maximize: () => {
    mainWindow?.maximize()
  },
  unmaximize: () => {
    mainWindow?.unmaximize()
  },
  close: () => {
    mainWindow?.close()
  }
}

ipcMain.on('window-minimize', windowActions.minimize)
ipcMain.on('window-maximize', windowActions.maximize)
ipcMain.on('window-unmaximize', windowActions.unmaximize)
ipcMain.on('window-close', windowActions.close)