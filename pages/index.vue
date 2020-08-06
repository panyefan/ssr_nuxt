<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">Nuxt服务端渲染</h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >Documentation</a>
        <span class="button--green">{{testInfo}}</span>
        <el-button type="primary" @click="login()">模拟登录</el-button>
      </div>
      <div class="htmlstyle" v-html="imgTextContent"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      imgTextContent: "",
      dynamicData: {},
    };
  },
  computed: {
    ...mapState("test", ["testInfo"]),
  },

  // SSR
  async asyncData({ store, params, $axios }) {
    console.log(store.state);
    let [res1, res2] = await Promise.all([
      $axios
        .get("service-house/graphics/getHouseId/6476930177287847939")
        .then((res) => {
          return res;
        }),
      $axios
        .get("service-house/house/dynamic/listIndex/6476929186249310211")
        .then((res) => {
          return res;
        }),
    ]);

    return {
      imgTextContent: res1.data.data.content,
      dynamicData: res2.data,
    };
  },

  mounted() {
    this.$nextTick(function () {
      console.log(this.testInfo);
      this.initData();
    });
  },

  methods: {
    ...mapMutations({
      UPDATE_TESTINFO: "test/UPDATE_TESTINFO",
    }),
    initData: function () {
      // 非SSR
      this.$axios
        .get("service-house/house/isDownOrCombination/6476929186249310211")
        .then((res) => {
          console.log("初始化。。。");
          console.log(res.data);
          this.UPDATE_TESTINFO("修改测试store state");
        });
    },
    // 模拟登录
    login: function () {
      this.$axios
        .get("service-house/house/isDownOrCombination/6476929186249310211")
        .then((res) => {
          console.log("登录");
          // 将token保存到cookie中，而cookie是跟随每个请求的，所以在nuxtServerInit方法里将cookie复制到store
          Cookies.set("token", res.data.data);
        });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.htmlstyle {
  padding: 10px;
  p {
    font-size: 30px;
    margin: 30px 0;
    line-height: 1.5;
  }
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
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
