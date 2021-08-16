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
