/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronApi {
  unmaximize(): unknown;
  minimize(): unknown;
  maximize(): unknown;
  close(): unknown;
  sendMessage: (message: string) => void
}

declare global {
  interface Window {
    electronAPI: ElectronApi,
  }
}
