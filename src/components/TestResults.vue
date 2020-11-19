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
          <h5>Start date: {{doneTest.start_date}}</h5>
          <h5>End date: {{doneTest.is_finished ? doneTest.end_date : "-"}}</h5>
          <h5>Duration: {{duration}}</h5>
          <hr>
        </div>

        <h3 v-if="!doneTest.is_finished">This test hasn't been finished yet!</h3>
        <h3 v-else-if="!testResults">Results for this test are unavailable!</h3>
        <template v-else>
          <div class="row">
            <div class="col-sm-6 py-1">
              <select class="float-lg-left" v-model="selectedContainer" title="Choose container">
                <option>All</option>
                <option v-for="id in Object.keys(this.testResults)" :key="id">{{id}}</option>
              </select><br>
            </div>
            <div class="col-sm-6 py-1">
              <button class="float-lg-right btn btn-success" @click="toggleCharts" title="Toggle software/hardware charts">
                View {{viewHardware ? "software" : "hardware"}} <font-awesome-icon icon="retweet"/>
              </button><br>
            </div>
          </div>

          <hardware-parameters v-show="viewHardware" :results="testResults" :displayed_container="selectedContainer"></hardware-parameters>
          <software-parameters v-show="!viewHardware" :results="testResults" :displayed_container="selectedContainer"></software-parameters>

          <div class="row">
            <div class="col">
              <button class="float-lg-right btn btn-success" @click="downloadJSON" :disabled="downloadDisabled" title="Toggle software/hardware charts">
                Download JSON <font-awesome-icon icon="file-download"/>
              </button>
            </div>
          </div>
        </template>
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
      const results = this.doneTest.results.flat();

      return results.reduce((prev, cur) => {
        if (!prev[cur['container_id']]) {
          prev[cur['container_id']] = [];
        }

        prev[cur['container_id']].push(cur);

        return prev;
      }, {});
    },
    duration: function () {
      const start_date = new moment(this.doneTest.start_date, this.dateFormat);
      const end_date = this.doneTest.is_finished ? new moment(this.doneTest.end_date, this.dateFormat) : new moment();
      const duration = moment.duration(end_date.diff(start_date));
      const hours = Math.floor(duration.asHours()) < 10 ? "0"+Math.floor(duration.asHours()) : Math.floor(duration.asHours());
      const minutes = duration.minutes() < 10 ? "0" + duration.minutes() : duration.minutes();
      const seconds = duration.seconds() < 10 ? "0" + duration.seconds() : duration.seconds();
      this.seconds;

      return `${hours}:${minutes}:${seconds}`
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
      downloadDisabled: false
    }
  },
  methods: {
    ...mapActions(["getDoneTest", "downloadTestResults"]),
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
          var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: "application/json"}));
          var fileLink = document.createElement('a');

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
    beforeDestroy() {
      clearInterval(this.timer);
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
        }).bind(this), 1000)
      }
    }catch(e){
      console.log(e);
    }
    this.isComputing = false;
  },
}
</script>

<style scoped>

</style>