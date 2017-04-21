<template>
  <router-link :to="`/moviedetail/${infos.id}`">
    <div class="tagInfosItem">
      <main>
        <h3>{{ title }}</h3>
        <div class="average">
          <star
            :average="infos.rating.average"
            :length="0.24"
          />
          <span>
            {{ infos.rating.average ? infos.rating.average.toFixed(1) : '暂无评分' }}
          </span>
          <p>{{ detail }}</p>
        </div>
      </main>
      <aside>
        <img v-lazy="infos.images.large" alt="电影图片">
      </aside>
    </div>
  </router-link>
</template>

<script>
import Star from '../Common/Star';

export default {
  name: 'TagInfosItem',

  props: ['infos'],

  components: {
    Star,
  },

  computed: {
    title() {
      const { title, original_title } = this.infos;
      if (title === original_title) { // eslint-disable-line
        return title;
      }
      return `${title} ${original_title}`; // eslint-disable-line
    },

    detail() {
      const { directors, year, genres, casts } = this.infos;
      const array = [];
      Array.prototype.push
        .call(array,
          genres.reduce((previous, current) => `${previous} / ${current}`),
          directors.map(value => `${value.name}(导演)`).join(' / '),
          casts.map(value => value.name).join(' / '),
          year,
        );
      return array.join(' / ');
    },
  },

  data() {
    return {
      msg: 'tagInfosItem',
    };
  },
};
</script>

<style scoped>
.tagInfosItem {
  padding: 0.5rem 0 0.3rem 0;
  margin: 0 0.3rem 0 0.3rem;
  border-top: 0.02rem solid #eee;
  width: 6.9rem;
  display: flex;
  flex-wrap: wrap;
}

h3 {
  font-size: 0.36rem;
  color: #000;
  line-height: 0.48rem;
  word-wrap: break-word;
  text-align: justify;
}

img {
  width: 100%;
}

main {
  flex: 7;
}

aside {
  flex: 3;
  padding-left: 0.6rem;
  box-sizing: border-box;
}

.average {
  margin-top: 0.1rem;
}

.average span {
  font-size: 0.24rem;
  color: #ccc;
  font-weight: bold;
}

.average p {
  font-size: 0.28rem;
  color: #ccc;
  line-height: 1.5;
  margin-top: 0.2rem;
}

</style>
