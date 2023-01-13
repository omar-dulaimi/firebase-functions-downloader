#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import { Command } from 'commander';
import figlet from 'figlet';
import path from 'path';
import process from 'process';
import downloader from '../downloader.js';
import { DownloaderArgs } from '../types.js';

clear();
console.log(
  chalk.red(
    figlet.textSync('firebase-fd', {
      horizontalLayout: 'full',
    }),
  ),
);

const program = new Command();

program
  .version('0.0.3', '-v, --version')
  .description('Automatically download Firebase/Google Cloud Functions code')
  .option(
    '-o, --output <value>',
    'Output path where functions will be downloaded to',
    path.join(process.cwd(), 'functions'),
  )
  .requiredOption('-p, --project <value>', 'Project to download from')
  .requiredOption(
    '-r, --region <value>',
    'Region where functions are deployed in',
  )
  .parse(process.argv);

const options: DownloaderArgs = program.opts();
console.log(options);

downloader(options)
  .then(() => {
    console.log('Success');
  })
  .catch((error) => {
    console.log('Failed: ', error);
  });
