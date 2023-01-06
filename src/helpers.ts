import axios from 'axios';
import fs from 'fs/promises';
import { google } from 'googleapis';
import pMap from 'p-map';
import path from 'path';
import { cloudFunctions } from './clients';
import {
  DownloaderArgs,
  MinimalDownloadUrlType,
  MinimalFunctionType
} from './types';

export async function setAuth() {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });

  const authClient = await auth.getClient();
  google.options({ auth: authClient });
}

export const getFunctionsList = async (options: DownloaderArgs) => {
  const result = await cloudFunctions.projects.locations.functions.list({
    parent: `projects/${options.project}/locations/${options.region}`,
  });
  return result.data.functions as MinimalFunctionType[];
};

export const getDownloadUrls = async (
  functions: MinimalFunctionType[],
  options: DownloaderArgs,
) => {
  const result = await pMap(functions, (cFunction) => {
    return Promise.all([
      cloudFunctions.projects.locations.functions.generateDownloadUrl({
        name: cFunction.name,
      }),
      cFunction.name.replace(
        `projects/${options.project}/locations/${options.region}/functions/`,
        '',
      ),
    ]);
  });
  return result as MinimalDownloadUrlType;
};

export const download = async (
  downloadUrls: MinimalDownloadUrlType,
  options: DownloaderArgs,
) => {
  for (const [, value] of downloadUrls.entries()) {
    const [functionResult, name] = value;
    const url = functionResult.data.downloadUrl;
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    await fs.writeFile(path.join(options.output, `${name}.zip`), res.data);
  }
};
