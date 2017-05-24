<template>
  <main>
    <h1>{{ currentMovie.title }}</h1>
    <div class="movieInfos">
      <div class="left">
        <div class="rating">
          <star
            :average="currentMovie.rating.average"
            v-if="currentMovie.rating.average"
            :length="0.26"
          />
          <span
            style="color: #494949;"
          >
            {{
              currentMovie.rating.average ?
                currentMovie.rating.average.toFixed(1) : '暂无评分'
            }}
          </span>
          <span style="color: #aaa;">{{ currentMovie.ratings_count }}人评价</span>
        </div>
        <div class="infos">{{ infos }}</div>
      </div>
      <aside>
        <img v-lazy="currentMovie.images.large" class="movieImage">
      </aside>
    </div>
    <div class="summary">
      <h2>{{ currentMovie.title }}的剧情简介</h2>
      <article>
        {{ currentMovie.summary }}
      </article>
    </div>
    <div class="more">
      <h2>查看更多豆瓣高分电影电视剧</h2>
      <article>
        <router-link
          :to="`/tag/${item}`"
          v-for="item in currentMovie.tags"
          class="tagItem"
          :key="item"
        >
          {{ item }}
        </router-link>
      </article>
    </div>
    <div>
      <h2>{{ currentMovie.title }}的导演和主演</h2>
      <article class="celebrityItems">
        <router-link
          :to="`/tag/${item.name}`"
          v-for="item in celebrityItems"
          :key="item.id"
        >
          <div class="celebrityItem">
            <img v-lazy="item.avatars.large" alt="导演照片">
            <h3 class="item-title">{{ item.name }}</h3>
            <span v-if="item.isDirector">导演</span>
          </div>
        </router-link>
      </article>
    </div>
  </main>
</template>

<script>
import Star from '../Common/Star';

export default {
  name: 'Infos',

  props: ['currentMovie'],

  components: {
    Star,
  },

  data() {
    return {
    };
  },

  computed: {
    infos() {
      const { directors, countries, year, genres, casts } = this.currentMovie;
      const array = [];
      Array.prototype.push
        .call(array,
          genres.reduce((previous, current) => `${previous} / ${current}`),
          directors.map(value => `${value.name}(导演)`).join(' / '),
          casts.map(value => value.name).join(' / '),
          `${year}年(${countries.reduce((previous, current) => `${previous} / ${current}`)})上映`,
        );
      return array.join(' / ');
    },
    celebrityItems() {
      const { directors, casts } = this.currentMovie;
      directors.forEach((value) => {
        value.isDirector = true;
      });
      casts.forEach((value) => {
        value.isDirector = false;
      });
      return Array.prototype.concat.call(directors, casts);
    },
  },
};
</script>

<style scoped>
main {
  width: 6.78rem;
  margin: 0 auto;
}

h1 {
  font-size: 0.48rem;
  color: #111;
  display: inline-block;
  margin-bottom: 0.1rem;
  line-height: 0.48rem;
}

.rating {
  display: flex;
  align-items: center;
}

.rating span {
  font-size: 0.3rem;
  font-weight: bold;
  margin-left: 0.16rem;
}

.movieInfos {
  display: grid;
  grid-template-columns: 239fr 100fr;
}

.infos {
  color: #494949;
  font-size: 0.28rem;
  margin-top: 0.3rem;
}

.left {
  padding-right: 0.48rem;
}

.movieImage {
  width: 2rem;
}

.summary {
  margin-bottom: 0.6rem;
}

h2 {
  color: #aaa;
  margin-bottom: 0.3rem;
  font-size: 0.3rem;
}

article {
  font-size: 0.3rem;
  color: #494949;
}

.tagItem {
  display: inline-block;
  margin: 0.2rem 0.2rem 0 0;
  background-color: #f5f5f5;
  color: #494949;
  font-size: 0.3rem;
  line-height: 0.56rem;
  height: 0.56rem;
  border-radius: 0.28rem;
  text-align: center;
  font-weight: bold;
  padding: 0 0.24rem 0 0.24rem;
}

.more {
  margin-bottom: 0.6rem;
}

.celebrityItems {
  display: flex;
  flex-flow: row nowrap;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 4rem;
}

.celebrityItems::-webkit-scrollbar {
  display: none;
}

.celebrityItems img {
  width: 2rem;
  height: 2.8568rem;
}

.celebrityItem {
  display: inline-flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin-right: 0.375rem;
}

.celebrityItem span {
  color: #aaa;
  font-size: 0.24rem;
  font-weight: bold;
}

.item-title {
  margin-top: 0.3rem;
  margin-bottom: 0.096rem;
  font-size: 0.3rem;
  line-height: 0.3rem;
  color: #111;
  max-width: 2rem;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
