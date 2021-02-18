<template>
  <div>
    <Header />
    <Breadcrumbs />
    <Nuxt />
  </div>
</template>

<script>
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import Header from '~/components/common/Header.vue'
export default {
  components: { Header, Breadcrumbs },
  head() {
    const canonical = `https://mysite.com${this.$route.path
      .toLowerCase()
      .replace(/\/$/, '')}`
    return {
      meta: [...this.meta],
      script: [
        // { src: 'https://markknol.github.io/console-log-viewer/console-log-viewer.js' }
      ],
      link: [{ rel: 'canonical', href: canonical }],
    }
  },

  computed: {
    meta() {
      return [{ hid: 'description', name: 'description', content: 'Главная' }]
    },
  },
}
</script>
