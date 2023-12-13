<template>
  <b-navbar class="p-0 pr-lg-3 pt-lg-2" toggleable="lg" :sticky="true" type="light" :variant="bgColor" shadow>
    <b-navbar class="p-0" variant="faded" type="light">
      <b-navbar-brand class="p-0" href="#" @click="redirected">
        <div class="brand-box px-3 pt-1">
          <img height="auto" width="200px" :src="auth?.user?.picture_url ?? '/images/logo.png'" alt="Logo">
        </div>
      </b-navbar-brand>
    </b-navbar>
    <b-navbar-toggle target="nav-collapse" class="mr-3"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav class="p-3 p-lg-0">
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="mx-lg-4">
          <NuxtLink to="/" class="text-decoration-none">
            <b-row>
              <b-col lg="3" cols="1" class="pl-0">
                <em class="nav-item-icon mr-1 bx bxs-dashboard"></em>
              </b-col>
              <b-col class="pl-1">
                <span class="nav-item-span">
                  Dashboard
                </span>
              </b-col>
            </b-row>
          </NuxtLink>
          <div v-show="isMatch(['index'])" class="selected only-desktop"><div class="rec-1"></div><div class="rec-2"></div><div class="rec-3"></div></div>
        </b-nav-item>
        <b-nav-item class="mx-lg-4">
          <NuxtLink to="/postingan" class="text-decoration-none">
            <b-row>
              <b-col lg="3" cols="1" class="pl-0">
                <em class="nav-item-icon mr-1 bx bx-repost"></em>
              </b-col>
              <b-col class="pl-1">
                <span class="nav-item-span">
                  Postingan
                </span>
              </b-col>
            </b-row>
          </NuxtLink>
          <div v-show="isMatch(['postingan'])" class="selected only-desktop"><div class="rec-1"></div><div class="rec-2"></div><div class="rec-3"></div></div>
        </b-nav-item>
        <b-nav-item class="mx-lg-4">
          <NuxtLink to="/pengguna" class="text-decoration-none">
            <b-row>
              <b-col lg="3" cols="1" class="pl-0">
                <em class="nav-item-icon mr-1 bx bxs-user-account"></em>
              </b-col>
              <b-col class="pl-1">
                <span class="nav-item-span">
                  Pengguna
                </span>
              </b-col>
            </b-row>
          </NuxtLink>
          <div v-show="isMatch(['pengguna'])" class="selected only-desktop"><div class="rec-1"></div><div class="rec-2"></div><div class="rec-3"></div></div>
        </b-nav-item>
        <b-nav-item class="mx-lg-4">
          <NuxtLink to="/bantuan" class="text-decoration-none">
            <b-row>
              <b-col lg="3" cols="1" class="pl-0">
                <em class="nav-item-icon mr-1 bx bx-help-circle"></em>
              </b-col>
              <b-col class="pl-2">
                <span class="nav-item-span">
                  Bantuan&nbsp;
                </span>
              </b-col>
            </b-row>
          </NuxtLink>
          <div v-show="isMatch(['bantuan'])" class="selected only-desktop"><div class="rec-1"></div><div class="rec-2"></div><div class="rec-3"></div></div>
        </b-nav-item>
        <b-nav-item class="mx-lg-4 mobile-profile">
          <b-nav-item-dropdown right :no-caret="true">
            <template #button-content>
              <b-row>
                <b-col lg="3" cols="1" class="pl-0">
                  <em class="nav-item-icon mr-1 bx bx-user"></em>
                </b-col>
                <b-col class="pl-2">
                  <span class="nav-item-span">{{ auth?.user?.name }}</span>
                </b-col>
                <b-col class=" text-right">
                  <em class="bx bx-chevron-down nav-item-icon"></em>
                </b-col>
              </b-row>
            </template>
            <b-dropdown-item href="javascript:void(0)" class="text-black">
              <NuxtLink class="text-decoration-none text-black" to="/setting/pelatih">Setelan</NuxtLink>
            </b-dropdown-item>
            <b-dropdown-item href="javascript:void(0)" @click="logoutAlert()">Keluar</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="only-desktop ml-4 py-2">
        <b-nav-item-dropdown right :no-caret="true">
          <template #button-content>
            <b-row>
              <b-col class="pl-3 pr-1 pt-2 my-auto">
                <em class="bx bx-chevron-down nav-item-icon"></em>
              </b-col>
              <b-col>
                <img src="/images/user.png" width="50" height="50" class="rounded-circle border-ui-primary" alt="Profile">
              </b-col>
            </b-row>
          </template>
          <b-dropdown-item href="javascript:void(0)">
            <NuxtLink class="text-decoration-none text-ui-primary font-weight-bolder" to="/setting/pelatih"><em class="bx bx-wrench font-weight-bolder mr-2"></em>Setelan</NuxtLink>
          </b-dropdown-item>
          <b-dropdown-item href="javascript:void(0)" @click="logoutAlert()">
            <span class="text-decoration-none text-ui-primary font-weight-bolder"><em class="bx bx-log-out-circle font-weight-bolder mr-2"></em>Keluar</span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
  
<script>
export default {
  data(){
    return{
      route_name: this.$router.currentRoute.name,
      bgColor: '',
      auth: {}
    }
  },
  methods: {
    logoutAlert() {
      this.$swal({
        customClass: {
          confirmButton: 'btn-sa-confirm',
          cancelButton: 'btn-sa-cancel'
        },
        reverseButtons: true,
        title: 'Anda yakin ingin Logout?',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
      }).then((result) => {
        if (result.isConfirmed) {
          this.logout()
        }
      });
    },
    isMatch(arr){
      return arr.includes(this.route_name);
    },
    redirected() {
      this.$router.push('/')
    },  
    logout() {
      this.$store.commit('auth/removeAuth')
      localStorage.removeItem('token')
      this.$router.push('/login')
      this.$toast.success('Logout Success!')
    },
    handleScroll () {
      let y = window.scrollY / 150
      if(y > 0.24) {
          this.bgColor = 'white'
      } else {
          this.bgColor = ''
      }
    },

  },
  watch: {
    $route(to) {
      this.route_name = to.name;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.auth = this.$store.state.auth
  }
}
</script>
  
<style scoped>
.text-black {
  color: #000000 !important;
}
.border-ui-primary{
  border: 2px solid red;
}
.navbar-nav {
  background: #fff;
  padding: 12px 15px;
  border-radius: 63px;
}
.selected {
  width: 100%;
  height: 3px;
  display: flex;
}
.selected .rec-1 {
  position: relative;
  border-radius: 5px;
  width: 27px;
  height: 100%;
  top: 0;
  left: 15px;
  background-color: #C07F00;
}
.selected .rec-2 {
  position: relative;
  border-radius: 5px;
  width: 10px;
  height: 100%;
  top: 0;
  left: 20px;
  background-color: #C07F00;
}
.selected .rec-3 {
  position: relative;
  border-radius: 5px;
  width: 5%;
  height: 100%;
  top: 0px;
  left: 25px;
  background-color: #C07F00;
}
::v-deep .nav-link.dropdown-toggle {
  padding: 0 !important;
}
::v-deep .dropdown-menu.dropdown-menu-right {
  border: 100px !important;
  margin-top: 15px;
  margin-right: -7px;
}
::v-deep .nav-link.dropdown-toggle :active{
  border: 0px;
}
.nav-profile strong {
  font-size: 12px;
  font-weight: 700;
  color: #FFF;
}
.nav-profile p {
  font-size: 11px;
  font-weight: 400;
  color: #FFF;
}
.brand-box {
  height: 75px;width: 150px; text-align: center;
}
@media only screen and (max-width: 991px) {
  .navbar-toggler-icon {
    border-color: rgb(255,102,203) !important;
  }
  .navbar {
    background-color: #FFF;
  }
  .brand-box {
    padding-left: 10px !important; 
    padding-top: .5rem !important;
  }
  .mobile-profile {
    display: list-item !important;
  }
}
.mobile-profile {
  display: none;
}
.nav-item-icon{
  font-size: 24px;
  color: #C07F00 !important;
  font-weight: 400;
}
.nav-item-span {
  font-weight: 800;
  font-size: 12px;
  color: #C07F00 !important;
  
  text-decoration: none;
}
.nav-item-span.active {
  font-weight: bold;
  font-size: 18px;
  color: #C07F00 !important;
}
</style>
  