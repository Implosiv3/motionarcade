declare global {
  interface Window {
    exportPng?: (
      options?: ExportPngOptions
    ) => Promise<string>;
  }
}

type ExportPngOptions = {
  pixelRatio?: number;
  width?: number;
  height?: number;
  doTrimToBoundingBox?: boolean;
};

export function registerExportPng(
  fn: (...args: any[]) => Promise<string>
) {
  window.exportPng = fn;

  return () => {
    delete window.exportPng;
  };
}