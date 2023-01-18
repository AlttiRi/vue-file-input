# vue-file-input

Vue.js file input with Drag and Drop support.

Mostly for personal use.

### Demo

```vue
<template>
  <FileInput :state="state"/>
</template>

<script setup>
import {FileInput, getStateInstance} from "@alttiri/vue-file-input";

const state = getStateInstance({recursive: true});
globalThis.state = state;
</script>
```
This demo is online: https://alttiri.github.io/vue-file-input/


## Installation

### From NPM

```bash
npm install @alttiri/vue-file-input
```

### From GitHub repository

```bash
npm install git+https://github.com/alttiri/vue-file-input.git
```

<details>

<summary>More ways</summary>

### From GitHub repository (a specific version):

- **Based on SemVer:**
    ```bash
    npm install git+https://github.com/alttiri/vue-file-input.git#semver:1.2.0
    ```
  Or add
    ```
    "@alttiri/vue-file-input": "github:alttiri/vue-file-input#semver:1.2.0"
    ```
  as `dependencies` in `package.json` file.

  See available [tags](https://github.com/AlttiRi/vue-file-input/tags).

- **Based on a commit hash:**
    ```bash
    npm install git+https://git@github.com/alttiri/vue-file-input.git#c1919e628aa30655e25b42859167cf04759a4fc5
    ```
  Or add
    ```
    "@alttiri/vue-file-input": "github:alttiri/vue-file-input#c1919e628aa30655e25b42859167cf04759a4fc5"
    ```
  as `dependencies` in `package.json` file.

  See available [commits hashes](https://github.com/AlttiRi/vue-file-input/commits/master).


### From GitHub Packages:
To install you need first to create `.npmrc` file with `@alttiri:registry=https://npm.pkg.github.com` content:
```bash
echo @alttiri:registry=https://npm.pkg.github.com >> .npmrc
```

only then run

```bash
npm install @alttiri/vue-file-input
```
Note, that GitHub Packages requires to have also `~/.npmrc` file (`.npmrc` in your home dir) with `//npm.pkg.github.com/:_authToken=TOKEN` content, where `TOKEN` is a token with the `read:packages` permission, take it here https://github.com/settings/tokens/new.

</details>
