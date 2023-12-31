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
            <b-col lg="3" class="mb-2">
              <b-row>
                <b-col cols="auto">
                  <select v-model="limit" class="display-row form-control form-control-sm">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </b-col>
                <b-col cols="auto" class="pt-1">
                  <strong class="page-title text-ui-primary">Pengguna - Internal</strong>
                </b-col>
              </b-row>
            </b-col>
            <b-col lg="9" class="text-right">
              <b-row class="justify-content-end">
                <b-col lg="auto" class="mb-2">
                  <b-input-group class="search-field br-100" size="sm">
                    <template #prepend>
                      <b-input-group-text class="bg-transparent border-0"><em class="bx bx-search-alt"></em></b-input-group-text>
                    </template>
                    <b-form-input class="bg-transparent border-0" v-model="search" placeholder="Cari"></b-form-input>
                  </b-input-group>
                </b-col>  
                <b-col lg="auto">
                  <NuxtLink to="/pengguna/create" class="btn btn-sm br-100 btn-ui-primary"><i class="fas fa-plus mr-2"></i>Tambah</NuxtLink>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col lg="12" class="mb-4">
        <b-card class="border-rounded border-0 shadow-md">
          <b-row>
            <b-col cols="12">
              <b-table :sticky-header="true" :table-class="'text-center'" @row-clicked="clickedRow" responsive hover :borderless="true" :items="items.data" :fields="fields">
                <template #cell(key)="data">
                  {{ ((currentPage - 1) * limit) + (data.index + 1) }}
                </template>
                <template #cell()="data">
                  <span>{{ data.value }}</span>
                </template>
                <template #cell(address)="data">
                  <span>{{ data.item.address_village }}, {{ data.item.address_subdistrict }}, {{ data.item.address_city }}, {{ data.item.address_province }}</span>
                </template>
                <template #cell(location)="data">
                  <span>{{ data.item.location_village }}, {{ data.item.location_subdistrict }}, {{ data.item.location_city }}, {{ data.item.location_province }}</span>
                </template>
                <template #cell(created_at)="data">
                  <span>{{ data.value | formatDate}}</span>
                </template>
                <template #cell(picture_url)="data">
                  <img height="30px" width="30px" :src="data.value ? data.value : '/images/user.png'" alt="Profile">
                </template>
                <template #cell(action)="data">
                  <button v-if="$store.state.auth.user?.id && $store.state.auth.user?.id != data.item.id" @click="deleteAlert(data.item.id)" class="btn btn-sm btn-danger">
                    <i class="fas fa-trash"></i>
                  </button>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col lg="12" class="mb-4">
        <b-card class="border-rounded border-0 shadow-md">
          <b-row>
            <b-col cols="12">
              <b-pagination 
                v-model="currentPage"
                :align="'center'" 
                class="btn-page mb-0" 
                pills 
                :total-rows="items.count" 
                :per-page="limit"
                @change="changePage()"
                size="sm">
              </b-pagination>
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
      user: null,
      fields: [
        { key: 'picture_url', label: '' },
        { key: 'name', label: 'Nama' },
        { key: 'email', label: 'Email' },
        { key: 'nik', label: 'NIK' },
        { key: 'phone', label: 'No. HP' },
        { key: 'gender', label: 'Jenis Kelamin' },
        { key: 'birth_date', label: 'Tanggal Lahir' },
        { key: 'created_at', label: 'Tanggal Dibuat'},
        { key: 'action', label: ''},
      ],
      search: '',
      limit: 10,
      currentPage: 1,
      items: {
        count : 0,
        data: []
      }
    }
  },
  mounted() {
    this.getUsers()
    this.user = this.$store.state.auth.user
    console.log(this.user)
  },
  watch: {
    search:function() {
      this.currentPage = 1
      this.getUsers()
    }
  },
  methods: {
    clickedRow(item) {
      this.$router.push('/pengguna/edit/' + item.id)
    },
    changeLimit() {
      this.currentPage = 1
      this.getUsers()
    },
    changePage() {
      setTimeout(() => this.getUsers(), 500)
    },
    async getUsers(){
      await this.$axios.$get(`/user?offset=${(this.currentPage - 1) * this.limit}&limit=${this.limit}&search=${this.search}&type=Internal`).then((res) => {
        this.items.count = res.data.count
        this.items.data = res.data.users
      })
    },
    deleteAlert(id) {
      this.$swal({
        customClass: {
          confirmButton: 'btn-sa-confirm',
          cancelButton: 'btn-sa-cancel'
        },
        reverseButtons: true,
        title: 'Anda yakin ingin menghapus data?',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
      }).then((result) => {
        if (result.isConfirmed) {
          this.delete(id)
        }
      });
    },
    async delete(id) {
      await this.$axios.$delete(`/user/delete?id=${id}`).then((res) => {
        if(res.success) {
          this.$toast.success(res?.message)
          this.changeLimit();
        } else {
          this.$toast.error(res?.message)
        }
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