<template>
<b-container fluid class="py-4 pb-5 px-lg-4">
  <b-row class="justify-content-center">
    <b-col lg="12" class="mb-4">
      <b-row class="h-100">
        <b-col lg="8" class="order-2 order-lg-1">
          <b-row class="h-100">
            <b-col>
              <b-card class="shadow border-rounded h-100">
                <p class="dash-card-title mb-3">Chart Profesi Pengguna</p>
                <div class="row justify-content-center">
                  <div class="col-auto">
                    <highchart :options="chartProfession" />
                  </div>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="4" class="order-1 order-lg-2">
          <b-row>
            <b-col lg="12">
              <b-card class="pb-4 pt-3 shadow bg-white border-rounded mb-4">
                <b-row>
                  <b-col lg="5">
                    <div class="text-center">
                      <em class="bx bxs-user-account widget-icon"></em>
                    </div>
                  </b-col>
                  <b-col lg="7 pt-3">
                    <p class="dash-card-title text-black mb-3">Pengguna Aktif</p>
                    <h3 class="text-black dash-card-text">{{ widget.users | separatorDot }}</h3>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
            <b-col lg="12">
              <b-card class="pb-4 pt-3 shadow bg-white border-rounded mb-4">
                <b-row>
                  <b-col lg="5">
                    <div class="text-center">
                      <em class="bx bx-repost widget-icon"></em>
                    </div>
                  </b-col>
                  <b-col lg="7 pt-3">
                    <p class="dash-card-title text-black mb-3">Postingan Aktif</p>
                    <h3 class="text-black dash-card-text">{{ widget.threads | separatorDot }}</h3>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
            <b-col lg="12">
              <b-card class="pb-4 pt-3 shadow bg-white border-rounded">
                <b-row>
                  <b-col lg="5">
                    <div class="text-center">
                      <em class="bx bx-badge-check widget-icon"></em>
                    </div>
                  </b-col>
                  <b-col lg="7 pt-3">
                    <p class="dash-card-title text-black mb-3">Pekerjaan Selesai</p>
                    <h3 class="text-black dash-card-text">{{ widget.jobs | separatorDot }}</h3>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
    <b-col lg="12" class="mb-4">
      <b-row class="h-100">
        <b-col lg="6" class="mb-4">
          <b-row class="h-100">
            <b-col>
              <b-card class="shadow border-rounded h-100">
                <p class="dash-card-title mb-3">Chart Status Pekerjaan</p>
                <div class="w-100">
                  <highchart :options="chartJob" />
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="6" class="mb-4">
          <b-row class="h-100">
            <b-col>
              <b-card class="shadow border-rounded h-100">
                <p class="dash-card-title mb-3">Chart Tipe Postingan</p>
                <div class="w-100">
                  <highchart :options="chartThread" />
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</b-container>
</template>
<script>
export default {
  created() {
    this.getChartWidget()
    this.getProfesion()
    this.getJob()
    this.getThread()
  },
  methods: {
    async getChartWidget(){
      await this.$axios.$get(`/dashboard/widget`).then((res) => {
        if(res.success) {
          this.widget = res.data
        }
      })
    },
    async getProfesion(){
      await this.$axios.$get(`/dashboard/profession`).then((res) => {
        if(res.success) {
          let datas = [];
          res.data.profesions?.map((item) => {
            let data = [item.profesion, item.count]
            datas.push(data)
          })
          this.chartProfession.series[0].data = datas
        }
      })
    },
    async getJob(){
      await this.$axios.$get(`/dashboard/job`).then((res) => {
        if(res.success) {
          let data = res.data
          let datas = [
            ['Menunggu', data.waiting],
            ['Berjalan', data.running],
            ['Selesai', data.done],
            ['Batal', data.cancel]
          ]
          this.chartJob.series[0].data = datas
        }
      })
    },
    async getThread(){
      await this.$axios.$get(`/dashboard/thread`).then((res) => {
        if(res.success) {
          let data = res.data
          let datas = [
            ['Cari Kerja', data.worker],
            ['Cari Pekerja', data.seeker]
          ]
          this.chartThread.series[0].data = datas
        }
      })
    },
  },
  data(){
    return{
      widget: {
        users: 0,
        threads: 0,
        jobs: 0
      },
      chartProfession: {
        title: {
          text: ''
        },
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          itemMarginTop: 10,
          itemMarginBottom: 10
        },
        plotOptions: {
          pie: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              style: {
                fontWeight: 'bold',
                color: 'white'
              }
            },
            allowPointSelect: true,
            cursor: 'pointer',
            showInLegend: true,
          }
        },
        credits: {
          enabled: false
        },
        series: [{
          type: 'pie',
          name: 'Biaya',
          innerSize: '50%',
          data: [],
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '16px'
            },
            formatter: function(event) {
              return this.point.percentage?.toFixed(1)+'%';
            }
          }
        }]
      },
      chartJob: {
        colors:['#EAB308','#0EA5E9','#14B8A6','#F43F5E'],
        title: {
          text: ''
        },
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              style: {
                fontWeight: 'bold',
                color: 'white'
              }
            },
            allowPointSelect: true,
            cursor: 'pointer',
            showInLegend: true,
          }
        },
        credits: {
          enabled: false
        },
        series: [{
          type: 'pie',
          name: 'Biaya',
          innerSize: '50%',
          data: [],
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '16px'
            },
            formatter: function(event) {
              return this.point.percentage?.toFixed(1)+'%';
            }
          }
        }]
      },
      chartThread: {
        colors:['#F0BB22','#0284C7'],
        title: {
          text: ''
        },
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              style: {
                fontWeight: 'bold',
                color: 'white'
              }
            },
            allowPointSelect: true,
            cursor: 'pointer',
            showInLegend: true,
          }
        },
        credits: {
          enabled: false
        },
        series: [{
          type: 'pie',
          name: 'Biaya',
          innerSize: '50%',
          data: [],
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '16px'
            },
            formatter: function(event) {
              return this.point.percentage?.toFixed(1)+'%';
            }
          }
        }]
      },
    }
  }
}
</script>
<style scoped>
:root {
  --progress-value: 0;
  --progress-label: '0%';
}
.widget-icon {
  font-size: 100px;
  color: #C07F00;
}
@media only screen and (max-width: 991px) {
  .dash-card-title {
    text-align: center;
  }
  .dash-card-text {
    text-align: center;
  }
}
.dash-card-title {
  font-weight:1000;
  font-size: 130%;
  line-height: 24px;
}
.dash-card-text {
  font-weight:800;
  font-size:110%;
}
.border-rounded {
  border-radius: 1rem !important;
}
</style>
