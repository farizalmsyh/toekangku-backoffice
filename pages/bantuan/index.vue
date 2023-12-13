<template>
  <b-container fluid class="py-4 px-lg-4">
    <b-row class="justify-content-center">   
      <b-col lg="12" class="mb-4">
        <b-card class="border-rounded border-0 shadow-md">
          <b-row>
            <b-col cols="3">
              <b-row>
                <b-col cols="auto">
                  <select v-model="limit" class="display-row form-control form-control-sm">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </b-col>
                <b-col cols="auto" class="pt-1">
                  <strong class="page-title text-ui-primary">Bantuan</strong>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="9" class="text-right">
              <b-row class="justify-content-end">
                <b-col cols="auto">
                  <b-input-group class="search-field br-100" size="sm">
                    <template #prepend>
                      <b-input-group-text class="bg-transparent border-0"><em class="bx bx-search-alt"></em></b-input-group-text>
                    </template>
                    <b-form-input class="bg-transparent border-0" v-model="search" placeholder="Cari"></b-form-input>
                  </b-input-group>
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
              <b-table :sticky-header="true" :table-class="'text-center'" responsive hover :borderless="true" :items="items.data" :fields="fields">
                <template #cell(key)="data">
                  {{ ((currentPage - 1) * limit) + (data.index + 1) }}
                </template>
                <template #cell()="data">
                  <span>{{ data.value }}</span>
                </template>
                <template #cell(created_at)="data">
                  <span>{{ data.value | formatDate}}</span>
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
      fields: [
        { key: 'key', label: 'No' },
        { key: 'name', label: 'Nama' },
        { key: 'email', label: 'Email' },
        { key: 'message', label: 'Pesan' },
        { key: 'created_at', label: 'Tanggal' },
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
    this.getHelps()
  },
  watch: {
    search:function() {
      this.currentPage = 1
      this.getHelps()
    }
  },
  methods: {
    changeLimit() {
      this.currentPage = 1
      this.getHelps()
    },
    changePage() {
      setTimeout(() => this.getHelps(), 500)
    },
    async getHelps(){
      await this.$axios.$get(`/help?offset=${(this.currentPage - 1) * this.limit}&limit=${this.limit}&search=${this.search}`).then((res) => {
        this.items.count = res.data.count
        this.items.data = res.data.helps
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