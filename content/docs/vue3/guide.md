+++
title = "指南"
date = 2024-09-23T08:56:50+08:00
weight = 0
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

## 使用`vue create dirName`命令和`npm init vite@latest`命令的区别

​	`vue create dirName` 和 `npm init vite@latest` 是两种常见的初始化 Vue 项目的方式，但它们之间有显著的区别，主要体现在项目的构建工具、配置复杂度、性能优化等方面：

1. **工具与构建器**

- `vue create dirName`: 使用 Vue CLI 创建项目。
  - Vue CLI 是基于 Webpack 的脚手架工具，用于快速生成 Vue 项目模板。
  - 提供图形化的配置界面，支持自定义插件、样式、状态管理等选项。
  - Webpack 是其核心构建工具，拥有丰富的插件生态系统，但配置相对复杂。
- `npm init vite@latest`: 使用 Vite 创建项目。
  - Vite 是一个更现代化的构建工具，基于 ESBuild 和 Rollup，主打开发时的极致性能和简单的配置。
  - 开发服务器启动快，HMR（热模块替换）响应速度快，适合大型项目的开发。
  - 配置轻量化，默认提供了更好的性能优化选项。

2. **性能**

- **Vue CLI（Webpack）**: 构建速度较慢，特别是当项目变大时，编译速度会明显下降。开发环境中的 HMR 性能相对较差，构建时间长。
- **Vite**: 启动速度快，HMR 响应迅速。由于使用了 ESBuild 进行预构建，开发体验极佳，特别是大型项目。

3. **配置与扩展性**

- **Vue CLI**: 配置灵活，适合需要自定义构建流程的项目。插件生态丰富，可以在创建项目时根据需要选择和配置 TypeScript、Vue Router、Vuex 等。
- **Vite**: 配置简洁，更注重开发体验和性能优化。默认配置已经足够应对大部分场景，但当需要自定义配置时，也可以通过插件进行扩展。

4. **社区与生态**

- **Vue CLI**: 社区成熟，插件体系庞大，很多老项目和企业级应用依赖 Vue CLI 进行开发。
- **Vite**: 社区增长迅速，已逐渐成为现代前端开发的主流选择，特别是新项目开发。Vue 团队官方也推荐使用 Vite 作为 Vue 3 的默认开发环境。

5. **开发体验**

- **Vue CLI**: 适合对构建流程有高度定制需求的开发者，或者对 Webpack 熟悉的团队。
- **Vite**: 提供“开箱即用”的开发体验，极大简化了配置，提升了开发效率。

**总结**

- 如果你需要稳定、成熟的配置且对 Webpack 熟悉，或者项目有复杂的构建需求，Vue CLI 是不错的选择。
- 如果你追求更好的开发体验、快速构建和更轻量的配置，Vite 是更现代的选择，尤其推荐用于 Vue 3 的新项目。

考虑到你的目标是独立开发一个完整的后台管理系统，Vite 可能会让你在开发速度和体验上有更好的感受。

## 热模块替换（HMR，Hot Module Replacement）

​	热模块替换（HMR，Hot Module Replacement）是一种用于前端开发的技术，允许在应用运行时替换、添加或删除模块，而无需完全刷新页面。这种机制显著提高了开发效率和用户体验，尤其在快速迭代和调试时。

HMR 的工作原理

1. **监听文件变化**: 开发服务器会监视项目中的文件变化（如 JS、CSS 等）。
2. **模块更新**: 当检测到文件变化时，开发服务器会通过 WebSocket 将更新的模块信息发送到浏览器。
3. 模块替换: 浏览器接收到更新后，HMR 会尝试只替换改变的模块，而不是重新加载整个页面。这通常涉及到以下几个步骤：
   - 旧模块的状态保存。
   - 新模块的加载和执行。
   - 根据需要，更新相关的组件或状态。

HMR 的优点

1. **提高开发效率**: 开发者可以在修改代码后立即看到效果，而无需等待整个页面重新加载，从而减少了开发过程中的等待时间。
2. **保持应用状态**: 由于只替换修改的模块，应用的状态（如用户输入、滚动位置等）通常会被保留，这对用户体验非常重要。
3. **快速调试**: 开发者可以快速进行调试，实时查看更改的效果，而不必频繁手动刷新页面。

HMR 的局限性

- **不支持所有模块**: 有些模块可能无法通过 HMR 完全替换，特别是涉及全局状态的模块，可能需要额外的处理。
- **复杂的状态管理**: 在使用状态管理库（如 Vuex 或 Redux）时，热更新可能需要额外的代码来维护状态的一致性。
- **初始配置**: HMR 需要在开发环境中进行配置和支持，并不是所有构建工具默认启用。

使用 HMR

​	在现代前端框架和构建工具（如 Vue、React、Webpack、Vite 等）中，HMR 通常都是开箱即用的。`以 Vite 为例，它在开发模式下默认启用 HMR，开发者无需额外配置`。

结论

​	热模块替换是一种极大提升前端开发体验的技术，尤其在需要频繁修改和调试代码的场景下，能够有效减少开发周期，提高生产力。通过利用 HMR，开发者可以专注于实现功能，而无需过多关注页面的加载与状态管理。

## 介绍下使用npm init vite@latest FirstViteApp命令，选用vue框架以及typescript之后所创建的FirstViteApp目录下各个文件以及文件夹的作用

1. **index.html**

   这是项目的入口 HTML 文件。Vite 在开发时会使用此文件，它会加载 `main.ts` 文件并初始化应用。你可以在此文件中配置页面的基本结构、引入样式和脚本等。

2. **package.json**

   该文件包含项目的元数据，包括项目名称、版本、依赖项和脚本命令。你可以在这里查看和管理项目所需的依赖，以及添加自定义的 npm 脚本来启动或构建项目。

3. **src/** 目录

   这个文件夹包含了项目的源代码。

   - **assets/**: 用于存放静态资源（如图片、字体等）。在开发中可以将所有相关资源放在这里以便管理。
   - **components/**: 该文件夹用于存放 Vue 组件。你可以在此创建和组织不同的组件，以便在 `App.vue` 或其他组件中进行引用。
   - **App.vue**: 主应用组件，是 Vue 应用的根组件。你可以在这里定义应用的主要结构和样式，并将其他组件嵌套在其中。
   - **main.ts**: 应用的入口文件。这里是 Vue 应用的初始化代码，通常会在此引入 Vue、根组件和挂载到 DOM。

4. **tsconfig.json**

   TypeScript 的配置文件。该文件定义了 TypeScript 编译器的选项，如编译目标、模块解析方式等。你可以根据项目需求修改这些设置。

5. **tsconfig.node.json**

   作用: 这是 TypeScript 的配置文件，专门用于 Node.js 环境的配置。

   **内容**: 文件中定义了一些 TypeScript 编译选项，适用于在 Node.js 中运行的代码，例如 Vite 的配置文件和其他 Node.js 相关的脚本。通常，这些选项包括模块解析、库类型等，以确保 TypeScript 在 Node 环境中正常工作。

6. **vite.config.ts**

   Vite 的配置文件。这里可以配置 Vite 的各种选项，例如插件、构建输出目录等。你可以在此文件中进行进一步的定制。

7. **node_modules/** 目录

   该目录包含项目的所有依赖库，运行 `npm install` 时会自动生成。通常不需要手动修改此目录。

8. **index.html**

   作用: 这是项目的主 HTML 文件，用于加载你的 Vue 应用。

   内容:

   - 包含 `<head>` 和 `<body>` 标签，通常在 `<head>` 中设置文档标题、引入 CSS 样式等。
   - `<body>` 中会有一个根元素（例如 `<div id="app"></div>`），Vue 应用会被挂载到这个元素上。
   - Vite 会在开发过程中注入脚本来加载 JavaScript 代码，确保应用可以正确运行。



## tsconfig.node.json中的可以配置的配置项和tsconfig.json配置项一样吗？

​	`tsconfig.node.json` 中的配置项和 `tsconfig.json` 中的配置项基本是一样的。它们都使用 TypeScript 编译器的配置项 (`compilerOptions`)，因为它们本质上都是 TypeScript 的配置文件，只是用于不同的上下文或用途。

主要区别在于使用场景

- **`tsconfig.json`**: 通常是 TypeScript 项目的主配置文件，用于定义项目的全局编译选项。它包含了所有的编译选项、文件包含和排除规则，适用于整个项目。
- **`tsconfig.node.json`**: 是一种特定的配置文件，通常用于 Node.js 环境的特殊编译选项配置。它可能会有一些针对 Node.js 环境优化的配置，比如模块解析策略、编译目标等。这个文件常用于覆盖或扩展主 `tsconfig.json` 中的配置，以适应特定环境或构建任务。

主要配置项的相似性

- 两者中的 **`compilerOptions`**、**`include`**、**`exclude`** 等配置项是完全一致的。
- 它们共享同样的编译选项，如 `target`、`module`、`lib`、`strict` 等，这些选项定义了如何将 TypeScript 代码编译为 JavaScript。

不同场景的配置示例

- **全局配置 (`tsconfig.json`)**: 定义全局编译行为，比如目标为浏览器环境、使用 ES 模块等。
- **特定配置 (`tsconfig.node.json`)**: 用于 Node.js 环境，可能会指定 `module` 为 `commonjs`，设置 `target` 为较新的 JavaScript 版本，以便更好地利用 Node.js 特性。

组合使用

​	在实际项目中，`tsconfig.node.json` 通常通过 `extends` 继承自 `tsconfig.json`，并针对 Node.js 环境的需求进行调整。例如：

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ES2020"
  }
}
```

总结

- `tsconfig.node.json` 中的配置项与 `tsconfig.json` 一致。
- `tsconfig.node.json`的主要作用是针对特定环境（如 Node.js）进行配置调整，以便更好地控制编译行为。

## npm init 是否是npm install的别名？

​	`npm init` 不是 `npm install` 的别名，这两个命令有不同的用途：

1. `npm init`

- **作用**：`npm init` 用于初始化一个新的 Node.js 项目或创建一个新的 `package.json` 文件。
- **使用方式**：执行 `npm init` 后，会引导你逐步填写项目的相关信息，如项目名称、版本、描述、入口文件、作者等。这个过程可以帮助你生成一个 `package.json` 文件，该文件包含了项目的配置信息。
- **简化命令**：你还可以使用 `npm init -y`（或 `npm init --yes`）来跳过所有提示，并使用默认值快速创建 `package.json` 文件。

2. `npm install`

- **作用**：`npm install`（或简写为 `npm i`）用于安装项目的依赖包。它会根据 `package.json` 文件中的依赖列表下载和安装所需的包到 `node_modules` 目录中。
- 使用方式：
  - `npm install`：安装 `package.json` 中列出的所有依赖。
  - `npm install <package>`：安装指定的包，并将其添加到 `package.json` 中的 `dependencies` 或 `devDependencies`。
  - 常用于设置项目环境和添加新的依赖。

总结

- `npm init`：用于创建和初始化项目，生成 `package.json` 文件。
- `npm install`：用于安装项目的依赖包，配置运行环境。

​	两者的功能完全不同，`npm init` 是项目初始化工具，而 `npm install` 是依赖管理工具。

## import {fileURLToPath, URL} from 'node:url' 中的node:url是什么作用？

​	在 `import { fileURLToPath, URL } from 'node:url'` 中，`'node:url'` 是 Node.js 内置的 `url` 模块的导入方式。这里的 `node:` 前缀是 Node.js 的一种新的模块导入方式，用于明确表示导入的模块是 Node.js 提供的原生模块。

## 常见的 Node.js 内置模块

​	Node.js 提供了许多内置模块，这些模块是核心的一部分，不需要额外安装，可以直接在 Node.js 环境中使用。以下是常用的 Node.js 内置模块列表及其功能简介：

1. **`fs`** (`node:fs`): 用于文件系统操作，如读取、写入、删除文件和目录。
2. **`path`** (`node:path`): 提供用于处理文件和目录路径的实用工具。
3. **`http`** (`node:http`): 用于创建 HTTP 服务器和客户端，实现 Web 服务器功能。
4. **`https`** (`node:https`): 与 `http` 类似，但用于 HTTPS 协议的安全通信。
5. **`url`** (`node:url`): 用于解析和格式化 URL 字符串。
6. **`crypto`** (`node:crypto`): 提供加密功能，包括哈希、签名、加密/解密等。
7. **`os`** (`node:os`): 提供操作系统相关的实用工具，如获取系统信息、环境变量等。
8. **`events`** (`node:events`): 提供事件驱动编程的实现，包含 EventEmitter 类，用于发布和订阅事件。
9. **`stream`** (`node:stream`): 提供可读、可写、可双向、可转换的流操作，用于处理数据流。
10. **`buffer`** (`node:buffer`): 用于处理二进制数据，尤其是在与网络、文件系统交互时。
11. **`process`** (`node:process`): 提供与当前 Node.js 进程交互的功能，如命令行参数、环境变量、退出状态等。
12. **`child_process`** (`node:child_process`): 用于创建子进程，以便运行外部命令和脚本。
13. **`net`** (`node:net`): 提供底层网络通信功能，用于创建 TCP 服务器和客户端。
14. **`dns`** (`node:dns`): 用于执行域名解析，支持 DNS 查询。
15. **`timers`** (`node:timers`): 提供定时器功能，如 `setTimeout` 和 `setInterval` 的底层实现。
16. **`assert`** (`node:assert`): 提供断言功能，用于测试代码时的断言判断。
17. **`zlib`** (`node:zlib`): 用于压缩和解压缩数据，支持 gzip、deflate 等格式。
18. **`readline`** (`node:readline`): 提供从可读流（如 `process.stdin`）逐行读取输入的功能。
19. **`vm`** (`node:vm`): 提供虚拟机上下文执行 JavaScript 代码的功能。
20. **`tty`** (`node:tty`): 用于处理 TTY（终端）相关的输入和输出。
21. **`repl`** (`node:repl`): 提供 Read-Eval-Print Loop（REPL）交互式编程环境。
22. **`v8`** (`node:v8`): 提供 V8 引擎特定的 API，用于检查和调整内存使用。
23. **`perf_hooks`** (`node:perf_hooks`): 提供高精度的性能测量工具。
24. **`inspector`** (`node:inspector`): 提供用于调试 Node.js 程序的调试协议 API。
25. **`worker_threads`** (`node:worker_threads`): 提供多线程功能，用于并行执行 JavaScript 代码。

## 使用内置模块

​	内置模块可以直接使用，通常通过 `import` 或 `require` 引入。例如：

```javascript
import fs from 'node:fs';
import path from 'node:path';
```

总结

- Node.js 的内置模块覆盖了文件操作、网络通信、加密、流处理等各个方面，为开发高效的服务器端应用提供了基础。
- 使用 `node:` 前缀可以显式指定模块是 Node.js 原生模块，避免与第三方模块混淆。



## 模块是什么？

​	模块是现代编程中的一种重要概念，它指的是将代码组织成独立的、可重用的单元。模块化编程是一种软件设计方法，它强调将程序分解成多个独立的、相互作用的模块，每个模块负责一部分功能。这种方法提高了代码的可维护性、可读性和可重用性。

模块的基本概念

1. **模块定义**：
   - 模块是一个文件或一组文件，它们一起定义了一组相关的功能。
   - 模块通常包含函数、类、变量以及其他资源。
2. **模块的作用**：
   - **封装**：模块可以封装代码，使其只暴露必要的接口，隐藏内部实现细节。
   - **重用**：模块可以被多次导入和使用，减少了代码重复。
   - **隔离**：模块之间可以互相独立，降低代码之间的耦合度。
   - **管理复杂性**：通过将大型程序划分为小模块，可以更容易地管理程序的复杂性。

模块化的实现

​	不同的编程环境有不同的模块化规范和实现方式。以下是一些常见的模块化实现：

1. CommonJS (CJS)

- **环境**：主要应用于 Node.js 环境。
- 导入/导出：
  - 使用 `require` 导入模块。
  - 使用 `module.exports` 或 `exports` 导出模块。
- **加载机制**：同步加载模块。

2. ES Modules (ESM)

- **环境**：现代浏览器和最新版本的 Node.js。
- 导入/导出：
  - 使用 `import` 导入模块。
  - 使用 `export` 导出模块。
- **加载机制**：异步加载模块。

3. AMD (Asynchronous Module Definition)

- **环境**：主要用于浏览器端。
- 导入/导出：
  - 使用 `define` 定义模块。
  - 使用 `require` 加载模块。
- **加载机制**：异步加载模块。

4. UMD (Universal Module Definition)

- **环境**：跨环境使用（浏览器和 Node.js）。
- 导入/导出：
  - 支持多种模块加载方式（CommonJS、AMD、全局变量）。
- **加载机制**：取决于使用的环境。

示例代码

以下是一些使用不同模块化规范的示例代码。

CommonJS 示例

```javascript
// math.js
module.exports = {
  add: function(a, b) {
    return a + b;
  },
  subtract: function(a, b) {
    return a - b;
  }
};

// app.js
const math = require('./math');
console.log(math.add(1, 2)); // 输出: 3
console.log(math.subtract(5, 3)); // 输出: 2
```

ES Modules 示例

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// app.js
import { add, subtract } from './math.js';
console.log(add(1, 2)); // 输出: 3
console.log(subtract(5, 3)); // 输出: 2
```

AMD 示例

```javascript
// 使用 RequireJS 定义模块
define(['lodash'], function(lodash) {
  console.log(lodash); // 使用 lodash 模块
});

// 在 HTML 文件中加载 RequireJS
<script src="path/to/require.js"></script>
<script>
  require(['your/module'], function(module) {
    // 使用模块
  });
</script>
```

## 模块是一个文件或一组文件，为什么可以是一组文件？

​	在讨论模块时提到它可以是一组文件，主要是因为在一些编程环境中，模块不仅仅限于单个文件，而是可以由多个文件组成的集合。这种扩展的模块概念是为了更好地组织和管理代码，特别是对于大型项目而言。以下是一些原因和具体示例：

1. 大型项目的需求

​	在大型项目中，单个模块可能会变得非常庞大，难以维护。为了更好地管理代码，可以将一个模块拆分成多个文件，每个文件负责一部分功能。这样做有几个好处：

- **更好的组织**：将相关的功能放在同一个目录下，每个文件负责一部分功能，使得代码结构更清晰。
- **更容易维护**：每个文件关注点单一，更容易进行调试和维护。
- **重用性**：多个文件组成的模块可以作为一个整体被其他模块导入，提高了重用性。

2. 模块文件结构示例

示例：一个简单的模块文件结构

​	假设我们有一个模块叫做 `math`，它包含了加法、减法、乘法、除法等功能。我们可以将其拆分成多个文件：

```txt
math/
│
├── index.js
├── add.js
├── subtract.js
├── multiply.js
├── divide.js
```

​	每个文件可以定义一个具体的函数：

add.js

```javascript
export function add(a, b) {
  return a + b;
}
```

subtract.js

```javascript
export function subtract(a, b) {
  return a - b;
}
```

multiply.js

```javascript
export function multiply(a, b) {
  return a * b;
}
```

divide.js

```javascript
export function divide(a, b) {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
}
```

index.js

```javascript
export { add } from './add';
export { subtract } from './subtract';
export { multiply } from './multiply';
export { divide } from './divide';
```

​	在这个例子中，`index.js` 文件作为入口点，它从其他四个文件中导入了相应的函数，并将它们导出，使得外部可以方便地使用整个模块。

导入使用

```javascript
// main.js
import { add, subtract, multiply, divide } from './math';

console.log(add(1, 2)); // 输出: 3
console.log(subtract(5, 3)); // 输出: 2
console.log(multiply(4, 5)); // 输出: 20
console.log(divide(10, 2)); // 输出: 5
```

3. 模块化工具的支持

​	很多现代的构建工具（如 Webpack、Rollup 等）支持这种多文件模块的结构。它们可以自动处理文件的导入和导出，将多个文件合并成一个模块。

4. CommonJS 和 ES Modules 中的一组文件

​	在 CommonJS 中，也可以类似地组织模块：

示例：CommonJS 模块结构

```txt
math/
│
├── index.js
├── add.js
├── subtract.js
├── multiply.js
├── divide.js
```

index.js

```javascript
const add = require('./add');
const subtract = require('./subtract');
const multiply = require('./multiply');
const divide = require('./divide');

module.exports = {
  add,
  subtract,
  multiply,
  divide
};
```

总结

​	模块可以是一组文件的原因在于：

- **组织结构**：使代码更易于管理和维护。
- **功能性分离**：每个文件关注单一职责，便于理解和测试。
- **工具支持**：现代构建工具支持多文件模块的自动打包和处理。

​	通过这种方式，模块不仅可以是一个单一的文件，也可以是一组文件，这使得模块化编程更加灵活和强大。



## 常见的前端脚手架工具

###  1. Create React App

**用途**：用于创建 React 项目的脚手架工具。

**特点**：

- 提供零配置的开发体验。
- 内置了 Webpack 配置。
- 支持 TypeScript 和 Babel 配置。
- 适用于快速原型开发和中小型项目。

**命令**：

```sh
npx create-react-app my-react-app
```

### 2. Angular CLI

**用途**：用于创建 Angular 项目的脚手架工具。

**特点**：

- 提供了丰富的 CLI 命令来生成和管理 Angular 组件、服务等。
- 支持测试、构建和部署功能。
- 适用于大型企业级应用。

```sh
ng new my-angular-app
```

### 3. Vue CLI

**用途**：用于创建 Vue.js 项目的脚手架工具。

**特点**：

- 支持多种预设（preset），包括 Webpack 和 Vite。
- 提供了丰富的 CLI 命令来生成和管理 Vue.js 组件、服务等。
- 支持 TypeScript、PWA 等。

**命令**：

```sh
npm install -g @vue/cli
vue create my-vue-app
```

### 4. Create Vue App (deprecated)

**用途**：这是一个早期的 Vue.js 脚手架工具，现已不再维护，已被 Vue CLI 取代。

### 5. Next.js CLI

**用途**：用于创建基于 Next.js 的 React 项目的脚手架工具。

**特点**：

- 提供了服务器渲染和静态导出功能。
- 支持 TypeScript 和 ES6+ 特性。
- 适用于构建 SSR 和 SSG 应用。

**命令**：

```sh
npx create-next-app my-next-app
```

### 6. Gatsby CLI

**用途**：用于创建基于 Gatsby 的静态站点生成器的脚手架工具。

**特点**：

- 用于生成高性能的静态网站。
- 支持 GraphQL 数据查询。
- 适用于博客、文档站点等。

**命令**：

```sh
npx gatsby new my-gatsby-site
```

### 7. Ember CLI

**用途**：用于创建 Ember.js 项目的脚手架工具。

**特点**：

- 提供了丰富的 CLI 命令来生成和管理 Ember.js 组件、服务等。
- 支持测试、构建和部署功能。
- 适用于大型企业级应用。

**命令**：

```sh
ember new my-ember-app
```

### 8. SvelteKit CLI

**用途**：用于创建 SvelteKit 项目的脚手架工具。

**特点**：

- 提供了服务器端渲染和静态导出功能。
- 支持 TypeScript 和 ES6+ 特性。
- 适用于构建 SSR 和 SSG 应用。

**命令**：

```sh
npx degit sveltejs/template svelte-app
cd svelte-app
npm install
```

### 9. Nuxt CLI

**用途**：用于创建基于 Nuxt.js 的 Vue 项目的脚手架工具。

**特点**：

- 提供了服务器端渲染和静态导出功能。
- 支持 TypeScript 和 ES6+ 特性。
- 适用于构建 SSR 和 SSG 应用。

**命令**：

```sh
npx create-nuxt-app my-nuxt-app
```



## 常见的前端构建工具

- Vite

  用途：现代 Web 应用程序的构建工具，提供了快速的冷启动性能和高效的热模块替换（HMR）。

  特点：基于浏览器原生 ES 模块，适合开发现代 Web 应用。

- Webpack

  用途：通用的模块打包工具，支持多种类型的模块（如 CSS、JavaScript、图像等）。

  特点：高度可配置，支持大量的插件和加载器。

  说明：Webpack 既可以被视为构建工具，也可以被视为打包工具，因为它不仅处理模块的打包，还支持构建时的各种任务。

- Rollup

  用途：ES 模块打包工具，专注于将模块打包成较小的、优化过的文件。

  特点：适合处理较大的项目，可以生成更小的包。

- Parcel

  用途：轻量级的 Web 应用构建工具，提供了零配置的开发体验。

  特点：易于使用，适合小型项目或快速原型开发。

- Browserify

  用途：早期流行的 JavaScript 模块打包工具，主要用于将 CommonJS 模块转换为浏览器可用的脚本。

  特点：简单易用，适合小型项目或旧项目。

- Snowpack

  用途：现代 Web 开发工具，提供了快速的启动时间和增量构建。

  特点：支持 ES 模块，适合现代 Web 应用。





## 对于针对Vue3的前端工程化项目有哪些依赖推荐安装？



## create-vue如何创建vue.js项目

​	首先全局安装create-vue（默认安装最新版本的create-vue）：

```sh
npm install -g create-vue
```

​	查看当前create-vue版本：

```sh
npm list -g | grep create-uve
```

​	使用create-vue创建项目：

```sh
create-vue my-app
```

​	接着会有这些提示（可以使用`Tab`键切换选项）：

```txt
？是否使用 TypeScript 语法？ › 否 / 是
？是否使用 TypeScript 语法？ … 否 / 是
？是否启用 JSX 支持？ … 否 / 是
？是否引入 Vue Router 进行单页面应用开发？ … 否 / 是
？是否引入 Pinia 用于状态管理？ … 否 / 是
？是否引入 Vitest 用于单元测试？ … 否 / 是
？是否要引入一款端到端（End to End）测试工具？ › Cypress
? 是否引入 ESLint 用于代码质量检测？ › 否 / 是
? 是否引入 Prettier 用于代码格式化？ … 否 / 是
? 是否引入 Vue DevTools 7 扩展用于调试? (试验阶段) … 否 / 是
```

### 示例1（全选`是`+`Cypress`）

![image-20240925093948430](/home/lx/Hugos/tools/content/docs/vue3/guide_img/image-20240925093948430.png)

​	安装完后，进入`my-app01`目录：

```sh
cd my-app01
```

​	查看目录下的文件：

```sh
lx@lxm:~/Fprjs/my-app01$ tree
.
├── cypress
│   ├── e2e
│   │   ├── example.cy.ts
│   │   └── tsconfig.json
│   ├── fixtures
│   │   └── example.json
│   └── support
│       ├── commands.ts
│       └── e2e.ts
├── cypress.config.ts
├── env.d.ts
├── index.html
├── package.json
├── public
│   └── favicon.ico
├── README.md
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── base.css
│   │   ├── logo.svg
│   │   └── main.css
│   ├── components
│   │   ├── HelloWorld.vue
│   │   ├── icons
│   │   │   ├── IconCommunity.vue
│   │   │   ├── IconDocumentation.vue
│   │   │   ├── IconEcosystem.vue
│   │   │   ├── IconSupport.vue
│   │   │   └── IconTooling.vue
│   │   ├── __tests__
│   │   │   └── HelloWorld.spec.ts
│   │   ├── TheWelcome.vue
│   │   └── WelcomeItem.vue
│   ├── main.ts
│   ├── router
│   │   └── index.ts
│   ├── stores
│   │   └── counter.ts
│   └── views
│       ├── AboutView.vue
│       └── HomeView.vue
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.vitest.json
├── vite.config.ts
└── vitest.config.ts

14 directories, 35 files
```

### 示例2（全选`否`+`不需要`）

![image-20240925103404017](/home/lx/Hugos/tools/content/docs/vue3/guide_img/image-20240925103404017.png)

安装完后，进入`my-app02`目录：

```sh
cd my-app02
```

​	查看目录下的文件：

```sh
lx@lxm:~/Fprjs/my-app02$ tree
.
├── index.html
├── jsconfig.json
├── package.json
├── public
│   └── favicon.ico
├── README.md
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── base.css
│   │   ├── logo.svg
│   │   └── main.css
│   ├── components
│   │   ├── HelloWorld.vue
│   │   ├── icons
│   │   │   ├── IconCommunity.vue
│   │   │   ├── IconDocumentation.vue
│   │   │   ├── IconEcosystem.vue
│   │   │   ├── IconSupport.vue
│   │   │   └── IconTooling.vue
│   │   ├── TheWelcome.vue
│   │   └── WelcomeItem.vue
│   └── main.js
└── vite.config.js

6 directories, 19 files
```

### 对比下两种方式下的文件内容

#### 示例1（全选`是`+`Cypress`）

{{< tabpane text=true persist=disabled >}}

{{% tab header="index.html" %}}

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

{{% /tab  %}}

{{% tab header="package.json" %}}

```json
{
  "name": "my-app01",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "run-p type-check \"build-only {@}\" --",
    "preview": "vite preview",
    "test:unit": "vitest",
    "test:e2e": "start-server-and-test preview http://localhost:4173 'cypress run --e2e'",
    "test:e2e:dev": "start-server-and-test 'vite dev --port 4173' http://localhost:4173 'cypress open --e2e'",
    "build-only": "vite build",
    "type-check": "vue-tsc --build --force",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "format": "prettier --write src/"
  },
  "dependencies": {
    "pinia": "^2.1.7",
    "vue": "^3.4.29",
    "vue-router": "^4.3.3"
  },
  "devDependencies": {
    "@rushstack/eslint-patch": "^1.8.0",
    "@tsconfig/node20": "^20.1.4",
    "@types/jsdom": "^21.1.7",
    "@types/node": "^20.14.5",
    "@vitejs/plugin-vue": "^5.0.5",
    "@vitejs/plugin-vue-jsx": "^4.0.0",
    "@vue/eslint-config-prettier": "^9.0.0",
    "@vue/eslint-config-typescript": "^13.0.0",
    "@vue/test-utils": "^2.4.6",
    "@vue/tsconfig": "^0.5.1",
    "cypress": "^13.12.0",
    "eslint": "^8.57.0",
    "eslint-plugin-cypress": "^3.3.0",
    "eslint-plugin-vue": "^9.23.0",
    "jsdom": "^24.1.0",
    "npm-run-all2": "^6.2.0",
    "prettier": "^3.2.5",
    "start-server-and-test": "^2.0.4",
    "typescript": "~5.4.0",
    "vite": "^5.3.1",
    "vite-plugin-vue-devtools": "^7.3.1",
    "vitest": "^1.6.0",
    "vue-tsc": "^2.0.21"
  }
}
```

{{% /tab  %}}

{{% tab header="src/main.ts" %}}

```typescript
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
```

{{% /tab  %}}

{{% tab header="src/App.vue" %}}

```vue
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
```

{{% /tab  %}}

{{% tab header="src/components/HelloWorld.vue" %}}

```vue
<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
```

{{% /tab  %}}

{{% tab header="src/components/TheWelcome.vue" %}}

```vue
<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    Vue’s
    <a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a>
    provides you with all information you need to get started.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Tooling</template>

    This project is served and bundled with
    <a href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>. The
    recommended IDE setup is
    <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode</a> +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank" rel="noopener">Volar</a>. If
    you need to test your components and web pages, check out
    <a href="https://www.cypress.io/" target="_blank" rel="noopener">Cypress</a> and
    <a href="https://on.cypress.io/component" target="_blank" rel="noopener"
      >Cypress Component Testing</a
    >.

    <br />

    More instructions are available in <code>README.md</code>.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Get official tools and libraries for your project:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, and
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>. If
    you need more resources, we suggest paying
    <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>
    a visit.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Got stuck? Ask your question on
    <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>, our official
    Discord server, or
    <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener"
      >StackOverflow</a
    >. You should also subscribe to
    <a href="https://news.vuejs.org" target="_blank" rel="noopener">our mailing list</a> and follow
    the official
    <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
    twitter account for latest news in the Vue world.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>

    As an independent project, Vue relies on community backing for its sustainability. You can help
    us by
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a>.
  </WelcomeItem>
</template>
```

{{% /tab  %}}

{{% tab header="src/components/WelcomeItem.vue" %}}

```vue
<template>
  <div class="item">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;

  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
```

{{% /tab  %}}

{{% tab header="src/router/index.ts" %}}

```typescript
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
```

{{% /tab  %}}

{{% tab header="src/stores/counter.ts" %}}

```typescript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

{{% /tab  %}}

{{% tab header="src/view/About.vue" %}}

```vue
<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
```

{{% /tab  %}}

{{% tab header="src/view/HomeView.vue" %}}

```vue
<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
```

{{% /tab  %}}

{{% tab header="tsconfig.app.json" %}}

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue"],
  "exclude": ["src/**/__tests__/*"],
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

{{% /tab  %}}

{{% tab header="tsconfig.json" %}}

```json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.node.json"
    },
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.vitest.json"
    }
  ],
  "compilerOptions": {
    "module": "NodeNext"
  }
}
```

{{% /tab  %}}

{{% tab header="tsconfig.app.json" %}}

```json
{
  "extends": "@tsconfig/node20/tsconfig.json",
  "include": [
    "vite.config.*",
    "vitest.config.*",
    "cypress.config.*",
    "nightwatch.conf.*",
    "playwright.config.*"
  ],
  "compilerOptions": {
    "composite": true,
    "noEmit": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",

    "module": "ESNext",
    "moduleResolution": "Bundler",
    "types": ["node"]
  }
}
```

{{% /tab  %}}

{{% tab header="tsconfig.vitest.json" %}}

```json
{
  "extends": "./tsconfig.app.json",
  "exclude": [],
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.vitest.tsbuildinfo",

    "lib": [],
    "types": ["node", "jsdom"]
  }
}
```

{{% /tab  %}}

{{% tab header="vite.config.ts" %}}

```typescript
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

{{% /tab  %}}

{{% tab header="vitest.config.ts" %}}

```typescript
import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)
```

{{% /tab  %}}

{{% tab header="cypress.config.ts" %}}

```typescript
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173'
  }
})

```

{{% /tab  %}}

{{% tab header="cypress/e2e/example.cy.ts" %}}

```typescript
// https://on.cypress.io/api

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'You did it!')
  })
})
```

{{% /tab  %}}

{{% tab header="cypress/e2e/tsconfig.json" %}}

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": ["./**/*", "../support/**/*"],
  "compilerOptions": {
    "isolatedModules": false,
    "types": ["cypress"]
  }
}
```

{{% /tab  %}}

{{% tab header="cypress/fixtures/example.json" %}}

```json
{
  "name": "Using fixtures to represent data",
  "email": "hello@cypress.io",
  "body": "Fixtures are a great way to mock data for responses to routes"
}
```

{{% /tab  %}}

{{% tab header="cypress/support/commands.ts" %}}

```typescript
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

export {}
```

{{% /tab  %}}

{{% tab header="cypress/support/e2e.ts" %}}

```typescript
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
```

{{% /tab  %}}

{{< /tabpane >}}



#### 示例2（全选`否`+`不需要`）

{{< tabpane text=true persist=disabled >}}

{{% tab header="index.html" %}}

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>

```

{{% /tab  %}}

{{% tab header="package.json" %}}

```json
{
  "name": "my-app02",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.4.29"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.5",
    "vite": "^5.3.1"
  }
}

```

{{% /tab  %}}

{{% tab header="src/main.js" %}}

```typescript
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

```

{{% /tab  %}}

{{% tab header="src/App.vue" %}}

```vue
<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
```

{{% /tab  %}}

{{% tab header="src/components/HelloWorld.vue" %}}

```vue
<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
```

{{% /tab  %}}

{{% tab header="src/components/TheWelcome.vue" %}}

```vue
<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    Vue’s
    <a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a>
    provides you with all information you need to get started.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Tooling</template>

    This project is served and bundled with
    <a href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>. The
    recommended IDE setup is
    <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode</a> +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank" rel="noopener">Volar</a>. If
    you need to test your components and web pages, check out
    <a href="https://www.cypress.io/" target="_blank" rel="noopener">Cypress</a> and
    <a href="https://on.cypress.io/component" target="_blank" rel="noopener"
      >Cypress Component Testing</a
    >.

    <br />

    More instructions are available in <code>README.md</code>.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Get official tools and libraries for your project:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, and
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>. If
    you need more resources, we suggest paying
    <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>
    a visit.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Got stuck? Ask your question on
    <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>, our official
    Discord server, or
    <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener"
      >StackOverflow</a
    >. You should also subscribe to
    <a href="https://news.vuejs.org" target="_blank" rel="noopener">our mailing list</a> and follow
    the official
    <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
    twitter account for latest news in the Vue world.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>

    As an independent project, Vue relies on community backing for its sustainability. You can help
    us by
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a>.
  </WelcomeItem>
</template>
```

{{% /tab  %}}

{{% tab header="src/components/WelcomeItem.vue" %}}

```vue
<template>
  <div class="item">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;

  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
```

{{% /tab  %}}

{{% tab header="jsconfig.json" %}}

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

{{% /tab  %}}

{{% tab header="vite.config.js" %}}

```typescript
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

```

{{% /tab  %}}

{{< /tabpane >}}
