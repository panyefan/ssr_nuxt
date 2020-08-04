# Nuxt.js搭建的脚手架，使用ElementUI库、Vuex数据状态管理，支持服务端渲染，封装好的axios支持SSR请求和非SSR请求

## 相关命令

```bash
# 安装插件
$ yarn install

# 开发模式：启动或者热更新 http://localhost:3000
$ yarn dev // 启动开发环境
$ yarn pro // 启动生产环境

# 生产模式：构建生产包和启动生产服务
$ yarn build
$ yarn start

# 生成静态项目
$ yarn generate
```

## 添加插件
```bash
yarn add postcss-px2rem // px转rem
yarn add cross-env --dev // 设置环境变量
yarn add @nuxtjs/axios --dev
yarn add js-cookie cookieparser

# 在nuxt.config.js中添加
build: {
    vendor: ['element-ui','axios'], // 防止二次打包
    transpile: [/^element-ui/],
    postcss: [
      require("postcss-px2rem")({
        remUnit: 75 //1rem == 75px;
      })
    ],
    extractCSS: {
      allChunks: true,
      ignoreOrder: true,
    },
}

env: {
    APP_ENV: process.env.APP_ENV
},

modules: [
    "@nuxtjs/axios"
],
axios: {
    credentials: true  // 跨域是否需要校验
},
plugins: [
    {
      src: "~/plugins/element-ui",
      ssr: true
    },
    {
      src: "~/plugins/axios.js",
      ssr: true
    },
],
# plugins文件夹下面添加axios.js请求拦截器
```

## 将登录后拿到的token放到请求头里面

思路：登录接口获取到数据之后，将token保存到cookie中，而cookie是跟随每个请求的，所以在nuxtServerInit方法里将cookie里的数据赋值给store，然后在axios请求拦截器里，把store.state.token封装到请求头里。这样SSR请求和非SSR请求都可以携带有登录态的token了。



