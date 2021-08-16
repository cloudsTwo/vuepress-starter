# VuePress

VuePress 除了部署方式使用的 1.x 版本的方法外，其余皆为 2.0 版本。

**VuePress 是一个以 Markdown 为中心的静态网站生成器，一个 VuePress 站点本质上是一个由 Vue 在和 Vue Router 驱动的单页面应用 (SPA)。路由会根据你的 Markdown 文件的相对路径来自动生成。每个 Markdown 文件都通过 markdown-it 编译为 HTML ，然后将其作为 Vue 组件的模板。**

## 一、 VuePress 搭建与配置

1. **创建并进入一个新目录**

   ```bash
   mkdir vuepress-starter && cd vuepress-starter
   ```

2. **进行初始化**

   ```bash
   npm init
   ```

3. **将 VuePress 安装为本地依赖**

   ```bash
   npm install -D vuepress@next
   ```

4. **创建 docs 目录，并在`docs`目录下创建`README.md`文档**（默认为站点首页）

   配置内容如下所示：

   ```yaml
   ---
   home: true
   heroText: 啦啦啦
   tagline: 今天是个好天气
   actions:
     - text: 快速上手
       link: /learn/
       type: primary

   features:
     - title: 简洁至上a
       details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
     - title: Vue驱动b
       details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
     - title: 高性能c
       details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
   footer: MIT Licensed | Copyright © 2018-present Evan You
   ---
   ```

   **更多关于首页的配置请参考**：[VuePress 首页配置项](https://v2.vuepress.vuejs.org/zh/reference/default-theme/frontmatter.html#首页)

5. **在 `package.json` 中添加一些 scripts**

   ```json
   {
     "scripts": {
       "docs:dev": "vuepress dev docs",
       "docs:build": "vuepress build docs"
     }
   }
   ```

6. **在本地启动服务器**

   ```bash
   npm run docs:dev
   ```

7. **在`docs`文件夹下创建目录如下**

   [![WnaRYV.png](https://camo.githubusercontent.com/ce526c29ed3881dc5b201abe431badbbb442906501fe6d6a6d011d7b694daca6/68747470733a2f2f7a332e617831782e636f6d2f323032312f30372f31352f576e615259562e706e67)](https://camo.githubusercontent.com/ce526c29ed3881dc5b201abe431badbbb442906501fe6d6a6d011d7b694daca6/68747470733a2f2f7a332e617831782e636f6d2f323032312f30372f31352f576e615259562e706e67)

8. **在`.vuepress`目录下的`config.ts/config.js`文件中进行 VuePress 的配置**

   ```typescript
   import { defineUserConfig } from 'vuepress'
   import type { DefaultThemeOptions } from 'vuepress'

   export default defineUserConfig<DefaultThemeOptions>({
     lang: 'zh-CN', // 站点语言
     title: 'Hello World ！', // 站点标题
     description: '这是我的第一个 VuePress 站点', // 站点描述
     base: '/', // 部署站点的基础路径

     // 配置当前使用的主题，当前为默认主题
     themeConfig: {
       logo: 'https://vuejs.org/images/logo.png', // Logo图片的Url，图片将会显示在导航栏的左端

       // 导航栏配置
       navbar: [
         // NavbarItem
         {
           text: 'Learn',
           link: '/learn/', // 不指定md文件，默认指向目录下的README.md
         },
         // NavbarGroup
         {
           text: 'Life',
           children: ['/life/life01.md', '/life/life02.md', '/life/life03.md'],
         },
         // 首页，页面文件路径
         '/README.md',
       ],

       // 侧边栏对象
       // 不同子路径下的页面会使用不同的侧边栏
       sidebar: {
         '/learn/': [
           {
             text: 'Learn',
             children: [
               '/learn/html.md',
               '/learn/css.md',
               '/learn/javascript.md',
             ], // 子路径，默认使用页面标题命名
           },
         ],
         '/life/': [
           {
             text: 'Life',
             children: [
               '/life/life01.md',
               '/life/life02.md',
               '/life/life03.md',
             ],
           },
         ],
       },
     },
   })
   ```

   **更多关于主题的配置请参考：**[VuePress 默认主题配置](https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html)

9. **启动服务器**

---

## 二、 VuePress 部署

1. **在 github 中创建名为`<USERNAME>.github.io`的远程仓库**

   `USERNAME`表示自己的 github 用户名，如下图所示：

   [![Wna6wn.png](https://camo.githubusercontent.com/ff7bd1a339b5a542d79441dd53c2cc95fab23c1cff4127650195db38e9850bf6/68747470733a2f2f7a332e617831782e636f6d2f323032312f30372f31352f576e6136776e2e706e67)](https://camo.githubusercontent.com/ff7bd1a339b5a542d79441dd53c2cc95fab23c1cff4127650195db38e9850bf6/68747470733a2f2f7a332e617831782e636f6d2f323032312f30372f31352f576e6136776e2e706e67)

2. **在 `docs/.vuepress/config.ts` 中设置正确的 `base`**

   如果打算发布到 `https://<USERNAME>.github.io/`，则可以省略这一步，因为 `base` 默认即是 `"/"`。

   如果打算发布到 `https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 `base` 设置为 `"/<REPO>/"`。

3. **在项目最外层目录下创建`deploy.sh` 文件**

   如下图所示（将`USERNAME`修改为自己的 github 仓库用户名）:

   ```bash
   #!/usr/bin/env sh

   # 确保脚本抛出遇到的错误
   set -e

   # 生成静态文件
   npm run docs:build

   # 进入生成的文件夹
   cd docs/.vuepress/dist

   # 如果是发布到自定义域名
   # echo 'www.example.com' > CNAME

   git init
   git checkout -b main
   git add -A
   git commit -m 'deploy'

   # 如果发布到 https://<USERNAME>.github.io
   git push -f https://github.com/cloudsTwo/cloudsTwo.github.io.git main

   # 如果发布到 https://<USERNAME>.github.io/<REPO>
   # git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

   cd -
   ```

4. **运行`deploy.sh`文件**

   上传到 git 仓库成功后打开链接 `https://<USERNAME>.github.io`即可看见编写的 markdown 文档。

5. **如果`deploy.sh`文件运行不成功**

   使用`npm run docs:build`命令打包后进入`.vuepress/dist`文件夹，将文件夹下的内容推送到 git 远程仓库地址`https://github.com/<USERNAME>/<USERNAME>.github.io.git master`，稍等几分钟后打开对应网站即可看见更新，如下图所示：[![WK3CFO.png](https://camo.githubusercontent.com/8ece03f70a5226b3bbdbe1e54fa6deeebc25923427e123c22b45b186ca81e3d6/68747470733a2f2f7a332e617831782e636f6d2f323032312f30372f31362f574b3343464f2e706e67)](https://camo.githubusercontent.com/8ece03f70a5226b3bbdbe1e54fa6deeebc25923427e123c22b45b186ca81e3d6/68747470733a2f2f7a332e617831782e636f6d2f323032312f30372f31362f574b3343464f2e706e67)

   [![Wna4lF.png](https://camo.githubusercontent.com/bb0286f897b4aef9ea1addbd1c9ca368ce069563d36ada188510fbd3f9f89d6e/68747470733a2f2f7a332e617831782e636f6d2f323032312f30372f31352f576e61346c462e706e67)](https://camo.githubusercontent.com/bb0286f897b4aef9ea1addbd1c9ca368ce069563d36ada188510fbd3f9f89d6e/68747470733a2f2f7a332e617831782e636f6d2f323032312f30372f31352f576e61346c462e706e67)

   **关于更多 VuePress 部署方式请参考：**

   [VuePress1.x 部署](https://v1.vuepress.vuejs.org/zh/guide/deploy.html)

   [VuePress2.0 部署](https://v2.vuepress.vuejs.org/zh/guide/deployment.html#github-pages)

---

## 三、在 VuePress 中展示 Vue 组件

1. **在`.vuepress`下创建 components 文件夹**

   在文件夹中编写组件，目录结构如下图所示：

   [![WK2NtS.png](https://camo.githubusercontent.com/d76657540f957a42044b7c8c261d0c9e05727cc675f9c7a0ce24c9713788685d/68747470733a2f2f7a332e617831782e636f6d2f323032312f30372f31362f574b324e74532e706e67)](https://camo.githubusercontent.com/d76657540f957a42044b7c8c261d0c9e05727cc675f9c7a0ce24c9713788685d/68747470733a2f2f7a332e617831782e636f6d2f323032312f30372f31362f574b324e74532e706e67)

2. **在`.vuepress`目录下创建`clientAppEnhance.ts`文件**

   用于组件全局注册，代码如下图所示：

   ```typescript
   import { defineClientAppEnhance } from '@vuepress/client'

   // 批量导入组件并进行注册
   // 读取当前文件夹下components文件夹下.vue文件
   const requireComponents = require.context('./components/', false, /\.vue$/)

   const componentsObj = {}
   requireComponents.keys().forEach((filePath) => {
     const componentName = filePath.split('/')[1].replace(/\.vue$/, '')
     const componentConfig = requireComponents(filePath)
     componentsObj[componentName] = componentConfig.default || componentConfig
   })

   export default defineClientAppEnhance(({ app, router, siteData }) => {
     for (let key in componentsObj) {
       app.component(componentsObj[key].name, componentsObj[key])
     }
   })
   ```

3. **在 md 文件中直接引用组件**

   ```vue
   <Comp1 />
   ```
