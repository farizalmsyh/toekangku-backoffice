<template>
  <div class="row justify-content-center pb-5">
    <div class="col-lg-4 col-11">
      <div class="card rounded-lg border-0 shadow-lg br-20 py-3">
        <div class="card-header bg-white border-0 pt-4">
          <div class="row justify-content-center ">
            <div class="col-11">
              <div class="row">
                <div class="col-lg-12 text-center mb-4">
                  <img height="auto" width="200px" src="/images/logo.png" alt="Logo">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body pb-lg-5 pt-lg-3 pt-0">
          <form @submit.prevent="onLogin()" class="row justify-content-center text-left">
            <div class="form-group col-11 mb-4">
              <b-input-group class="search-field border-rounded br-20">
                <template #prepend>
                  <b-input-group-text class="bg-ui-secondary-light border-0 input-icon"><em class="bx bx-user text-ui-primary"></em></b-input-group-text>
                </template>
                <b-form-input v-model="form.email" class="bg-ui-secondary-light border-0 text-ui-primary input-form" type="email" placeholder="Username"></b-form-input>
              </b-input-group>
            </div>
            <div class="form-group col-11 mb-4">
              <b-input-group class="search-field border-rounded br-20">
                <template #prepend>
                  <b-input-group-text class="bg-ui-secondary-light border-0 input-icon"><em class="bx bx-search-alt text-ui-primary"></em></b-input-group-text>
                </template>
                <b-form-input v-model="form.password" class="bg-ui-secondary-light border-0 text-ui-primary input-form" type="password" placeholder="Password"></b-form-input>
              </b-input-group>
            </div>
            <div class="col-11 text-center mt-2">
              <button type="submit" class="btn btn-ui-primary br-100 btn-block px-3" :disabled="form.username == '' || form.password == ''">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'auth',
  data() {
    return {
      returnUrl: this.$route?.query?.returnUrl ?? '/',
      form: {
        email: '',
        password: '',
      }
    }
  },
  methods: {  
    async onLogin() {
      try {
        let data = this.form;
        await this.$axios.$post('/auth/login', data).then((resp) => {
          console.log(resp)
          if(resp.success) {
            this.$toast.success(resp?.message)
            localStorage.setItem('token', resp.data.token)
            this.$router.push({ path: this.returnUrl})
          } else {
            this.$toast.error(resp?.message)
          }
        }).catch(err => {
          this.$toast.error(err?.response?.data?.message)
        })
      } catch (errors) {}
    }
  }
}
</script>
<style scoped>
@media only screen and (max-width: 991px) {
  .page-title {
    display: none;
  }
  .textscent {
    text-align: center !important;
  }
  .page-logo {
    width: 60%;
  }
  .box-logo {
    text-align: center;
  }
}
.page-title {
  font-size: 64px;
  font-weight: bolder;
}
.br-20 {
  border-radius: 20px !important;
}
.brand-box {
  height: 50px;
  width: 100px; 
  text-align: center; background-color: white;
  border-radius: 0px 50px 50px 0px;
}
.btn-login {
  font-weight: 900;
}
.input-icon {
  border-radius: 20px 0px 0px 20px;
}
.input-form {
  border-radius: 0px 20px 20px 0px;
}
</style>