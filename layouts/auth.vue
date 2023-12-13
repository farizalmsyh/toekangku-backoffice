<template>
  <div class="auth bg-ui-surface">
    <div class="auth-section">
      <Nuxt />
    </div>
    <div class="py-2 bg-white w-100 text-center fotbot"><small class="text-ui-primary">Copyright &copy; ToekangKu {{ year }}</small></div>
  </div>
</template>
<script>
export default {
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
        if(isAuth) {
          let url = this.$route?.query?.returnUrl ?? '/'
          this.$router.push(`${url}`)
          this.$toast.info('You already Logged-in!')
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
.auth {
  min-height: 100vh;
  overflow: hidden;
}
.auth-section{
  width: 100%;
  overflow: hidden;
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>