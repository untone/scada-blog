<script>
import Header from '@/components/app/Header'
import Footer from '@/components/app/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
}
</script>

<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
    <portal-target
      name="modals-portal"
      slim
    />
  </div>
</template>
