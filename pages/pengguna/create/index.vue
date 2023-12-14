<template>
  <b-container fluid class="py-4 px-lg-4">
    <b-row class="justify-content-center">   
      <b-col lg="12" class="mb-4">
        <div class="br-100 btn-group bg-white" role="group" aria-label="Button group with nested dropdown">
          <NuxtLink to="/pengguna" class="br-100 btn btn-ui-primary">Internal</NuxtLink>
          <NuxtLink to="/pengguna/pekerja" class="br-100 btn btn-white">Pekerja</NuxtLink>
          <NuxtLink to="/pengguna/pelamar" class="br-100 btn btn-white">Pelamar</NuxtLink>
        </div>
      </b-col>
      <b-col lg="12" class="mb-4">
        <b-card class="border-rounded border-0 shadow-md">
          <b-row>
            <b-col cols="3">
              <b-row>
                <b-col cols="auto" class="pt-1">
                  <strong class="page-title text-ui-primary">Pengguna - Internal</strong>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="9" class="text-right">
              <b-row class="justify-content-end"> 
                <b-col cols="auto">
                  <button class="btn btn-sm br-100 btn-ui-success" @click="postUser"><i class="fas fa-save mr-2"></i>Simpan</button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col lg="12" class="mb-4">
        <b-card class="border-rounded border-0 shadow-md">
          <form class="row">
            <div class="form-group col-lg-6 mb-4">
              <label for="">Nama</label>
              <b-input-group class="border-rounded border br-100">
                <template #prepend>
                  <b-input-group-text class="bg-white border-0 input-icon"><em class="bx bx-user text-ui-primary"></em></b-input-group-text>
                </template>
                <b-form-input v-model="form.nama" class="bg-white border-0 text-ui-primary input-form" type="text" placeholder="Masukkan nama"></b-form-input>
              </b-input-group>
            </div>
            <div class="form-group col-lg-6 mb-4">
              <label for="">Email</label>
              <b-input-group class="border-rounded border br-100">
                <template #prepend>
                  <b-input-group-text class="bg-white border-0 input-icon"><em class="bx bx-envelope text-ui-primary"></em></b-input-group-text>
                </template>
                <b-form-input v-model="form.email" class="bg-white border-0 text-ui-primary input-form" type="email" placeholder="Masukkan email"></b-form-input>
              </b-input-group>
            </div>
            <div class="form-group col-lg-6 mb-4">
              <label for="">Jenis Kelamin</label>
              <b-form-select v-model="form.jenis_kelamin" class="text-ui-primary">
                <template #first>
                  <b-form-select-option value="" class="text-ui-primary" disabled>-- Pilih Jenis Kelamin --</b-form-select-option>
                </template>
                <b-form-select-option value="Laki-Laki">Laki-Laki</b-form-select-option>
                <b-form-select-option value="Perempuan">Perempuan</b-form-select-option>
              </b-form-select>
            </div>
            <div class="form-group col-lg-6 mb-4">
              <label for="">Tanggal Lahir</label>
              <b-input-group class="border-rounded border br-100">
                <template #prepend>
                  <b-input-group-text class="bg-white border-0 input-icon"><em class="bx bx-calendar text-ui-primary"></em></b-input-group-text>
                </template>
                <b-form-input v-model="form.tanggal_lahir" class="bg-white border-0 text-ui-primary input-form" type="date" placeholder="Masukkan email"></b-form-input>
              </b-input-group>
            </div>
            <div class="form-group col-lg-6 mb-4">
              <label for="">Password</label>
              <b-input-group class="border-rounded border br-100">
                <template #prepend>
                  <b-input-group-text class="bg-white border-0 input-icon"><em class="bx bx-envelope text-ui-primary"></em></b-input-group-text>
                </template>
                <b-form-input v-model="form.password" class="bg-white border-0 text-ui-primary input-form" type="password" placeholder="Masukkan password"></b-form-input>
              </b-input-group>
            </div>
            <div class="form-group col-lg-6 mb-4">
              <label for="">Konfirmasi Password</label>
              <b-input-group class="border-rounded border br-100">
                <template #prepend>
                  <b-input-group-text class="bg-white border-0 input-icon"><em class="bx bx-envelope text-ui-primary"></em></b-input-group-text>
                </template>
                <b-form-input v-model="form.password_confirmation" class="bg-white border-0 text-ui-primary input-form" type="password" placeholder="Masukkan konfirmasi password"></b-form-input>
              </b-input-group>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      form: {
        nama: '',
        email: '',
        password: '',
        password_confirmation: '',
        jenis_kelamin: '',
        tanggal_lahir: '',
      }
    }
  },
  methods: {
    async postUser(){
      let data = this.form
      await this.$axios.$post(`/user/create`, data).then((res) => {
        if(res.success) {
          this.$toast.success(res?.message)
          this.$router.push({ path: '/pengguna'})
        } else {
          this.$toast.error(res?.message)
        }
      }).catch(err => {
        this.$toast.error(err?.response?.data?.message)
      })
    },
  }
}
</script>
<style scoped>
.display-row {
  border: 1px solid #8d5d00;
  color: #8d5d00;
  border-radius: 0.5rem;
}
.page-title{
  font-size: 16px;
  font-weight: 900;
  line-height: 19px;
}
.border-rounded {
  border-radius: 0.5rem !important;
}
.dash-card-title {
  font-weight:1000;
  font-size: 120%;
  line-height: 24px;
}
.dash-card-text {
  font-weight:800;
  font-size:100%;
}
.bl-0 {
  border-left: 0;
}
.search-field {
  border: 0;
  background-color: #e6edec;
}
::v-deep .table thead {
  border-bottom: 1px solid #D9EBCB;
} 
::v-deep .table thead th:last-child {
  position: sticky;
  right: 0;
  background-color: #FFF;
  border-left: 1px solid #D9EBCB;
} 
::v-deep .table tbody td:last-child {
  position: sticky;
  right: 0;
  background-color: #FFF;
  border-left: 1px solid #D9EBCB;
}
::v-deep .table tfoot th:last-child {
  position: sticky;
  right: 0;
  background-color: #FFF;
  border-left: 1px solid #D9EBCB;
}
::v-deep .table thead th {
  white-space: nowrap
} 
::v-deep .table tbody td {
  white-space: nowrap;
  cursor: pointer;
}
::v-deep .table tfoot th {
  white-space: nowrap
}
.table-responsive::-webkit-scrollbar {
  height: 7px;
}
.table-responsive::-webkit-scrollbar-track {
  background: #fff;
}
.table-responsive::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.table-responsive::-webkit-scrollbar-thumb:hover {
  background: #555;
}

::v-deep .b-pagination-pills .page-item{
  margin: 0px 0.3rem;
}
::v-deep .b-pagination-pills .page-item .page-link{
  border-radius: 5px !important;
  background: #F4EFF4;
  color: #AEAAAE;
  padding: 10px 15px;
  border: 0px;
  font-weight: 800;
}
::v-deep .b-pagination-pills .page-item.active .page-link, ::v-deep .b-pagination-pills .page-item .page-link:hover{
  color: #FFF;
  background-color: #8d5d00;
}
</style>