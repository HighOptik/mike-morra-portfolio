/// <reference types="vite/client" />

interface Window {
  createUnityInstance?: (
    canvas: HTMLCanvasElement,
    config: {
      dataUrl: string;
      frameworkUrl: string;
      codeUrl: string;
      streamingAssetsUrl?: string;
      companyName?: string;
      productName?: string;
      productVersion?: string;
    },
    onProgress?: (progress: number) => void,
  ) => Promise<{ Quit: () => Promise<void> }>;
}
