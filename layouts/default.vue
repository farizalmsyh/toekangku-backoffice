<template>
  <div class="min-vh-100">
    <Navbar/>
    <Nuxt />
    <div class="py-2 bg-white w-100 text-center fotbot"><small class="text-ui-primary">Copyright &copy; ToekangKu {{ year }}</small></div>
  </div>
</template>
<script>
import Navbar from '~/components/Navbar.vue'
export default {
  components: {
    Navbar
  },
  data() {
    return {
      year: new Date().getFullYear()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      this.$store.dispatch('auth/loadUser').then(() => {
        let isAuth = this.$store.state.auth.isAuth;
        if(!isAuth) {
          let url = this.$router.currentRoute.path
          this.$router.push(`/login?returnUrl=${url}`)
          this.$toast.info('You need to Login!')
        }
        setTimeout(() => this.$nuxt.$loading.finish(), 2000)
      })
    })
  }
}
</script>
<style scoped>
.fotbot {
  position: absolute;
  bottom: 0;
}
.min-vh-100 {
  min-height: 100vh;
  position: relative;
}
</style>