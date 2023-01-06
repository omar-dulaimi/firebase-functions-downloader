export declare interface DownloaderArgs {
  output: string;
  project: string;
  region: string;
}

export declare interface MinimalFunctionType {
  name: string;
}

export declare interface MinimalDownloadUrlDataType {
  data: {
    downloadUrl: string;
  };
}

export declare type MinimalDownloadUrlType = [
  MinimalDownloadUrlDataType,
  string,
][];
