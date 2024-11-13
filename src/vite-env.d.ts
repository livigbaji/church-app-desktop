/// <reference types="vite/client" />

interface Window {
  // expose in the `electron/preload/index.ts`
  backend: import('electron').IpcRenderer
}
