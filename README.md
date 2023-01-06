# Firebase Functions Downloader

[![npm version](https://badge.fury.io/js/firebase-functions-downloader.svg)](https://badge.fury.io/js/firebase-functions-downloader)
[![npm](https://img.shields.io/npm/dt/firebase-functions-downloader.svg)](https://www.npmjs.com/package/firebase-functions-downloader)
[![HitCount](https://hits.dwyl.com/omar-dulaimi/firebase-functions-downloader.svg?style=flat)](http://hits.dwyl.com/omar-dulaimi/firebase-functions-downloader)
[![npm](https://img.shields.io/npm/l/firebase-functions-downloader.svg)](LICENSE)

Automatically download your Firebase/Google Cloud Functions.

<p align="center">
  <a href="https://www.buymeacoffee.com/omardulaimi">
    <img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" height="41" width="174">
  </a>
</p>

## Table of Contents

- [Usage](#usage)
- [Available Options](#available-options)

# Usage

- Don't forget to star this repo 😉

## With npx

```shell
npx firebase-functions-downloader --project dev --region us-central
```

## With npm

1- Install the library

- npm

```bash
 npm install -g firebase-functions-downloader
```

or

- yarn

```bash
 yarn global add firebase-functions-downloader
```

2- Execute command

```shell
firebase-fd --project dev --region us-central
```

# Available Options

- `project`: string - Project to download from

  - alias: `p`
  - required

- `region`: string - Region where functions are deployed in

  - alias: `r`
  - required

- `output`: string - Output path where functions will be downloaded to

  - alias: `o`
  - optional
