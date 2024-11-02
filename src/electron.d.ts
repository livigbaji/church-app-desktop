export interface ElectronAPI {
  invoke: (channel: string, ...args: unknown[]) => Promise<unknown>;
  // Add other methods you might use
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
