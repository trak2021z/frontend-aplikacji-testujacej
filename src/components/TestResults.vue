<template>
  <div class="main-container">
    <div class="vld-parent main-table">

      <loading :active.sync="isComputing" :is-full-page="false"/>

      <div v-if="test" class="text-left">
        <h2 class="text-left">Results of {{test.name}}</h2><hr>
        <h5>Start date: {{test.start_date}}</h5>
        <h5>End date: {{test.end_date}}</h5>
        <h5>Duration: {{duration}}</h5>
      </div>

      <template v-if="!testResults">
        <h3 v-if="!isComputing">Oops... something went wrong!</h3>
      </template>

      <template v-else>

        <br/><h4 class="text-dark">Przypadki zareżenia COVID-19 w Polsce w Październiku 2020</h4>
        <line-chart :data="testResults" :download="true" xtitle="Date" ytitle="Cases"></line-chart>

        <br/><h4 class="text-dark">Czy cała grupa L2 zasługuje na ocenę 5.0?</h4>
        <pie-chart :data="[['Tak', 23], ['Oczywiście, że tak!', 51], ['Jakżeby inaczej?', 125]]" :download="true"></pie-chart>

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
    ...mapGetters(["getTest"]),
    testResults: function () {
      if(this.getTest){
        return Object.fromEntries(this.getTest.map(function (item) {return [item.Date , item.Cases] }));
      }
      return null;
    },
    duration: function () {
      const start_date = new moment(this.test.start_date, this.dateFormat);
      const end_date = new moment(this.test.end_date, this.dateFormat);
      const duration = moment.duration(end_date.diff(start_date));

      return `${Math.floor(duration.asHours())}:${duration.minutes()}:${duration.seconds()}`
    }
  },
  data(){
    return{
      dateFormat: "DD.MM.YYYY hh:mm:ss",
      test: {
        pk: "1",
        name: "testName",
        description: "testDescription",
        users_amount: "5",
        start_date: "13.05.2020 17:47:31",
        end_date: "15.05.2020 19:41:15"
      },
      isComputing: false,
    }
  },
  methods: {
    ...mapActions(["getTestAction"])
  },
  async created() {
    this.isComputing = true;
    try {
      let response = await this.getTestAction();
      if(response.status !== 200){
        alert(`${response.status}: ${response.data.error}`);
      }
    }catch(e){
      console.log(e);
    }
    this.isComputing = false;
  }
}
</script>

<style scoped>

</style>