<template>
  <div class="main-container">
    <div class="vld-parent main-table">

      <loading :active.sync="isComputing" :is-full-page="false"/>

      <template v-if="!doneTest">
        <h3 v-if="!isComputing">Oops... something went wrong!</h3>
      </template>

      <template v-else>
        <div class="text-left">
          <h2 class="text-left">Results of {{doneTest.test.name}}</h2><hr>
          <h5>Start date: {{doneTest.start_date}}</h5>
          <h5>End date: {{doneTest.is_finished ? doneTest.end_date : "-"}}</h5>
          <h5>Duration: {{duration}}</h5>
        </div>

        <h3 v-if="!doneTest.is_finished">This test hasn't been finished yet!</h3>

        <template v-else>
          <br/><h4 class="text-dark">Czy cała grupa L2 zasługuje na ocenę 5.0?</h4>
          <pie-chart :data="[['Tak', 23], ['Oczywiście, że tak!', 51], ['Jakżeby inaczej?', 125]]" :download="true"></pie-chart>
        </template>
      </template>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import moment from 'moment';

export default {
  name: "TestResults",
  computed: {
    ...mapGetters(["doneTest"]),
    testResults: function () {
      return this.doneTest.results;
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
    }
  },
  methods: {
    ...mapActions(["getDoneTest"])
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
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style scoped>

</style>