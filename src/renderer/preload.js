const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('settingsapi', {
  promptDirectorySelection: () => ipcRenderer.invoke('settings:promptDirectorySelection'),
  get: () => ipcRenderer.invoke('settings:get'),
  save: (settings) => ipcRenderer.invoke('settings:save', settings),
})

contextBridge.exposeInMainWorld('ffmpeg', {
  // Methods
  promptVideoSelection: () => ipcRenderer.invoke('ffmpeg:promptVideoSelection'),
  start: (files, encoder, size, output) => ipcRenderer.invoke('ffmpeg:start', files, encoder, size, output),
  abort: () => ipcRenderer.invoke('ffmpeg:abort'),
  getEncoders: () => ipcRenderer.invoke('ffmpeg:getEncoders'),
  // Event handlers
  onStart: (cb) => ipcRenderer.on('ffmpeg:event:start', (e, queueData) => cb(queueData)),
  onWalk: (cb) => ipcRenderer.on('ffmpeg:event:walk', (e, queueData) => cb(queueData)),
  onFinish: (cb) => ipcRenderer.on('ffmpeg:event:finish', (e, queueData) => cb(queueData)),
})

contextBridge.exposeInMainWorld('app', {
  getVersion: () => ipcRenderer.invoke('app:version'),
  getName: () => ipcRenderer.invoke('app:name'),
})

contextBridge.exposeInMainWorld('logger', {
  // Methods
  status: (module, logText) => ipcRenderer.invoke('logging:status', module, logText),
  debug: (module, variables) => ipcRenderer.invoke('logging:debug', module, variables),
})
