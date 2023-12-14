<template>
  <b-container fluid class="py-4 px-lg-4">
    <b-row class="justify-content-center">   
      <b-col lg="12" class="mb-4">
        <b-card class="border-rounded border-0 shadow-md">
          <b-row>
            <b-col lg="3">
              <b-row>
                <b-col cols="auto" class="pt-1">
                  <strong class="page-title text-ui-primary">Pengaturan</strong>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col lg="12" class="mb-4">
        <b-card class="border-rounded border-0 shadow-md">
          <div class="row" v-if="!isLoad">
            <div class="col-12">
              <div class="row justify-content-between" v-if="form.id">
                <div class="col-lg-5">
                  <div class="row">
                    <div class="col-12 mb-3">
                      <img height="100px" width="100px" :src="form.picture_url ? form.picture_url : '/images/user.png'" class="rounded-circle border-ui-primary" alt="Profile">
                    </div>
                    <div class="form-group col-12 mb-3">
                      <label for="">Foto Pengguna</label>
                      <input type="file" ref="files" class="form-control text-ui-primary input-form">
                    </div>
                    <div class="form-group col-12 text-right">
                      <button class="btn br-100 btn-ui-success" @click="updatePicture"><i class="fas fa-save mr-2"></i>Ubah Foto</button>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="row">
                    <div class="form-group col-lg-12 mb-4">
                      <label for="">Nama</label>
                      <b-input-group class="border-rounded border br-100">
                        <template #prepend>
                          <b-input-group-text class="bg-white border-0 input-icon"><em class="bx bx-user text-ui-primary"></em></b-input-group-text>
                        </template>
                        <b-form-input v-model="form.nama" class="bg-white border-0 text-ui-primary input-form" type="text" placeholder="Masukkan nama"></b-form-input>
                      </b-input-group>
                    </div>
                    <div class="form-group col-lg-12 mb-4">
                      <label for="">Email</label>
                      <b-input-group class="border-rounded border br-100">
                        <template #prepend>
                          <b-input-group-text class="bg-white border-0 input-icon"><em class="bx bx-envelope text-ui-primary"></em></b-input-group-text>
                        </template>
                        <b-form-input v-model="form.email" class="bg-white border-0 text-ui-primary input-form" type="email" placeholder="Masukkan email"></b-form-input>
                      </b-input-group>
                    </div>
                    <div class="form-group col-lg-12 mb-4">
                      <label for="">Jenis Kelamin</label>
                      <b-form-select v-model="form.jenis_kelamin" class="text-ui-primary">
                        <template #first>
                          <b-form-select-option value="" class="text-ui-primary" disabled>-- Pilih Jenis Kelamin --</b-form-select-option>
                        </template>
                        <b-form-select-option value="Laki-Laki">Laki-Laki</b-form-select-option>
                        <b-form-select-option value="Perempuan">Perempuan</b-form-select-option>
                      </b-form-select>
                    </div>
                    <div class="form-group col-lg-12 mb-4">
                      <label for="">Tanggal Lahir</label>
                      <b-input-group class="border-rounded border br-100">
                        <template #prepend>
                          <b-input-group-text class="bg-white border-0 input-icon"><em class="bx bx-calendar text-ui-primary"></em></b-input-group-text>
                        </template>
                        <b-form-input v-model="form.tanggal_lahir" class="bg-white border-0 text-ui-primary input-form" type="date" placeholder="Masukkan email"></b-form-input>
                      </b-input-group>
                    </div>
                    <div class="form-group col-lg-12 mb-4">
                      <label for="">Password <small class="text-ui-danger">*Isi jika ingin mengubah password</small></label>
                      <b-input-group class="border-rounded border br-100">
                        <template #prepend>
                          <b-input-group-text class="bg-white border-0 input-icon"><em class="bx bx-envelope text-ui-primary"></em></b-input-group-text>
                        </template>
                        <b-form-input v-model="form.password" class="bg-white border-0 text-ui-primary input-form" type="password" placeholder="Masukkan password"></b-form-input>
                      </b-input-group>
                    </div>
                    <div class="form-group col-lg-12 mb-4">
                      <label for="">Konfirmasi Password <small class="text-ui-danger">*Isi jika ingin mengubah password</small></label>
                      <b-input-group class="border-rounded border br-100">
                        <template #prepend>
                          <b-input-group-text class="bg-white border-0 input-icon"><em class="bx bx-envelope text-ui-primary"></em></b-input-group-text>
                        </template>
                        <b-form-input v-model="form.password_confirmation" class="bg-white border-0 text-ui-primary input-form" type="password" placeholder="Masukkan konfirmasi password"></b-form-input>
                      </b-input-group>
                    </div>
                    <div class="form-group col-lg-12 mb-4 text-right">
                      <button class="btn br-100 btn-ui-success" @click="updateUser"><i class="fas fa-save mr-2"></i>Simpan</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-else>
                <b-col cols="12 text-center py-5">
                  <img src="/images/empty.svg" width="200px" alt="empty">
                  <h4 class="mt-4 text-ui-primary">Data tidak ditemukan</h4>
                </b-col>
              </div>
            </div>
          </div>
          <b-row v-else class="mb-4">
            <b-col cols="12" class="text-center py-5">
              <div class="spinner-border text-ui-primary" style="width: 5rem; height: 5rem;" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      isLoad: true,
      form: {
        id: '',
        nama: '',
        email: '',
        password: '',
        password_confirmation: '',
        jenis_kelamin: '',
        tanggal_lahir: '',
        picture_url: '',
      }
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    async getUser() {
      await this.$axios.$get(`/auth/user`).then((res) => {
        if(res.success) {
          this.form.id = res.data.user.id
          this.form.nama = res.data.user.name
          this.form.email = res.data.user.email
          this.form.jenis_kelamin = res.data.user.gender
          this.form.tanggal_lahir = res.data.user.birth_date
          this.form.picture_url = res.data.user.picture_url
        }
      }).catch(() => {}).finally(() => this.isLoad = false)
    },
    async updateUser(){
      let data = this.form
      await this.$axios.$put(`/user/update`, data).then((res) => {
        if(res.success) {
          this.$toast.success(res?.message)
          this.getUser()
        } else {
          this.$toast.error(res?.message)
        }
      }).catch(err => {
        this.$toast.error(err?.response?.data?.message)
      })
    },
    async updatePicture(){
      let formData = new FormData
      let files = this.$refs.files.files
      if(files.length) {
        formData.append('gambar', files[0])
        await this.$axios.$post(`/auth/change-profile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((res) => {
          if(res.success) {
            this.$toast.success(res?.message)
            this.getUser()
          } else {
            this.$toast.error(res?.message)
          }
        }).catch(err => {
          this.$toast.error(err?.response?.data?.message)
        })
      } else {
        this.$toast.error('Harap isi kolom file')
      }
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
.border-ui-primary{
  border: 2px solid red;
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