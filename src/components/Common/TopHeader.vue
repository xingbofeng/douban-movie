<template>
  <header>
    <router-link to="/">
      <h1>豆瓣</h1>
    </router-link>
    <nav>
      <router-link to="/">
        <span style="color: #2384E8;">电影</span>
      </router-link>
      <router-link to="/">
        <span style="color: #9F7860;">图书</span>
      </router-link>
      <router-link to="/">
        <span style="color: #E4A813;">广播</span>
      </router-link>
      <router-link to="/">
        <span style="color: #2AB8CC;">小组</span>
      </router-link>
      <router-link to="/search">
        <img src="./../../assets/search.png" alt="">
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'TopHeader',
  data() {
    return {
      msg: 'topHeader',
    };
  },
};
</script>

<style scoped>
header {
  padding: 0 0.36rem;
  display: grid;
  grid-template-columns: 2.4fr 4.4fr;
  align-items: center;
  font-weight: bold;
  border-bottom: 0.02rem solid #f3f3f3;
  position: fixed;
  z-index: 10000;
  top: 0;
  background-color: #fff;
  width: 7.5rem;
  margin: 0 auto;
}

nav {
  display: flex;
  justify-content: space-between;
}

h1 {
  color: #00b600;
}

img {
  width: 0.49rem;
  height: 0.365rem;
}

span {
  font-size: 0.3rem;
  line-height: 0.3rem;
}

</style>
