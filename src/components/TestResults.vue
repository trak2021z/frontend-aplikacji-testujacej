<template>
  <div class="main-container">
    <div class="vld-parent main-table">

      <loading :active.sync="isComputing" :is-full-page="false"/>

      <template v-if="!doneTest">
        <h3 v-if="!isComputing">Oops... something went wrong!</h3>
      </template>

      <template v-else>
        <div class="text-left">
          <h2 class="text-left">Results of {{doneTest.test.name}}</h2>
          <hr>
          <h5>Start date: {{startDate}}</h5>
          <h5>End date: {{doneTest.is_finished ? endDate : "-"}}</h5>
          <h5>Duration: {{duration}}</h5>
          <hr>
        </div>

        <h3 v-if="!doneTest.is_finished" class="bg-danger text-white">This test hasn't been finished yet!</h3>
        <template v-if="isResultAvailable">
          <div class="row">
            <div class="col-sm-4 py-1">
              <select class="float-lg-left" v-model="selectedContainer" title="Choose container">
                <option>All</option>
                <option v-for="id in Object.keys(this.testResults)" :key="id">{{id}}</option>
              </select>
            </div>
            <div class="col-sm-4 py-1">
              <button class="btn btn-success" @click="toggleCharts" title="Toggle software/hardware charts">
                View {{viewHardware ? "software" : "hardware"}} <font-awesome-icon icon="exchange-alt"/>
              </button>
            </div>
            <div class="col-sm-4 py-1">
              <button class="btn btn-primary float-sm-right" @click="refresh" title="Toggle software/hardware charts">
                Refresh <font-awesome-icon icon="sync-alt"/>
              </button>
            </div>
          </div>

          <hardware-parameters v-show="viewHardware" :results="testResults" :displayed_container="selectedContainer"></hardware-parameters>
          <software-parameters v-show="!viewHardware" :results="testResults" :displayed_container="selectedContainer"></software-parameters>

          <div class="row">
            <div class="col">
              <button class="float-lg-left btn btn-success" @click="downloadCSV" :disabled="downloadDisabled" title="Toggle software/hardware charts">
                Download CSV <font-awesome-icon icon="file-download"/>
              </button>
            </div>
            <div class="col">
              <button class="float-lg-right btn btn-success" @click="downloadJSON" :disabled="downloadDisabled" title="Toggle software/hardware charts">
                Download JSON <font-awesome-icon icon="file-download"/>
              </button>
            </div>
          </div>
        </template>
        <h3 v-else>There are no results available.</h3>
      </template>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import moment from 'moment';
import SoftwareParameters from "@/components/SoftwareParameters";
import HardwareParameters from "@/components/HardwareParameters";

export default {
  name: "TestResults",
  components: {HardwareParameters, SoftwareParameters},
  computed: {
    ...mapGetters(["doneTest"]),
    testResults: function () {
      const results = this.doneTest.results.flat().filter(function (result) {
        return result.num_sql_queries !== undefined
      });

      return results.reduce((prev, cur) => {
        if (!prev[cur['container_id']]) {
          prev[cur['container_id']] = [];
        }

        prev[cur['container_id']].push(cur);

        return prev;
      }, {});
    },
    isResultAvailable: function (){
      return Object.keys(this.testResults).length !== 0;
    },
    startDate: function (){
      return moment(this.doneTest.start_date).format(this.dateFormat);
    },
    endDate: function (){
      return moment(this.doneTest.end_date).format(this.dateFormat);
    },
    duration: function () {
      const start_date = new moment(this.doneTest.start_date);
      const end_date = this.doneTest.is_finished ? new moment(this.doneTest.end_date) : new moment();
      const duration = moment.duration(end_date.diff(start_date));
      const hours = Math.floor(duration.asHours()) < 10 ? "0" + Math.floor(duration.asHours()) : Math.floor(duration.asHours());
      const minutes = duration.minutes() < 10 ? "0" + duration.minutes() : duration.minutes();
      const seconds = duration.seconds() < 10 ? "0" + duration.seconds() : duration.seconds();
      const milis = duration.milliseconds();
      this.seconds;

      return `${hours}:${minutes}:${seconds}:${milis}`
    }
  },
  data(){
    return{
      dateFormat: "DD.MM.YYYY HH:mm:ss",
      timer: 0,
      seconds: 0,
      isComputing: false,
      selectedContainer: "All",
      viewHardware: false,
      downloadDisabled: false,
      refreshTimer: 0
    }
  },
  methods: {
    ...mapActions(["getDoneTest", "downloadTestResults", "downloadCsvTestResults"]),
    toggleCharts() {
      this.viewHardware = !this.viewHardware;
    },
    async downloadJSON(){
      this.downloadDisabled = true;
      try {
        let response = await this.downloadTestResults(this.$route.params.id);
        if (response.status !== 200) {
          alert(`${response.status}: ${response.data.error}`);
        } else {
          let fileURL = window.URL.createObjectURL(new Blob([JSON.stringify(response.data[0])], {type: "application/json"}));
          let fileLink = document.createElement('a');

          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'result.json');
          document.body.appendChild(fileLink);

          fileLink.click();
        }
      } catch (e) {
        console.log(e);
      }
      this.downloadDisabled = false;
    },
    async downloadCSV (){
      this.downloadDisabled = true;
      try {
        let response = await this.downloadCsvTestResults(this.$route.params.id);
        if (response.status !== 200) {
          alert(`${response.status}: ${response.data.error}`);
        } else {
          let fileURL = window.URL.createObjectURL(new Blob([response.data], {type: "application/csv"}));
          let fileLink = document.createElement('a');

          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'result.csv');
          document.body.appendChild(fileLink);

          fileLink.click();
        }
      } catch (e) {
        console.log(e);
      }
      this.downloadDisabled = false;
    },
    async refresh(){
      try {
        let response = await this.getDoneTest(this.$route.params.id);
        if(response.status !== 200)
          alert(`${response.status}: ${response.data.error}`);
      }catch(e){
        console.log(e);
      }
    }
  },
  async created() {
    this.isComputing = true;
    try {
      let response = await this.getDoneTest(this.$route.params.id);
      if(response.status !== 200){
        alert(`${response.status}: ${response.data.error}`);
      } else {
        this.timer = setInterval((function (){
          if(!this.doneTest.is_finished){
            this.seconds +=1;
          } else {
            clearInterval(this.timer);
          }
        }).bind(this), 1000);
        this.refreshTimer = setInterval((function (){
          this.refresh();
        }).bind(this), 1000 * 5);
      }
    }catch(e){
      console.log(e);
    }
    this.isComputing = false;
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.refreshTimer);
  }
}
</script>

<style scoped>

</style>