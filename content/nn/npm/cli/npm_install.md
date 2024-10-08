+++
title = "npm install"
date = 2024-10-06T15:42:53+08:00
weight = 260
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-install](https://docs.npmjs.com/cli/v10/commands/npm-install)

Install a package

​	安装一个软件包

Version 10.9.0 (Latest)

## Synopsis



```bash
npm install [<package-spec> ...]

aliases: add, i, in, ins, inst, insta, instal, isnt, isnta, isntal, isntall
```

## Description

This command installs a package and any packages that it depends on. If the package has a package-lock, or an npm shrinkwrap file, or a yarn lock file, the installation of dependencies will be driven by that, respecting the following order of precedence:

​	此命令会安装一个软件包及其所依赖的所有软件包。如果该软件包包含 `package-lock` 文件、`npm shrinkwrap` 文件或 `yarn lock` 文件，则依赖项的安装顺序将按照以下优先级进行：

- `npm-shrinkwrap.json`

- `package-lock.json`
- `yarn.lock`

See [package-lock.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json) and [`npm shrinkwrap`](https://docs.npmjs.com/cli/v10/commands/npm-shrinkwrap).

​	参见 [package-lock.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json) 和 [`npm shrinkwrap`](https://docs.npmjs.com/cli/v10/commands/npm-shrinkwrap)。

A `package` is:

​	一个 `package` 可以是：

- a) a folder containing a program described by a [`package.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json) file
- a) 包含 [package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json) 文件的文件夹

- b) a gzipped tarball containing (a)
- b) 一个包含上述内容的压缩的 tarball 文件
- c) a url that resolves to (b)
- c) 解析为上述 tarball 的 URL
- d) a `<name>@<version>` that is published on the registry (see [`registry`](https://docs.npmjs.com/cli/v10/using-npm/registry)) with (c)
- d) 在注册表中发布的 `<name>@<version>`（参见 [`registry`](https://docs.npmjs.com/cli/v10/using-npm/registry)）
- e) a `<name>@<tag>` (see [`npm dist-tag`](https://docs.npmjs.com/cli/v10/commands/npm-dist-tag)) that points to (d)
- e) 指向上述版本的 `<name>@<tag>`（参见 [`npm dist-tag`](https://docs.npmjs.com/cli/v10/commands/npm-dist-tag)）
- f) a `<name>` that has a "latest" tag satisfying (e)
- f) 有一个“latest”标签的 `<name>`，满足 (e)
- g) a `<git remote url>` that resolves to (a)
- g) 指向 (a) 的 `<git remote url>`

Even if you never publish your package, you can still get a lot of benefits of using npm if you just want to write a node program (a), and perhaps if you also want to be able to easily install it elsewhere after packing it up into a tarball (b).

​	即使你从未发布过自己的软件包，如果你只是想写一个 Node 程序 (a)，或者打包成 tarball 后希望能够轻松在其他地方安装 (b)，也可以通过使用 npm 获得很多好处。

- `npm install` (in a package directory, no arguments):

- `npm install`（在软件包目录中，无任何参数）：

  Install the dependencies to the local `node_modules` folder.

  将依赖项安装到本地的 `node_modules` 文件夹中。

  In global mode (ie, with `-g` or `--global` appended to the command), it installs the current package context (ie, the current working directory) as a global package.

  如果使用全局模式（即命令后面加上 `-g` 或 `--global`），则会将当前包上下文（即当前工作目录）安装为全局软件包。

  By default, `npm install` will install all modules listed as dependencies in [`package.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json).

  默认情况下，`npm install` 将安装 [`package.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json) 中列出的所有模块。

  With the `--production` flag (or when the `NODE_ENV` environment variable is set to `production`), npm will not install modules listed in `devDependencies`. To install all modules listed in both `dependencies` and `devDependencies` when `NODE_ENV` environment variable is set to `production`, you can use `--production=false`.

  当使用 `--production` 标志（或设置 `NODE_ENV` 环境变量为 `production`）时，npm 不会安装 `devDependencies` 中列出的模块。如果你希望在 `NODE_ENV` 环境变量设置为 `production` 时安装所有 `dependencies` 和 `devDependencies` 中列出的模块，可以使用 `--production=false`。

  > NOTE: The `--production` flag has no particular meaning when adding a dependency to a project.
  >
  > ​	注意：当将依赖项添加到项目时，`--production` 标志没有特殊含义。

- `npm install <folder>`:

  If `<folder>` sits inside the root of your project, its dependencies will be installed and may be hoisted to the top-level `node_modules` as they would for other types of dependencies. If `<folder>` sits outside the root of your project, *npm will not install the package dependencies* in the directory `<folder>`, but it will create a symlink to `<folder>`.

  如果 `<folder>` 位于项目根目录内部，其依赖项将被安装，并可能提升至顶层 `node_modules`，就像处理其他依赖项一样。如果 `<folder>` 位于项目根目录外，*npm 不会安装该目录下的软件包依赖项*，而是会创建一个指向 `<folder>` 的符号链接。

  > NOTE: If you want to install the content of a directory like a package from the registry instead of creating a link, you would need to use the `--install-links` option.
  >
  > 注意：如果你希望像从注册表中安装软件包一样安装目录内容，而不是创建链接，需要使用 `--install-links` 选项。

  Example:

  示例：

  ```bash
  npm install ../../other-package --install-links
  npm install ./sub-package
  ```

- `npm install <tarball file>`:

  Install a package that is sitting on the filesystem. Note: if you just want to link a dev directory into your npm root, you can do this more easily by using [`npm link`](https://docs.npmjs.com/cli/v10/commands/npm-link).

  安装文件系统上的一个软件包。注意：如果你只是想将开发目录链接到你的 npm 根目录，可以更轻松地使用 [`npm link`](https://docs.npmjs.com/cli/v10/commands/npm-link)。

  Tarball requirements:

  tarball 文件要求：

  - The filename *must* use `.tar`, `.tar.gz`, or `.tgz` as the extension.
  - 文件名 *必须* 使用 `.tar`、`.tar.gz` 或 `.tgz` 作为扩展名。
  - The package contents should reside in a subfolder inside the tarball (usually it is called `package/`). npm strips one directory layer when installing the package (an equivalent of `tar x --strip-components=1` is run).
  - 软件包内容应位于 tarball 的子文件夹中（通常称为 `package/`）。npm 在安装时会去除一层目录（相当于执行 `tar x --strip-components=1`）。
  - The package must contain a `package.json` file with `name` and `version` properties.
  - 软件包必须包含一个具有 `name` 和 `version` 属性的 `package.json` 文件。

  Example:

  示例：

  ```bash
  npm install ./package.tgz
  ```

- `npm install <tarball url>`:

  Fetch the tarball url, and then install it. In order to distinguish between this and other options, the argument must start with "http://" or "https://"

  获取 tarball URL，然后安装它。为了区分此选项与其他选项，参数必须以 "http://" 或 "https://" 开头。

  Example:

  示例：

  ```bash
  npm install https://github.com/indexzero/forever/tarball/v0.5.6
  ```

- `npm install [<@scope>/]<name>`:

  Do a `<name>@<tag>` install, where `<tag>` is the "tag" config. (See [`config`](https://docs.npmjs.com/cli/v10/using-npm/config#tag). The config's default value is `latest`.)

  进行 `<name>@<tag>` 安装，其中 `<tag>` 是 “tag” 配置（参见 [`config`](https://docs.npmjs.com/cli/v10/using-npm/config#tag)，该配置的默认值是 `latest`）。

  In most cases, this will install the version of the modules tagged as `latest` on the npm registry.

  在大多数情况下，这将安装 npm 注册表中标记为 `latest` 的模块版本。

  Example:

  示例：

  ```bash
  npm install sax
  ```

  `npm install` saves any specified packages into `dependencies` by default. Additionally, you can control where and how they get saved with some additional flags:

  ​	`npm install` 默认将任何指定的软件包保存到 `dependencies` 中。此外，你可以使用以下额外的标志来控制它们的保存位置及保存方式：

  - `-P, --save-prod`: Package will appear in your `dependencies`. This is the default unless `-D` or `-O` are present.
  - `-P, --save-prod`：软件包将出现在 `dependencies` 中。这是默认值，除非 `-D` 或 `-O` 存在。
  - `-D, --save-dev`: Package will appear in your `devDependencies`.
  - `-D, --save-dev`：软件包将出现在 `devDependencies` 中。
  - `--save-peer`: Package will appear in your `peerDependencies`.
  - `--save-peer`：软件包将出现在 `peerDependencies` 中。
  - `-O, --save-optional`: Package will appear in your `optionalDependencies`.
  - `-O, --save-optional`：软件包将出现在 `optionalDependencies` 中。
  - `--no-save`: Prevents saving to `dependencies`.
  - `--no-save`：防止将软件包保存到 `dependencies` 中。

  When using any of the above options to save dependencies to your package.json, there are two additional, optional flags:

  ​	当使用上述选项将依赖项保存到 `package.json` 时，还有两个额外的可选标志：

  - `-E, --save-exact`: Saved dependencies will be configured with an exact version rather than using npm's default semver range operator.
  - `-E, --save-exact`：保存的依赖项将配置为精确版本，而不是使用 npm 的默认 semver 范围运算符。
  - `-B, --save-bundle`: Saved dependencies will also be added to your `bundleDependencies` list.
  - `-B, --save-bundle`：保存的依赖项也将被添加到 `bundleDependencies` 列表中。

  Further, if you have an `npm-shrinkwrap.json` or `package-lock.json` then it will be updated as well.

  另外，如果你有 `npm-shrinkwrap.json` 或 `package-lock.json` 文件，它们也将被更新。

  `<scope>` is optional. The package will be downloaded from the registry associated with the specified scope. If no registry is associated with the given scope the default registry is assumed. See [`scope`](https://docs.npmjs.com/cli/v10/using-npm/scope).

  `<scope>` 是可选的。软件包将从与指定范围关联的注册表中下载。如果没有注册表与给定的范围关联，则假定使用默认注册表。参见 [`scope`](https://docs.npmjs.com/cli/v10/using-npm/scope)。

  Note: if you do not include the @-symbol on your scope name, npm will interpret this as a GitHub repository instead, see below. Scopes names must also be followed by a slash.

  注意：如果你未在范围名称中包含 `@` 符号，npm 会将其解释为 GitHub 仓库名称（参见下文）。范围名称后必须跟随一个斜线。

  Examples:

  示例：

  ```bash
  npm install sax
  npm install githubname/reponame
  npm install @myorg/privatepackage
  npm install node-tap --save-dev
  npm install dtrace-provider --save-optional
  npm install readable-stream --save-exact
  npm install ansi-regex --save-bundle
  ```

- `npm install <alias>@npm:<name>`:

  Install a package under a custom alias. Allows multiple versions of a same-name package side-by-side, more convenient import names for packages with otherwise long ones, and using git forks replacements or forked npm packages as replacements. Aliasing works only on your project and does not rename packages in transitive dependencies. Aliases should follow the naming conventions stated in [`validate-npm-package-name`](https://www.npmjs.com/package/validate-npm-package-name#naming-rules).

  以自定义别名安装一个软件包。允许多个同名软件包版本共存、更方便地导入长名称的软件包，以及使用 git 分支替代或 fork 的 npm 软件包替代。别名仅对你的项目有效，不会重命名传递依赖中的软件包。别名应遵循 [`validate-npm-package-name`](https://www.npmjs.com/package/validate-npm-package-name#naming-rules) 中描述的命名规范。

  Examples:

  示例：

  ```bash
  npm install my-react@npm:react
  npm install jquery2@npm:jquery@2
  npm install jquery3@npm:jquery@3
  npm install npa@npm:npm-package-arg
  ```

- `npm install [<@scope>/]<name>@<tag>`:

  Install the version of the package that is referenced by the specified tag. If the tag does not exist in the registry data for that package, then this will fail.

  安装由指定标签引用的软件包版本。如果该标签在软件包的注册表数据中不存在，则安装失败。

  Example:

  示例：

  ```bash
  npm install sax@latest
  npm install @myorg/mypackage@latest
  ```

- `npm install [<@scope>/]<name>@<version>`:

  Install the specified version of the package. This will fail if the version has not been published to the registry.

  安装指定版本的软件包。如果该版本尚未发布到注册表，则安装失败。

  Example:

  示例：

  ```bash
  npm install sax@0.1.1
  npm install @myorg/privatepackage@1.5.0
  ```

- `npm install [<@scope>/]<name>@<version range>`:

  Install a version of the package matching the specified version range. This will follow the same rules for resolving dependencies described in [`package.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json).

  安装符合指定版本范围的软件包。遵循 [`package.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json) 中描述的解析依赖项的规则。

  Note that most version ranges must be put in quotes so that your shell will treat it as a single argument.

  注意，大多数版本范围必须用引号括起来，以便 shell 将其视为单个参数。

  Example:

  示例：

  ```bash
  npm install sax@">=0.1.0 <0.2.0"
  npm install @myorg/privatepackage@"16 - 17"
  ```

- `npm install <git remote url>`:

  Installs the package from the hosted git provider, cloning it with `git`. For a full git remote url, only that URL will be attempted.

  从托管的 git 提供者安装软件包，并使用 `git` 克隆。对于完整的 git 远程 URL，只会尝试该 URL。

  ```bash
  <protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]
  ```

  `<protocol>` is one of `git`, `git+ssh`, `git+http`, `git+https`, or `git+file`.

  `<protocol>` 可以是 `git`、`git+ssh`、`git+http`、`git+https` 或 `git+file`。

  If `#<commit-ish>` is provided, it will be used to clone exactly that commit. If the commit-ish has the format `#semver:<semver>`, `<semver>` can be any valid semver range or exact version, and npm will look for any tags or refs matching that range in the remote repository, much as it would for a registry dependency. If neither `#<commit-ish>` or `#semver:<semver>` is specified, then the default branch of the repository is used.

  如果提供了 `#<commit-ish>`，则会克隆该提交。若 `#<commit-ish>` 具有 `#semver:<semver>` 格式，则 `<semver>` 可以是任何有效的 semver 范围或精确版本，npm 会在远程仓库中查找匹配该范围的任何标签或引用，就像它处理注册表依赖项一样。如果未指定 `#<commit-ish>` 或 `#semver:<semver>`，则使用仓库的默认分支。

  If the repository makes use of submodules, those submodules will be cloned as well.

  如果仓库使用了子模块，那么这些子模块也会被克隆。

  If the package being installed contains a `prepare` script, its `dependencies` and `devDependencies` will be installed, and the prepare script will be run, before the package is packaged and installed.

  如果正在安装的软件包包含 `prepare` 脚本，则在软件包打包和安装之前，首先会安装其 `dependencies` 和 `devDependencies`，然后运行 `prepare` 脚本。

  The following git environment variables are recognized by npm and will be added to the environment when running git:

  以下 git 环境变量会被 npm 识别，并在运行 git 时添加到环境中：

  - `GIT_ASKPASS`

  - `GIT_EXEC_PATH`
  - `GIT_PROXY_COMMAND`
  - `GIT_SSH`
  - `GIT_SSH_COMMAND`
  - `GIT_SSL_CAINFO`
  - `GIT_SSL_NO_VERIFY`

  See the git man page for details.

  详情请参考 git 手册。

  Examples:

  示例：

  ```bash
  npm install git+ssh://git@github.com:npm/cli.git#v1.0.27
  npm install git+ssh://git@github.com:npm/cli#pull/273
  npm install git+ssh://git@github.com:npm/cli#semver:^5.0
  npm install git+https://isaacs@github.com/npm/cli.git
  npm install git://github.com/npm/cli.git#v1.0.27
  GIT_SSH_COMMAND='ssh -i ~/.ssh/custom_ident' npm install git+ssh://git@github.com:npm/cli.git
  ```

- `npm install <githubname>/<githubrepo>[#<commit-ish>]`:

- `npm install github:<githubname>/<githubrepo>[#<commit-ish>]`:

  Install the package at `https://github.com/githubname/githubrepo` by attempting to clone it using `git`.

  通过尝试使用 `git` 克隆 `https://github.com/githubname/githubrepo` 中的软件包进行安装。

  If `#<commit-ish>` is provided, it will be used to clone exactly that commit. If the commit-ish has the format `#semver:<semver>`, `<semver>` can be any valid semver range or exact version, and npm will look for any tags or refs matching that range in the remote repository, much as it would for a registry dependency. If neither `#<commit-ish>` or `#semver:<semver>` is specified, then the default branch is used.

  如果提供了 `#<commit-ish>`，则会使用该值克隆对应的提交。如果 `commit-ish` 的格式为 `#semver:<semver>`，则 `<semver>` 可以是任何有效的 semver 范围或精确版本，npm 会在远程仓库中查找符合该范围的标签或引用，就像处理注册表依赖项一样。如果未指定 `#<commit-ish>` 或 `#semver:<semver>`，则使用默认分支。

  As with regular git dependencies, `dependencies` and `devDependencies` will be installed if the package has a `prepare` script before the package is done installing.

  与常规的 git 依赖项相同，如果软件包包含 `prepare` 脚本，则在安装完成前会安装 `dependencies` 和 `devDependencies`。

  Examples:

  示例：

  ```bash
  npm install mygithubuser/myproject
  npm install github:mygithubuser/myproject
  ```

- `npm install gist:[<githubname>/]<gistID>[#<commit-ish>|#semver:<semver>]`:

  Install the package at `https://gist.github.com/gistID` by attempting to clone it using `git`. The GitHub username associated with the gist is optional and will not be saved in `package.json`.

  通过尝试使用 `git` 克隆 `https://gist.github.com/gistID` 中的软件包进行安装。与该 gist 相关的 GitHub 用户名是可选的，并且不会保存到 `package.json` 中。

  As with regular git dependencies, `dependencies` and `devDependencies` will be installed if the package has a `prepare` script before the package is done installing.

  与常规的 git 依赖项相同，如果软件包包含 `prepare` 脚本，则在安装完成前会安装 `dependencies` 和 `devDependencies`。

  Example:

  示例：

  ```bash
  npm install gist:101a11beef
  ```

- `npm install bitbucket:<bitbucketname>/<bitbucketrepo>[#<commit-ish>]`:

  Install the package at `https://bitbucket.org/bitbucketname/bitbucketrepo` by attempting to clone it using `git`.

  通过尝试使用 `git` 克隆 `https://bitbucket.org/bitbucketname/bitbucketrepo` 中的软件包进行安装。

  If `#<commit-ish>` is provided, it will be used to clone exactly that commit. If the commit-ish has the format `#semver:<semver>`, `<semver>` can be any valid semver range or exact version, and npm will look for any tags or refs matching that range in the remote repository, much as it would for a registry dependency. If neither `#<commit-ish>` or `#semver:<semver>` is specified, then `master` is used.

  如果提供了 `#<commit-ish>`，则会使用该值克隆对应的提交。如果 `commit-ish` 的格式为 `#semver:<semver>`，则 `<semver>` 可以是任何有效的 semver 范围或精确版本，npm 会在远程仓库中查找符合该范围的标签或引用，就像处理注册表依赖项一样。如果未指定 `#<commit-ish>` 或 `#semver:<semver>`，则使用 `master` 分支。

  As with regular git dependencies, `dependencies` and `devDependencies` will be installed if the package has a `prepare` script before the package is done installing.

  与常规的 git 依赖项相同，如果软件包包含 `prepare` 脚本，则在安装完成前会安装 `dependencies` 和 `devDependencies`。

  Example:

  示例：

  ```bash
  npm install bitbucket:mybitbucketuser/myproject
  ```

- `npm install gitlab:<gitlabname>/<gitlabrepo>[#<commit-ish>]`:

  Install the package at `https://gitlab.com/gitlabname/gitlabrepo` by attempting to clone it using `git`.

  通过尝试使用 `git` 克隆 `https://gitlab.com/gitlabname/gitlabrepo` 中的软件包进行安装。

  If `#<commit-ish>` is provided, it will be used to clone exactly that commit. If the commit-ish has the format `#semver:<semver>`, `<semver>` can be any valid semver range or exact version, and npm will look for any tags or refs matching that range in the remote repository, much as it would for a registry dependency. If neither `#<commit-ish>` or `#semver:<semver>` is specified, then `master` is used.

  如果提供了 `#<commit-ish>`，则会使用该值克隆对应的提交。如果 `commit-ish` 的格式为 `#semver:<semver>`，则 `<semver>` 可以是任何有效的 semver 范围或精确版本，npm 会在远程仓库中查找符合该范围的标签或引用，就像处理注册表依赖项一样。如果未指定 `#<commit-ish>` 或 `#semver:<semver>`，则使用 `master` 分支。

  As with regular git dependencies, `dependencies` and `devDependencies` will be installed if the package has a `prepare` script before the package is done installing.

  与常规的 git 依赖项相同，如果软件包包含 `prepare` 脚本，则在安装完成前会安装 `dependencies` 和 `devDependencies`。

  Example:

  示例：

  ```bash
  npm install gitlab:mygitlabuser/myproject
  npm install gitlab:myusr/myproj#semver:^5.0
  ```

You may combine multiple arguments and even multiple types of arguments. For example:

​	你可以组合多个参数，甚至可以混合使用不同类型的参数。例如：

```bash
npm install sax@">=0.1.0 <0.2.0" bench supervisor
```

The `--tag` argument will apply to all of the specified install targets. If a tag with the given name exists, the tagged version is preferred over newer versions.

​	`--tag` 参数将应用于所有指定的安装目标。如果存在具有给定名称的标签，则该版本比更新版本更优先。

The `--dry-run` argument will report in the usual way what the install would have done without actually installing anything.

​	`--dry-run` 参数将以通常的方式报告安装的结果，但不会实际安装任何内容。

The `--package-lock-only` argument will only update the `package-lock.json`, instead of checking `node_modules` and downloading dependencies.

​	`--package-lock-only` 参数将只更新 `package-lock.json`，而不会检查 `node_modules` 或下载依赖项。

The `-f` or `--force` argument will force npm to fetch remote resources even if a local copy exists on disk.

​	`-f` 或 `--force` 参数会强制 npm 即使本地存在副本也要从远程获取资源。

```bash
npm install sax --force
```

## Configuration

See the [`config`](https://docs.npmjs.com/cli/v10/using-npm/config) help doc. Many of the configuration params have some effect on installation, since that's most of what npm does.

​	请参阅 [`config`](https://docs.npmjs.com/cli/v10/using-npm/config) 帮助文档。许多配置参数都会对安装产生影响，因为这几乎是 npm 的主要功能。

These are some of the most common options related to installation.

​	以下是一些与安装相关的常用选项。

### `save`

- Default: `true` unless when using `npm update` where it defaults to `false`
- 默认值：`true`（使用 `npm update` 时默认为 `false`）
- Type: Boolean

Save installed packages to a `package.json` file as dependencies.

​	将安装的软件包保存到 `package.json` 文件中的依赖项列表中。

When used with the `npm rm` command, removes the dependency from `package.json`.

​	在使用 `npm rm` 命令时，会将依赖项从 `package.json` 中移除。

Will also prevent writing to `package-lock.json` if set to `false`.

​	如果设置为 `false`，将不会写入 `package-lock.json`。

### `save-exact`

- Default: false
- Type: Boolean

Dependencies saved to package.json will be configured with an exact version rather than using npm's default semver range operator.

​	保存到 `package.json` 中的依赖项将配置为精确版本，而不是使用 npm 默认的 semver 范围运算符。

### `global`

- Default: false
- Type: Boolean

Operates in "global" mode, so that packages are installed into the `prefix` folder instead of the current working directory. See [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders) for more on the differences in behavior.

​	在“全局”模式下操作，因此软件包将被安装到 `prefix` 文件夹中，而不是当前工作目录。有关行为差异的更多信息，请参阅 [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)。

- packages are installed into the `{prefix}/lib/node_modules` folder, instead of the current working directory.
- 软件包将被安装到 `{prefix}/lib/node_modules` 文件夹中，而不是当前工作目录。

- bin files are linked to `{prefix}/bin`
- 可执行文件将链接到 `{prefix}/bin`。
- man pages are linked to `{prefix}/share/man`
- 手册页将链接到 `{prefix}/share/man`。

### `install-strategy`

- Default: "hoisted"
- Type: "hoisted", "nested", "shallow", or "linked"

Sets the strategy for installing packages in node_modules. hoisted (default): Install non-duplicated in top-level, and duplicated as necessary within directory structure. nested: (formerly --legacy-bundling) install in place, no hoisting. shallow (formerly --global-style) only install direct deps at top-level. linked: (experimental) install in node_modules/.store, link in place, unhoisted.

​	设置在 `node_modules` 中安装软件包的策略。`hoisted`（默认）：在顶层安装非重复项，并在目录结构中根据需要重复安装。`nested`：（以前称为 `--legacy-bundling`）安装在当前位置，不进行提升。`shallow`（以前称为 `--global-style`）仅在顶层安装直接依赖项。`linked`：（实验性）安装在 `node_modules/.store` 中，链接到相应位置，不提升。

### `legacy-bundling`

- Default: false
- Type: Boolean
- DEPRECATED: This option has been deprecated in favor of `--install-strategy=nested`
- 已废弃: 此选项已被 `--install-strategy=nested` 取代

Instead of hoisting package installs in `node_modules`, install packages in the same manner that they are depended on. This may cause very deep directory structures and duplicate package installs as there is no de-duplicating. Sets `--install-strategy=nested`.

​	与将依赖项提升（hoisting）到 `node_modules` 顶层不同，该选项会按依赖项的依赖关系顺序安装包。这可能会导致目录结构非常深，并且由于不进行去重操作，可能会导致包的重复安装。等效于设置 `--install-strategy=nested`。

### `global-style`

- Default: false
- Type: Boolean
- DEPRECATED: This option has been deprecated in favor of `--install-strategy=shallow`
- 已废弃: 此选项已被 `--install-strategy=shallow` 取代

Only install direct dependencies in the top level `node_modules`, but hoist on deeper dependencies. Sets `--install-strategy=shallow`.

​	仅在顶层 `node_modules` 中安装直接依赖项，但对子依赖项进行提升。等效于设置 `--install-strategy=shallow`。

### `omit`

- Default: 'dev' if the `NODE_ENV` environment variable is set to 'production', otherwise empty.
- 默认值: 如果环境变量 `NODE_ENV` 设置为 `production`，则默认为 `dev`，否则为空。
- Type: "dev", "optional", or "peer" (can be set multiple times)
- 类型: `"dev"`、`"optional"` 或 `"peer"`（可以多次设置）

Dependency types to omit from the installation tree on disk.

​	要从磁盘上的安装树中省略的依赖类型。

Note that these dependencies *are* still resolved and added to the `package-lock.json` or `npm-shrinkwrap.json` file. They are just not physically installed on disk.

​	注意，这些依赖项*仍然*会被解析并添加到 `package-lock.json` 或 `npm-shrinkwrap.json` 文件中，只是不在磁盘上实际安装。

If a package type appears in both the `--include` and `--omit` lists, then it will be included.

​	如果某个包类型同时出现在 `--include` 和 `--omit` 列表中，那么它将被包含在内。

If the resulting omit list includes `'dev'`, then the `NODE_ENV` environment variable will be set to `'production'` for all lifecycle scripts.

​	如果最终的省略列表中包括 `'dev'`，则所有生命周期脚本的 `NODE_ENV` 环境变量将被设置为 `'production'`。

### `include`

- Default:
- Type: "prod", "dev", "optional", or "peer" (can be set multiple times)
- 类型: `"prod"`、`"dev"`、`"optional"` 或 `"peer"`（可以多次设置）

Option that allows for defining which types of dependencies to install.

​	允许定义要安装的依赖类型的选项。

This is the inverse of `--omit=<type>`.

​	此选项与 `--omit=<type>` 相反。

Dependency types specified in `--include` will not be omitted, regardless of the order in which omit/include are specified on the command-line.

​	在命令行中指定的 `--include` 中的依赖类型不会被省略，无论省略/包含选项的顺序如何。

### `strict-peer-deps`

- Default: false
- Type: Boolean

If set to `true`, and `--legacy-peer-deps` is not set, then *any* conflicting `peerDependencies` will be treated as an install failure, even if npm could reasonably guess the appropriate resolution based on non-peer dependency relationships.

​	如果设置为 `true`，并且没有设置 `--legacy-peer-deps`，则*任何*冲突的 `peerDependencies` 都将被视为安装失败，即使 npm 能够基于非 `peer` 依赖关系合理地推测合适的解决方案。

By default, conflicting `peerDependencies` deep in the dependency graph will be resolved using the nearest non-peer dependency specification, even if doing so will result in some packages receiving a peer dependency outside the range set in their package's `peerDependencies` object.

​	默认情况下，依赖树深处冲突的 `peerDependencies` 将根据最近的非 `peer` 依赖规范进行解析，即使这样做会导致某些包接收的 `peer` 依赖超出其 `peerDependencies` 对象中设置的范围。

When such an override is performed, a warning is printed, explaining the conflict and the packages involved. If `--strict-peer-deps` is set, then this warning is treated as a failure.

​	当执行此类覆盖时，会打印警告，解释冲突及相关的包。如果设置了 `--strict-peer-deps`，则此警告将被视为失败。

### `prefer-dedupe`

- Default: false
- Type: Boolean

Prefer to deduplicate packages if possible, rather than choosing a newer version of a dependency.

​	如果可能，优先进行去重处理，而不是选择依赖项的较新版本。

### `package-lock`

- Default: true
- Type: Boolean

If set to false, then ignore `package-lock.json` files when installing. This will also prevent *writing* `package-lock.json` if `save` is true.

​	如果设置为 `false`，则在安装时忽略 `package-lock.json` 文件。这还将阻止*写入* `package-lock.json`（如果 `save` 为 `true`）。

### `package-lock-only`

- Default: false
- Type: Boolean

If set to true, the current operation will only use the `package-lock.json`, ignoring `node_modules`.

​	如果设置为 `true`，则当前操作将仅使用 `package-lock.json`，忽略 `node_modules`。

For `update` this means only the `package-lock.json` will be updated, instead of checking `node_modules` and downloading dependencies.

​	对于 `update` 命令，这意味着只会更新 `package-lock.json`，而不会检查 `node_modules` 并下载依赖项。

For `list` this means the output will be based on the tree described by the `package-lock.json`, rather than the contents of `node_modules`.

​	对于 `list` 命令，这意味着输出将基于 `package-lock.json` 描述的树结构，而不是 `node_modules` 的内容。

### `foreground-scripts`

- Default: `false` unless when using `npm pack` or `npm publish` where it defaults to `true`
- 默认值: 当使用 `npm pack` 或 `npm publish` 时为 `true`，否则为 `false`
- Type: Boolean

Run all build scripts (ie, `preinstall`, `install`, and `postinstall`) scripts for installed packages in the foreground process, sharing standard input, output, and error with the main npm process.

​	在前台进程中运行所有构建脚本（例如，`preinstall`、`install` 和 `postinstall`）并共享标准输入、输出和错误信息与主 npm 进程。

Note that this will generally make installs run slower, and be much noisier, but can be useful for debugging.

​	注意，这通常会使安装运行得更慢，并且输出信息更冗长，但对于调试非常有用。

### `ignore-scripts`

- Default: false
- Type: Boolean

If true, npm does not run scripts specified in package.json files.

​	如果设置为 `true`，则 npm 不会运行 `package.json` 文件中指定的脚本。

Note that commands explicitly intended to run a particular script, such as `npm start`, `npm stop`, `npm restart`, `npm test`, and `npm run-script` will still run their intended script if `ignore-scripts` is set, but they will *not* run any pre- or post-scripts.

​	注意，明确用于运行特定脚本的命令（如 `npm start`、`npm stop`、`npm restart`、`npm test` 和 `npm run-script`）在 `ignore-scripts` 设置时仍会运行其指定脚本，但它们不会运行任何前置或后置脚本。

### `audit`

- Default: true
- Type: Boolean

When "true" submit audit reports alongside the current npm command to the default registry and all registries configured for scopes. See the documentation for [`npm audit`](https://docs.npmjs.com/cli/v10/commands/npm-audit) for details on what is submitted.

​	当设置为 `true` 时，会将审计报告与当前 npm 命令一起提交到默认注册表和为作用域配置的所有注册表中。有关提交内容的详细信息，请参阅 [`npm audit`](https://docs.npmjs.com/cli/v10/commands/npm-audit) 文档。

### `bin-links`

- Default: true
- Type: Boolean

Tells npm to create symlinks (or `.cmd` shims on Windows) for package executables.

​	告知 npm 是否为包可执行文件创建符号链接（或在 Windows 上创建 `.cmd` 文件）。

Set to false to have it not do this. This can be used to work around the fact that some file systems don't support symlinks, even on ostensibly Unix systems.

​	设置为 `false` 时，不会执行此操作。可以用来解决某些文件系统即使在 Unix 系统上也不支持符号链接的问题。

### `fund`

- Default: true
- Type: Boolean

When "true" displays the message at the end of each `npm install` acknowledging the number of dependencies looking for funding. See [`npm fund`](https://docs.npmjs.com/cli/v10/commands/npm-fund) for details.

​	当设置为 `true` 时，在每个 `npm install` 结束时显示消息，指明正在寻找资金支持的依赖项数量。有关详细信息，请参阅 [`npm fund`](https://docs.npmjs.com/cli/v10/commands/npm-fund) 。

### `dry-run`

- Default: false
- Type: Boolean

Indicates that you don't want npm to make any changes and that it should only report what it would have done. This can be passed into any of the commands that modify your local installation, eg, `install`, `update`, `dedupe`, `uninstall`, as well as `pack` and `publish`.

​	表示您不希望 npm 进行任何更改，而只报告它将做什么。此选项可以传递给任何修改本地安装的命令，例如 `install`、`update`、`dedupe`、`uninstall` 以及 `pack` 和 `publish`。

Note: This is NOT honored by other network related commands, eg `dist-tags`, `owner`, etc.

​	注意：此选项**不适用于**其他网络相关的命令，例如 `dist-tags`、`owner` 等。

### `cpu`

- Default: null
- Type: null or String

Override CPU architecture of native modules to install. Acceptable values are same as `cpu` field of package.json, which comes from `process.arch`.

​	覆盖要安装的原生模块的 CPU 架构。可接受的值与 `package.json` 中的 `cpu` 字段相同，该字段取自 `process.arch`。

### `os`

- Default: null
- Type: null or String

Override OS of native modules to install. Acceptable values are same as `os` field of package.json, which comes from `process.platform`.

​	覆盖要安装的原生模块的操作系统。可接受的值与 `package.json` 中的 `os` 字段相同，该字段取自 `process.platform`。

### `libc`

- Default: null
- Type: null or String

Override libc of native modules to install. Acceptable values are same as `libc` field of package.json

​	覆盖要安装的原生模块的 libc。可接受的值与 `package.json` 中的 `libc` 字段相同。

### `workspace`

- Default:
- Type: String (can be set multiple times)

Enable running a command in the context of the configured workspaces of the current project while filtering by running only the workspaces defined by this configuration option.

​	启用在当前项目的配置工作区环境中运行命令，并仅运行由该配置选项定义的工作区。

Valid values for the `workspace` config are either:

​	`workspace` 配置的有效值包括：

- Workspace names 工作区名称

- Path to a workspace directory 工作区目录的路径
- Path to a parent workspace directory (will result in selecting all workspaces within that folder) 父工作区目录的路径（将选择该文件夹中的所有工作区）

When set for the `npm init` command, this may be set to the folder of a workspace which does not yet exist, to create the folder and set it up as a brand new workspace within the project.

​	在 `npm init` 命令中设置时，可以将其设置为尚未存在的工作区文件夹，以创建该文件夹并将其设置为项目中的全新工作区。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `workspaces`

- Default: null
- Type: null or Boolean

Set to true to run the command in the context of **all** configured workspaces.

​	设置为 `true` 时，在**所有**配置的工作区环境中运行命令。

Explicitly setting this to false will cause commands like `install` to ignore workspaces altogether. When not set explicitly:

​	显式将其设置为 `false` 会导致像 `install` 这样的命令完全忽略工作区。如果没有显式设置：

- Commands that operate on the `node_modules` tree (install, update, etc.) will link workspaces into the `node_modules` folder. 
- 处理 `node_modules` 树（如 `install`、`update` 等）的命令将链接工作区到 `node_modules` 文件夹。
- Commands that do other things (test, exec, publish, etc.) will operate on the root project, *unless* one or more workspaces are specified in the `workspace` config.
- 执行其他操作（如 `test`、`exec`、`publish` 等）的命令将在根项目中运行，*除非* 在 `workspace` 配置中指定了一个或多个工作区。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `include-workspace-root`

- Default: false
- Type: Boolean

Include the workspace root when workspaces are enabled for a command.

​	启用工作区命令时，包含工作区根项目。

When false, specifying individual workspaces via the `workspace` config, or all workspaces via the `workspaces` flag, will cause npm to operate only on the specified workspaces, and not on the root project.

​	设置为 `false` 时，通过 `workspace` 配置显式指定的单个工作区或通过 `workspaces` 标志启用的所有工作区将仅操作在指定工作区上，而不会操作根项目。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `install-links`

- Default: false
- Type: Boolean

When set file: protocol dependencies will be packed and installed as regular dependencies instead of creating a symlink. This option has no effect on workspaces.

​	如果设置，当使用 `file:` 协议的依赖项时，将依赖项打包并作为常规依赖项安装，而不是创建符号链接。此选项对工作区无效。

## 算法 Algorithm

Given a `package{dep}` structure: `A{B,C}, B{C}, C{D}`, the npm install algorithm produces:

​	给定 `package{dep}` 结构：`A{B,C}, B{C}, C{D}`，npm 安装算法生成：

```bash
A
+-- B
+-- C
+-- D
```

That is, the dependency from B to C is satisfied by the fact that A already caused C to be installed at a higher level. D is still installed at the top level because nothing conflicts with it.

​	即，B 到 C 的依赖关系被 A 在更高层次安装 C 所满足。D 仍然安装在顶层，因为没有与它冲突的项。

For `A{B,C}, B{C,D@1}, C{D@2}`, this algorithm produces:

​	对于 `A{B,C}, B{C,D@1}, C{D@2}`，该算法生成：

```bash
A
+-- B
+-- C
   `-- D@2
+-- D@1
```

Because B's D@1 will be installed in the top-level, C now has to install D@2 privately for itself. This algorithm is deterministic, but different trees may be produced if two dependencies are requested for installation in a different order.

​	由于 B 的 D@1 会安装在顶层，C 现在必须为自己私下安装 D@2。该算法是确定性的，但如果两个依赖项以不同的顺序请求安装，则可能会生成不同的树。

See [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders) for a more detailed description of the specific folder structures that npm creates.

​	有关 npm 创建的特定文件夹结构的详细描述，请参阅 [文件夹结构](https://docs.npmjs.com/cli/v10/configuring-npm/folders)。

## See Also

- [npm folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)
- [npm update](https://docs.npmjs.com/cli/v10/commands/npm-update)
- [npm audit](https://docs.npmjs.com/cli/v10/commands/npm-audit)
- [npm fund](https://docs.npmjs.com/cli/v10/commands/npm-fund)
- [npm link](https://docs.npmjs.com/cli/v10/commands/npm-link)
- [npm rebuild](https://docs.npmjs.com/cli/v10/commands/npm-rebuild)
- [npm scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)
- [npm registry](https://docs.npmjs.com/cli/v10/using-npm/registry)
- [npm dist-tag](https://docs.npmjs.com/cli/v10/commands/npm-dist-tag)
- [npm uninstall](https://docs.npmjs.com/cli/v10/commands/npm-uninstall)
- [npm shrinkwrap](https://docs.npmjs.com/cli/v10/commands/npm-shrinkwrap)
- [package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces)