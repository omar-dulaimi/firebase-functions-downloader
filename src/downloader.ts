import {
    download,
    getDownloadUrls,
    getFunctionsList,
    setAuth
} from './helpers';
import { DownloaderArgs } from './types';

export default async function downloader(options: DownloaderArgs) {
  await setAuth();
  const functions = await getFunctionsList(options);
  const downloadUrls = await getDownloadUrls(functions, options);
  await download(downloadUrls, options);
}
