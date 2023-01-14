### Install from GitHub

Install the latest version from GitHub directly:
```bash
npm install git+https://github.com/alttiri/vue-file-input.git
```

```bash
npm install git+https://github.com/alttiri/vue-file-input.git -save-dev
```

Also, you can specify a semver with appending, for example, `#semver:0.0.5` to git-URL.

The same by adding this line in `package.json`'s `dependencies` field:
```json
"@alttiri/base85": "github:alttiri/base85#semver:0.0.5"
```


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
