const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const Store = require('electron-store')
const store = new Store({ name: "data" });
const path = require('path')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'sample',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.handle('open-window', (event,value) => {
    const subWindow = new BrowserWindow({
        width: 600,
        height: 400,
        title: value,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js')
        }
    })
    subWindow.loadFile('sub.html')
  })

  ipcMain.handle('open-dialog', async () => {
    return dialog
      .showOpenDialog(mainWindow, {
        properties: ['openFile'],
      })
      .then((result) => {
        if (result.canceled) return ''
        return result.filePaths[0]
      })
  })

  ipcMain.handle('getTodoList', async () => {
    return store.get('todoList',[])
  })

  ipcMain.handle('setTodoList', async (event,data) => {
    store.set('todoList',data)
  })

  ipcMain.handle('deleteTodoList', async () => {
    store.clear()
  })

  mainWindow.loadFile('index.html')
  //デバック時に使用
  // mainWindow.openDevTools()
};

app.whenReady().then(() => {
    createWindow()
})

//windowsやlinuxだとウィンドウが終了するとアプリケーションが完全に終了する。
app.on('window-all-closed',() => {
    if(process.platform !== 'darwin') app.quit()
})