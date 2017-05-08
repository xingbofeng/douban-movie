<template>
  <div class="commentItem">
    <div class="desc">
      <router-link
        :to="`/people/${comment.author.id}`"
      >
        <img
          :src="comment.author.avatar"
          :alt="comment.author.name"
        />
      </router-link>
      <div class="authorDetail">
        <strong>{{ comment.author.name }}</strong>
        <star
          :average="average"
          :length="0.26"
        />
        <p class="date">{{ comment.created_at }}</p>
      </div>
      <p class="userComment">{{ comment.content }}</p>
      <div
        class="icLike"
        @click.stop.prevent="tap"
      >
        <img
          :src="icType"
          alt="点赞按钮"
        />
        <span
          :style="`color: ${likeCountColor};`"
        >{{ count }}</span>
      </div>
    </div>
    <Alert
      type="success"
      show-icon
      v-show="isAlertShow"
    >
      您已经投过票了
    </Alert>
  </div>
</template>

<script>
import Alert from 'iview/src/components/alert';
import Star from './Star';
import icLikeGray from './../../assets/ic_like_gray.svg';
import icLikeGreen from './../../assets/ic_like_green.svg';

export default {
  name: 'CommentItem',

  props: ['comment'],

  components: {
    Star,
    Alert,
  },

  data() {
    return {
      icType: icLikeGray, // 点赞按钮的样式
      likeCountColor: '#ccc', // 点赞数量文字的样式
      count: this.comment.useful_count, // 有多少人点赞
      isAlertShow: false, // 是否已经投过票的提示
    };
  },

  computed: {
    average() {
      const { value, max } = this.comment.rating;
      return (value / max * 10); // eslint-disable-line
    },
  },

  created() {
    if (!window.localStorage.doubanMovieTap) {
      // 防止没有localStorage，不然拿不到[this.comment.id]这个值！
      window.localStorage.doubanMovieTap = '{}';
    }
    const tap = JSON.parse(window.localStorage.doubanMovieTap)[this.comment.id];
    if (tap) {
      this.icType = icLikeGreen;
      this.likeCountColor = '#42bd56';
      this.count = this.count + 1;
    }
  },

  methods: {
    tap() {
      // 由于cookie认证的原因，这里无法真正实现点赞POST请求，只能做一个效果模拟代替
      // 拿到localStorage作判断
      const tap = JSON.parse(window.localStorage.doubanMovieTap)[this.comment.id];
      if (tap) {
        // 如果投过票了，则显示提示框，1.5秒之后消失
        this.isAlertShow = true;
        setTimeout(() => {
          this.isAlertShow = false;
        }, 1500);
        return;
      }
      this.icType = icLikeGreen;
      this.likeCountColor = '#42bd56';
      this.count = this.count + 1;
      const newObj = Object.assign({}, JSON.parse(window.localStorage.doubanMovieTap), {
        [`${this.comment.id}`]: true,
      });
      window.localStorage.doubanMovieTap = JSON.stringify(newObj);
    },
  },
};
</script>

<style scoped>
.commentItem {
  width: 7.14rem;
  margin: 0.3rem auto;
}

img {
  width: 0.72rem;
  height: 0.72rem;
  border-radius: 50%;
  margin-right: 0.2rem;
}

.authorDetail {
  display: inline-block;
}

strong {
  font-size: 0.3rem;
  color: #494949;
  margin-right: 0.12rem;
  display: inline-block;
}

.date {
  margin-top: 0.12rem;
  font-size: 0.24rem;
  color: #aaa;
}

.userComment {
  padding-left: 0.8rem;
  margin-top: 0.22rem;
  line-height: 0.44rem;
  font-size: 0.3rem;
  word-wrap: break-word;
  color: #494949;
}

.icLike {
  padding-left: 0.8rem;
  display: flex;
  align-items: center;
  margin-top: 0.2rem;
}

.icLike img {
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 0.12rem;
}

.icLike span {
  font-size: 0.28rem;
  font-weight: bold;
}

.ivu-alert {
  position: fixed;
  top: 0.74rem;
  left: 50%;
  margin-left: -1.72rem;
}
</style>
