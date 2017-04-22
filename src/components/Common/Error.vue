<template>
  <div class="error">
    <top-header />
    <img src="../../assets/404.png" alt="404">
    <div class="prompt">
      <h1>{{ netStatus }}</h1>
      <router-link to="/">
        <h2>返回项目首页</h2>
      </router-link>
      <a href="https://github.com/xingbofeng/douban-movie">
        <h2>向本项目提出一个issus / pr</h2>
      </a>
    </div>
  </div>
</template>

<script>
import TopHeader from './TopHeader';

export default {
  name: 'Error',

  props: ['netStatus'],

  components: {
    TopHeader,
  },
};
</script>

<style scoped>
.error {
  margin: 3.06rem 0.36rem 0 0.36rem;
}

img {
  width: 4rem;
  height: 1.42rem;
}

.prompt h1 {
  text-align: center;
  color: #999;
  font-size: 0.4rem;
  margin-bottom: 0.24rem;
}

.prompt h2 {
  color: #42bd56 !important;
  font-size: 0.36rem;
  text-align: center;
  margin-bottom: 0.24rem;
}
</style>
