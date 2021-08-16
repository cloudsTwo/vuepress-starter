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
      // 字符串，页面文件路径
      '/README.md',
      '/life/life01.md',
    ],

    sidebar: [
      // SidebarItem
      {
        text: 'Learn',
        link: '/learn/',
        children: [
          // SidebarItem
          {
            text: '标题',
            link: '/learn/css.md',
          },
          // 字符串 - 页面文件路径
          '/learn/html.md',
          '/learn/javascript.md',
        ],
      },
      // 字符串 - 页面文件路径
      '/life/life01.md',
      '/life/life02.md',
      '/life/life03.md',
    ],

    // 侧边栏对象
    // 不同子路径下的页面会使用不同的侧边栏
    // sidebar: {
    //   '/learn/': [
    //     {
    //       text: 'Learn',
    //       children: ['/learn/html.md', '/learn/css.md', '/learn/javascript.md'], // 子路径，默认使用页面标题命名
    //     },
    //   ],
    //   '/life/': [
    //     {
    //       text: 'Life',
    //       children: ['/life/life01.md', '/life/life02.md', '/life/life03.md'],
    //     },
    //   ],
    // },
  },
})
