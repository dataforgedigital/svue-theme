# Shopify Vue Theme


This package helps you to use Vuejs, Scss in development and build into javascript, css files to integrate into Shopify theme.

## Benefit

- The limitation of Shopify theme structure source code is that it is difficult to manage when your project grows larger because you cannot customize the folder hierarchy according to each category or function that you want to group. With SVueTheme you can do that comfortably, as you only need to care about the javascript or css files that SVueTheme exports for use in your Shopify theme.

- With VanilaJs, you have to set up and define everything from scratch, while using SVueTheme you develop entirely on Vuejs, so it's easy to reuse the features provided by Vue, as well as use external services and plugins easily by integrating into Vue.

- With CSS, we also allow publishing from SCSS separately from Javascript. It's convenient when you can use all the features that SCSS brings.

## Get started
### Installation

||command|
|:---:|:---|
|npm|`npm i -D svuet`|
|yarn|`yarn add -D svuet`|

### Setup

1. Create `svuet.config.js` file and export the following required object:

| Fields | Type | Example | Default |
|:---|:---:|:---|:---:|
| `store`: Your store name, this field is required if you want to run the `shopify theme dev` command | `String`| `vue-stheme`, `vue-stheme.myshopify.com` | - |
|`build.prefix`: The filename prefix is ​​output after the build.Set `null` if no prefix is ​​desired.| `String` |`svuet`|`svuet`|
|`build.outdir`: Folder containing files exported after build| `String` |`assets`|`assets`|
|`build.javascript`: Script configuration information| `Object`|View `Script configuration information`|-|
|`build.styles`: Style configuration information| `Object`|View `Style configuration information`|-|

<details>
<summary><b>Script configuration information</b></summary>

| Fields | Type | Example | Default |
|:---|:---:|:---|:---:|
| `input`: Input files | `String` \| `Object` | `resources/main.ts`, `{main:'resources/main.ts'}` | - |
| `output`: Output files | `String` | `[name].[ext]` | `[name].js` |
| `useLiquid`: Is the output file in `liquid` format? | `Bool` | - | `true` |
| `alias`: Alias ​​path | `Object` | `{'@':'resources'}` | - |
</details>

<details>
<summary><b>Style configuration information</b></summary>

| Fields | Type | Example | Default |
|:---|:---:|:---|:---:|
| `input`: Input files | `String` \| `Object` | `resources/styles/main.scss`, `{main:'resources/styles/main.scss'}` | - |
| `output`: Output files | `String` | `[name].[ext]` | `[name].css` |
| `useLiquid`: Is the output file in `liquid` format? | `Bool` | - | `true` |
| `alias`: Alias ​​path | `Object` | `{'@styles':'resources/styles'}` | - |
</details>

<details>
  <summary><b>Config Example</b></summary>
  <a href="https://github.com/dataforgedigital/svue-theme/tree/develop/docs/SVUET_CONFIG.md">View Config</a>
</details>


2. Add command to `package.json` file:

- Use the command `npm init -y` to create a `package.json` file if your project doesn't have one yet.
- Add the script as follows:
```json
{
  // your other configuration
  "type": "module",
  "scripts": {
    "dev": "svuet dev",
    "build": "svuet build"
    // your other scripts
  }
  // your other configuration
}
```

## Introduction

This is a step-by-step guide to using the Shopify theme folder structure.

### Init app

- `svuet.config.js`: Follow the [example](https://github.com/dataforgedigital/svue-theme/tree/develop/docs/SVUET_CONFIG.md) file

```vue
# components/HelloWorld.vue

<template>
  <div>Hello World!</div>
</template>
```

```javascript
# resources/main.ts

import { bootstrap } from 'svuet';
import HelloWorld from './instances/HelloWorld.vue';

bootstrap((app) => {
  app.instance('hello-world', HelloWorld);
});
```

```html
# layouts/theme.liquid

<header>
  <!-- more here -->
  <script src="{{ 'svuet-script.js' |  asset_url }}" defer></script>
</header>
  <!-- more here -->
```

- You can now use the instances defined in the `resources/main.ts` file normally as HTML.

```html
# sections/main-page.liquid

<hello-world></hello-world>
```

- Custom state pseudo-class CSS selectors

```css
/* Before rendering the component */
hello-world:state(creating) {
  /* your style here */
}

/* When the component is rendered */
hello-world:state(mounted) {
  /* your style here */
}
```

### Instance

```javascript
# resources/main.ts

import { bootstrap, defineElementInput } from 'svuet';

bootstrap((app) => {
  app.instance('hello-world', HelloWorld);

  // or

  app.instance('hello-world', defineElementInput({original: HelloWorld}));
});
```

### Config Provider Element

Use the `<app-config-provider>` element to set configuration, set configuration values ​​by setting values ​​for the dataset (using the attribute prefixed with `data-`) of this element.

```html
<app-config-provider data-template="{{ template }}"></app-config-provider>
```

You can now use the config, `$configs` info variable in the `<template>` of your vue file or instance's slot.
Or you can also inject `appConfigProvider` variable into vue file.

```vue
# components/HelloWorld.vue

<template>
  <div>
    <p>
      Template from globalProperties value: {{ $configs.template }}
    </p>
    <p>
      Template from provider value: {{ configs.template }}
    </p>
  </div>
</template>

<script setup>
  const configs = inject('appConfigProvider');
</script>
```

```liquid
# sections/main-page.liquid

<hello-world>
  <template v-slot>
    <p>
      Template from globalProperties value: {% echo '{{ $configs.template }}'%}
    </p>
  </template>
</hello-world>
```

You can also set additional configuration in the bootstrap callback function.

```javascript
import { bootstrap } from 'svuet';

bootstrap((app) => {
  // more here
  app.useConfig({name: 'VueApp'});
});
```

### Component

```html
# sections/main-page.liquid

<hello-world>
  <hello-inner-component></hello-inner-component>
</hello-world>
```

```javascript
# resources/main.ts

import { bootstrap, defineElementInput } from 'svuet';
import HelloWorld from './instances/HelloWorld.vue';
import HelloInnerComponent from './components/HelloInnerComponent.vue';

bootstrap((app) => {
  // Global component (using all instance)
  app.component('hello-inner-component', HelloWorld);
  // or
  app.components([
    { name: 'hello-inner-component', component: HelloWorld },
  ])

  // Internal component (using only in HelloWorld instance)
  app.instance('hello-world', defineElementInput({
    original: HelloWorld,
    components: { HelloInnerComponent } // { [name]: Component | DefineComponent }
  }));
});
```

### Props

- Element attribute props:

```liquid
# sections/main-page.liquid

<hello-world v-prop:page-title="'{{ page.title }}'">
  <template v-slot>
    <p>
      Page title prop value: {% echo '{{ pageTitle }}'%}
    </p>
  </template>
</hello-world>
```

- **Note**: that we have to use the `'` character to represent the prop as a string because it has to comply with Vue syntax. If you want to pass more complex props, you can use prop slots.


```liquid
# sections/main-page.liquid

<hello-world v-prop:page-title="'{{ page.title }}'" v-prop:cart-item.#temp>
  <template v-slot>
    <p>
      Page title prop value: {% echo '{{ pageTitle }}'%}
    </p>
    <p>
      Cart first item title prop value: {% echo '{{ cartItem?.title }}'%}
    </p>
  </template>
  <template v-slot:bind:cart-item>{{ cart.items | first | json }}</template>
</hello-world>
```

- You can also specify the exact data type by adding the suffix `.{type}` in the slot prop name, the values ​​of type include: `obj`, `string`, `num`, `bool`, and default is `obj`.

```liquid
# sections/main-page.liquid

<hello-world v-prop:cart-item.#temp v-prop:cart-note.#temp>
  <template v-slot:bind:cart-item.obj>{{ cart.items | first | json }}</template>
  <template v-slot:bind:cart-note.string>{{ cart.note }}</template>
</hello-world>
```

- Pass prop in bootstrap callback function:
```typescript
# resources/main.ts

import { bootstrap, defineElementInput } from 'svuet';
import HelloWorld from './instances/HelloWorld.vue';

bootstrap((app) => {
  app.instance('hello-world', defineElementInput({
    original: HelloWorld,
    props: {
      title: 'Bootstrap title prop'
    }
  }));
});

```

- Change prop value outside vue app

```javascript
const helloWorldElm = document.querySelector('hello-world')

// Only change the value of previously defined props, trying to change an undeclared prop will cause an error
helloWorldElm.$props.pageTitle = "New Prop Value"
```

### Plugin

```typescript
# resources/plugins/dayjs.ts

import { Plugin } from "vue";
import dayjs from "dayjs";

const dayjsPlugin: Plugin = {
  install: (app, options) => {
    app.config.globalProperties.$dayjs = dayjs;
  }
}

export default dayjsPlugin;

```

```typescript
# resources/main.ts

import { bootstrap, defineElementInput } from 'svuet';
import dayjsPlugin from './plugins/dayjs.ts';
import HelloWorld from './instances/HelloWorld.vue';

bootstrap((app) => {
  // Global plugin (using all instance)
  app.use(dayjsPlugin, /** options is optional */);

  // Internal plugin (using only in HelloWorld instance)
  app.instance('hello-world', defineElementInput({
    original: HelloWorld,
    plugins: [
      { plugin: dayjsPlugin, /** options is optional */ }
    ]
  }));
});
```
### Slots
About slots using VueJS syntax


```liquid
# sections/main-page.liquid

<hello-world>
  <template v-slot>This is default slot.</template>
  <!--
    Tags outside the <template> tag are in the default slot.
  -->
  <template v-slot:detail>This is detail slot.</template>
  <template v-slot:counter="data">This is counter slot with prop data. Count: {% echo '{{ data.count }}' %}</template>
</hello-world>
```

```vue
# components/HelloWorld.vue

<template>
  <div>
    <slot></slot>
    <slot name="detail"></slot>
    <slot name="counter" :count="1"></slot>
  </div>
</template>
```
**Note**: You cannot use the props slot as a normal slot.

## [Demo page]() (in development)
## [Demo source code]() (in development)

# 💬 Contributions & Feedback
I deeply value contributions and feedback from the community to make this package even better. If you have ideas, issues to discuss, or improvements, feel free to create an issue or submit a pull request. Every contribution is greatly appreciated!

# ⭐ Show Your Support
If you find this package helpful, please consider giving it a ⭐ on GitHub. It’s a small gesture that motivates me to keep creating and improving open-source projects. Thank you so much! ❤️
