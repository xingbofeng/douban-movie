<template>
  <Spin fix>
    <img src="../../assets/doubanLogo.png" alt="豆瓣logo" class="logo">
    <icon type="load-c" size=120 class="spinIconLoad"></icon>
    <h1 class="prompt">豆瓣：我们的精神部落</h1>
  </Spin>
</template>

<script>
import Spin from 'iview/src/components/spin';

export default {
  name: 'Loading',

  components: {
    Spin,
  },
};

</script>

<style scoped>
.spinIconLoad {
  animation: aniSpin 1s linear infinite;
}

@keyframes aniSpin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.ivu-icon, .prompt {
  color: #00b600;
}

.prompt {
  font-size: 0.4rem;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}

.logo {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  margin-top: -25px;
  margin-left: -25px;
}

</style>
