<template>
  <div class="container">
    <h1>Интернет-магазин "Хвостики"</h1>
    <CategoriesList :categories="categories" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CategoriesList from '~/components/common/CategoriesList.vue'
export default {
  components: {
    CategoriesList,
  },
  async asyncData({ error, store }) {
    try {
      await store.dispatch('getCategoriesList')
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
      return error({
        statusCode: 404,
        message: 'Категории не найдены или сервер не доступен',
      })
    }
  },
  computed: {
    ...mapState({
      categories: 'categoriesList',
    }),
  },
}
</script>

<style scoped>
h1 {
  font-size: 3em;
}
</style>
