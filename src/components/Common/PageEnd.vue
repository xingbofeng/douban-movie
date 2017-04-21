<template>
  <footer>
    <router-link to="/">
      <div class="douban-footer">
        <img src="../../assets/doubanLogo.png" alt="豆瓣logo">
        <div class="info-content">
          <strong>豆瓣</strong>
          <div>我们的精神部落</div>
        </div>
      </div>
    </router-link>
    <a class="goGitHub" href="https://github.com/xingbofeng/douban-movie">
      去GitHub查看本项目源码
    </a>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0 1rem 0;
}

.douban-footer {
  display: flex;
  align-items: center;
}

.goGitHub {
  color: #42bd56;
  text-align: center;
  font-size: 0.3rem;
  margin-top: 0.3rem;
  font-weight: bold;
  display: block;
}

.info-content strong {
  font-size: 0.48rem;
  font-weight: normal;
  line-height: 0.56rem;
}

.info-content {
  display: inline-block;
  white-space: pre;
  font-size: 0.28rem;
  line-height: 0.4rem;
  color: #111;
}

img {
  width: 0.96rem;
  height: 0.96rem;
  margin-right: 0.24rem;
}
</style>
