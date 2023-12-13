<template>
  <div v-if="show" class="loader">
    <div class="loader-section">
      <div class="spinner-border text-ui-primary" style="width: 3rem; height: 3rem;" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      show: true,
    }),
    methods: {
      start() {
        this.show = true
      },
      finish() {
        this.show = false
      },
    },
  }
</script>
<style scoped>
.loader {
  position: fixed;
  width: 100%;
  z-index: 9999;
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden;
}
.loader-section{
  position: fixed;
  top: 50%;
  text-align: center;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
</style>