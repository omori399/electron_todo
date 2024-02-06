const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
    //送信
    openWindow: () => ipcRenderer.invoke('open-window'),
    openDialog: () => ipcRenderer.invoke('open-dialog'),
    deleteTodoList: () => ipcRenderer.invoke('deleteTodoList'),
    getTodoList: () => ipcRenderer.invoke('getTodoList'),
    setTodoList: (data) => ipcRenderer.invoke('setTodoList',data)
  });