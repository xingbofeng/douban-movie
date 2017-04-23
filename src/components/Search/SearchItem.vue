<template>
  <div class="searchItem">
    <router-link
      :to="`/tag/${tag}`"
    >
      <strong
        :style="`color: ${color}`"
      >
        {{ tag }}
      </strong>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'SearchItem',

  props: ['tag', 'color'],
};
</script>

<style scoped>
.searchItem {
  display: inline-block;
  width: 33.33%;
  text-align: center;
  height: 1rem;
  line-height: 1rem;
}

strong {
  font-size: 0.5rem;
}

</style>
