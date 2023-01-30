import axios from 'axios';
import chalk from 'chalk';
import { google } from 'googleapis';
import ora from 'ora';
import pMap from 'p-map';
import path from 'path';
import { cloudFunctions } from './clients.js';
import {
  DownloaderArgs,
  MinimalDownloadUrlType,
  MinimalFunctionType
} from './types.js';
import { writeFileSafely } from './utils.js';

export async function setAuth() {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });

  const authClient = await auth.getClient();
  google.options({ auth: authClient });
}

export const getFunctionsList = async (options: DownloaderArgs) => {
  const spinner = ora('     Functions List');
  spinner.color = 'yellow';
  spinner.prefixText = chalk.cyan('get');
  spinner.start();
  const result = await cloudFunctions.projects.locations.functions.list({
    parent: `projects/${options.project}/locations/${options.region}`,
  });
  spinner.stopAndPersist();
  return result.data.functions as MinimalFunctionType[];
};

export const getDownloadUrls = async (
  functions: MinimalFunctionType[],
  options: DownloaderArgs,
) => {
  const spinner = ora('     Functions URLs');
  spinner.color = 'yellow';
  spinner.prefixText = chalk.cyan('get');
  spinner.start();
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
  spinner.stopAndPersist();
  return result as MinimalDownloadUrlType;
};

export const download = async (
  downloadUrls: MinimalDownloadUrlType,
  options: DownloaderArgs,
) => {
  const spinner = ora();
  for (const [, value] of downloadUrls.entries()) {
    const [functionResult, name] = value;
    const url = functionResult.data.downloadUrl;
    try {
      spinner.color = 'yellow';
      spinner.prefixText = chalk.cyan('download');
      spinner.text = `${name}.zip`;
      spinner.spinner = 'dots';
      spinner.start();
      const res = await axios.get(url, { responseType: 'arraybuffer' });
      await writeFileSafely(path.join(options.output, `${name}.zip`), res.data);
      spinner.stopAndPersist();
    } catch (error) {
      spinner.stopAndPersist({
        text: `${chalk.red('Failed to download')}: ${spinner.text}`,
      });
      console.log(`Could not get: ${name}\n${error}`);
    }
  }
};
