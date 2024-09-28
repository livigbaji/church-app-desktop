export interface ElectronAPI {
  invoke: (channel: string, ...args: any[]) => Promise<any>;
  // Add other methods you might use
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
