<template>
  <div class="searchInput">
    <header>
      <router-link to="/">关闭</router-link>
      <input
        type="text"
        placeholder="搜索感兴趣的电影、影人"
        v-model="text"
        @keyup.enter="submit"
      >
      <button
        @click.stop.prevent="submit"
      >搜索</button>
    </header>
    <img
      src="../../assets/inputSearch.png"
      alt="search"
      class="search"
    >
  </div>
</template>

<script>

export default {
  name: 'searchInput',

  data() {
    return {
      text: '',
    };
  },

  methods: {
    submit() {
      this.$router.push(`/tag/${this.text}`);
    },
  },
};
</script>

<style scoped>
.searchInput {
  position: relative;
}

header {
  padding: 0.3rem 0.36rem 0.3rem 0.36rem;
  font-size: 0.32rem;
  display: flex;
  align-items: center;
  height: 1.24rem;
  border-bottom: 0.02rem solid #f3f3f3;
}

header a {
  color: #42bd56;
}

header input {
  outline: none;
  box-shadow: none;
  border: none;
  flex-grow: 1;
  background-color: #f3f3f3;
  border-radius: 0.06rem;
  color: #999;
  margin-left: 0.2rem;
  height: 0.6rem;
  line-height: 0.6rem;
  padding-left: 0.6rem;
}

.search {
  width: 0.32rem;
  height: 0.32rem;
  position: absolute;
  left: 1.35rem;
  top: 0.45rem;
}

header button {
  margin-left: 0.2rem;
  color: #494949;
  background-color: #f5f5f5;
  text-align: center;
  outline: none;
  border: none;
  border-radius: 0.1rem;
  padding: 0 0.15rem;
  height: 0.6rem;
}
</style>
