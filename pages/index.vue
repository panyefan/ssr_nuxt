<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        nuxt_project
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          {{ipcitydata}}
        </a>
        <el-button type="primary" @click="login()">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      ipcitydata: "1234",
      res1: {},
      res2: {},
    }
  },

  // SSR
  async asyncData ({ store, params, $axios }) {
    let[res1,res2] = await Promise.all([
        $axios.get('service-house/house/isDownOrCombination/6476929186249310211').then((res) => {
          return res
        }),
        $axios.get('service-house/house/dynamic/listIndex/6476929186249310211').then((res) => {
          return res
        }),
    ]);

    return {
      ipcitydata: res1.data.data,
      res1: res1.data,
      res2: res2.data,
    };
  },

  mounted() {
      this.$nextTick(function() {
          this.initData();
      });
  },

  methods: {
        initData: function() {
          // 非SSR
          this.$axios.get('service-house/house/isDownOrCombination/6476929186249310211').then((res) => {
            console.log("初始化。。。");
            console.log(res.data);
          });
        },
        // 模拟登录
        login: function() {
          this.$axios.get('service-house/house/isDownOrCombination/6476929186249310211').then((res) => {
            console.log("登录");
            // 将token保存到cookie中，而cookie是跟随每个请求的，所以在nuxtServerInit方法里将cookie复制到store
            Cookies.set('token', res.data.data);
          });
        },
    }

}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
