+++
title = "命令"
date = 2024-10-05T08:27:09+08:00
weight = 0
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

## 一、项目初始化与管理

### `npm init`
​	初始化一个新的 `package.json` 文件。
​	示例：

   ```   sh
   npm init
   ```

### `npm init -y`
​	使用默认值初始化 `package.json`，跳过所有提示。
​	示例：

   ```   sh
   npm init -y
   ```

### `npm init <initializer>`
​	使用某个初始化器创建项目（如 `npm init vite`）。
​	示例：

   ```   sh
   npm init vite@latest
   ```

### `npm create <initializer>`
​	使用某个初始化器创建特定模板项目。
​	示例：

   ```   sh
   npm create vite
   ```

### `npm version <update_type>`
​	更新 `package.json` 中的版本号。`update_type` 可为 `patch`, `minor`, `major`。
​	示例：

   ```   sh
   npm version minor
   ```

### `npm set-script <script-name> <command>`
​	在 `package.json` 中添加或更新一个 `scripts` 脚本。
​	示例：

   ```   sh
   npm set-script build "vite build"
   ```

### `npm explore <pkg-name> -- <command>`
​	在某个依赖包的目录中执行指定命令。
​	示例：

   ```   sh
   npm explore lodash -- npm run test
   ```

### `npm repo <pkg-name>`
​	打开某个包的 GitHub 仓库链接。
​	示例：

   ```   sh
   npm repo react
   ```

### `npm home <pkg-name>`
​	打开某个包的首页（通常是 `npm` 的包详情页）。
​	示例：

   ```   sh
   npm home vue
   ```

### `npm bugs <pkg-name>`

​	查看某个包的 Bug 追踪页面。
​	示例：

    npm bugs webpack

------

## 二、依赖管理

### `npm install|i`

​	安装 `package.json` 中声明的所有依赖。
​	示例：

   ```   sh
   npm install
   ```

### `npm install <pkg-name>`
​	安装特定依赖包，并添加到 `dependencies` 中。
​	示例：

   ```   sh
   npm install axios
   ```

### `npm install <pkg-name> --save-dev` / `npm i <pkg-name> -D`
​	安装某个依赖，并添加到 `devDependencies` 中。
​	示例：

   ```   sh
   npm install eslint --save-dev
   ```

### `npm install <pkg-name> -g`
​	全局安装某个包，以便在任意目录中都能使用该包的命令行工具。
​	示例：

   ```   sh
   npm install typescript -g
   ```

### `npm remove|uninstall|rm|r|un <pkg-name>`
​	卸载某个已安装的依赖包，并从 `dependencies` 中移除。
​	示例：

   ```   sh
   npm uninstall lodash
   ```

### `npm remove|uninstall|rm|r|un <pkg-name> -g`
​	卸载全局安装的依赖包。
​	示例：

   ```   sh
   npm uninstall -g typescript
   ```

### `npm update|up`
​	更新当前项目中的所有包到最新版本（根据 `package.json` 中的版本约束）。
​	示例：

   ```   sh
   npm update
   ```

### `npm outdated`
​	列出当前项目中哪些依赖包有新版本可用。
​	示例：

   ```   sh
   npm outdated
   ```

### `npm dedupe`
​	删除重复的依赖项，并合并到更高的节点。
​	示例：

   ```   sh
   npm dedupe
   ```

### `npm audit`

​	检查项目依赖中是否存在已知的安全漏洞，并提供修复建议。
​	示例：

```sh
npm audit
```

### `npm audit fix`

​	自动修复 `npm audit` 检查出的安全漏洞。
​	示例：

```sh
npm audit fix 
```

### `npm shrinkwrap`

​	生成 `npm-shrinkwrap.json` 文件，用于锁定依赖版本（类似 `package-lock.json`）。
​	示例：

```sh
npm shrinkwrap
```

### `npm ci`

​	使用 `package-lock.json` 中的精确版本来安装依赖（常用于 CI/CD 环境）。
​	示例：

```sh
npm ci    
```

### `npm fund`
​	检查项目中依赖的包是否需要资金支持。
​	示例：

```sh
 npm fund
```

### `npm prune`

​	移除项目中未声明的依赖（清理无用的包）。
​	示例：

```sh
npm prune
```

### `npm ls|list`

​	显示当前项目中所有已安装的包及其依赖树结构。
​	示例：

```sh
npm ls  
```

### `npm ls|list -g`

​	列出全局安装的所有包。
​	示例：

```sh
npm ls -g
```

### `npm root`

​	显示当前项目（或全局）中 `node_modules` 的路径。
​	示例：

```sh
npm root
```

### `npm link`

​	将当前包链接到全局 `node_modules` 中，以便其他项目可以直接使用。
​	示例：

```sh
npm link
```

### `npm link <pkg-name>`

​	在当前项目中使用全局 `node_modules` 中已经 `link` 过的包。
​	示例：

```sh
npm link my-local-package  
```

------

## 三、脚本与执行管理

### `npm run <script-name>`
​	执行 `package.json` 中定义的某个 `scripts` 命令。
​	示例：

   ```   sh
   npm run build
   ```

### `npm start`
​	执行 `package.json` 中定义的 `start` 脚本（通常用于启动项目）。
​	示例：

   ```   sh
   npm start
   ```

### `npm test|t`
​	执行 `package.json` 中定义的 `test` 脚本（通常用于运行测试）。
​	示例：

   ```   sh
   npm test
   ```

### `npm run-script <script-name>`
​	和 `npm run` 类似，执行 `scripts` 中指定的脚本命令。
​	示例：

   ```   sh
   npm run-script build
   ```

### `npm run-script --if-present <script-name>`
​	执行某个脚本（如果存在），不存在时不会报错。
​	示例：

   ```   sh
   npm run-script --if-present lint
   ```

### `npm exec <command>`
​	在当前项目环境中执行某个命令（等效于 `npx`）。
​	示例：

   ```   sh
   npm exec webpack --mode production
   ```

### `npm rebuild`
​	重新编译当前项目中所有的 `native` 模块。
​	示例：

   ```   sh
   npm rebuild
   ```

------

## 四、发布与管理包

### `npm publish|pu`
​	将当前项目发布到 NPM 注册表（需要有权限）。
​	示例：

   ```   sh
   npm publish
   ```

### `npm unpublish <pkg-name>`
​	将已发布的包从 NPM 注册表中移除。
​	示例：

   ```   sh
   npm unpublish my-package --force
   ```

### `npm deprecate <pkg-name> <message>`
​	为某个包发布弃用信息。
​	示例：

   ```   sh
   npm deprecate old-package "This package is no longer maintained"
   ```

### `npm pack`
​	将当前项目打包成 `.tgz` 文件。
​	示例：

   ```   sh
   npm pack
   ```

### `npm info <pkg-name>`
​	查看某个包的详细信息（版本、依赖等）。
​	示例：

   ```   sh
   npm info react
   ```

### `npm login`
​	登录到 NPM 账号。
​	示例：

   ```   sh
   npm login
   ```

### `npm logout`
​	从 NPM 账号中登出。
​	示例：

   ```   sh
   npm logout
   ```

### `npm whoami`
​	查看当前登录的 NPM 用户名。
​	示例：

   ```   sh
   npm whoami
   ```

------

## 五、缓存与配置管理

### `npm config list`
​	列出当前 NPM 的所有配置项。
​	示例：

   ```   sh
   npm config list
   ```

### `npm config get <key>`
​	获取某个配置项的值。
​	示例：

   ```   sh
   npm config get registry
   ```

### `npm config set <key> <value>`
​	设置某个配置项的值。
​	示例：

   ```   sh
   npm config set registry https://registry.npmjs.org/
   ```

### `npm config delete <key>`
​	删除某个配置项的值。
​	示例：

   ```   sh
   npm config delete registry
   ```

### `npm cache verify`
​	检查 NPM 缓存是否有效，并清理过期文件。
​	示例：

   ```   sh
   npm cache verify
   ```

### `npm cache clean --force`
​	强制清理 NPM 缓存。
​	示例：

   ```   sh
   npm cache clean --force
   ```

### `npm set <key> <value>`
​	设置某个配置项的值。
​	示例：

   ```   sh
   npm set init-author-name "John Doe"
   ```

------

## 六、调试和诊断工具

### `npm doctor`
​	诊断 NPM 环境，并检查配置是否正确。
​	示例：

   ```   sh
   npm doctor
   ```

### `npm get <key>`
​	获取某个配置项的值。
​	示例：

   ```   sh
   npm get init-author-name
   ```

### `npm explain <dependency>`
​	显示某个依赖的安装原因及来源。
​	示例：

   ```   sh
   npm explain lodash
   ```

### `npm help <command>`
​	查看某个命令的帮助信息及用法说明。
​	示例：

   ```   sh
   npm help install
   ```

### `npm search <keyword>`
​	在 NPM 注册表中搜索包。
​	示例：

   ```   sh
   npm search react
   ```

### `npm team`
​	管理 NPM 组织和团队。
​	示例：

   ```   sh
   npm team create my-org:developers
   ```

### `npm org`
​	管理 NPM 组织。
​	示例：

   ```   sh
   npm org add my-org username
   ```

### `npm profile`
​	管理 NPM 账户资料。
​	示例：

   ```   sh
   npm profile set email "example@example.com"
   ```