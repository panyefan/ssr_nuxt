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
yarn add cross-env --dev // 设置环境变量
yarn add postcss-px2rem // px转rem
yarn add less less-loader --dev
yarn add @nuxtjs/axios --dev
yarn add js-cookie cookieparser

# 在nuxt.config.js中添加
# 1、
env: {
    APP_ENV: process.env.APP_ENV
},

# 2、
build: {
    vendor: ['element-ui','axios'], // 防止二次打包
    transpile: [/^element-ui/],
    postcss: [
      require("postcss-px2rem")({
        remUnit: 75 // 1rem == 75px;比如设计图宽度是750px，值就设置为75
      })
    ],
    extractCSS: {
      allChunks: true,
      ignoreOrder: true,
    },
}
// 使用Flexible实现手淘H5页面的终端适配，https://github.com/amfe/article/issues/17
script: [
    { src: "/flexible.js", type: "text/javascript", charset: "utf-8" }
]

# 3、
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
```

## 将登录后拿到的token放到请求头里面

思路：登录接口获取到数据之后，将token保存到cookie中，而cookie是跟随每个请求的，所以在nuxtServerInit方法里将cookie里的数据赋值给store，然后在axios请求拦截器里，把store.state.token封装到请求头里。这样SSR请求和非SSR请求都可以携带有登录态的token了。
```bash
# nuxtServerInit Nuxt提供的方法，在页面刷新的时候，在到达页面之前。给你去处理state数据方法。
# 登录接口，已经把登录的token存放在Cookie里面，然后在nuxtServerInit 方法里面去获取Cookie里面的数据赋值到state
nuxtServerInit({ commit }, { req }) {
    let token = '';
    if (req.headers.cookie) {
        const parsed = cookieparser.parse(req.headers.cookie);
        try {
            token = parsed.token;
        } catch (err) {
            // console.log("找不到有效的Cookie");
        }
    }
    // 将保存在cookie的token保存到store
    commit('setToken', token);
}
```
![image](https://github.com/panyefan/ssr_nuxt/blob/master/static/demo01.jpg)

## 服务端渲染
```bash
# 服务端渲染的数据，都需要放置asyncData这个方法里执行
async asyncData ({ store, params, $axios }) {
    let[res1,res2] = await Promise.all([
        $axios.get('service-house/graphics/getHouseId/6476930177287847939').then((res) => {
          return res
        }),
        $axios.get('service-house/house/dynamic/listIndex/6476929186249310211').then((res) => {
          return res
        }),
    ]);

    return {
      imgTextContent: res1.data.data.content,
      dynamicData: res2.data,
    };
},
```
![image](https://github.com/panyefan/ssr_nuxt/blob/master/static/demo02.jpg)