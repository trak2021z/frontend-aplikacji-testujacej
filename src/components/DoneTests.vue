<template>
  <div class="main-container">
    <div class="vld-parent main-table">

      <div class="row">
        <div class="col-sm-4 py-1">

        </div>
        <div class="col-sm-4 py-1">
          <h2>Done Tests</h2>
        </div>
        <div class="col-sm-4 py-1">
          <button class="btn btn-primary float-sm-right" @click="refresh" title="Toggle software/hardware charts">
            Refresh <font-awesome-icon icon="sync-alt"/>
          </button>
        </div>
      </div>

      <loading :active.sync="isComputing" :is-full-page="false"/>

      <template v-if="!allDoneTests">
        <h3 v-if="!isComputing">Oops... something went wrong!</h3>
      </template>

      <template v-else>

        <div class="table-responsive" :key="paginatorKeyChange">
          <table class="table table-hover">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Test Name</th>
              <th scope="col">Amount of Users</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Results</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(doneTest, index) in pageOfDoneTests" :key="doneTest.id">
              <td>{{ currentPageFirstIndex + index }}</td>
              <td>{{doneTest.name}}</td>
              <td>{{ doneTest.num_users }}</td>
              <td>{{ doneTest.start_date }}</td>
              <td>{{ doneTest.is_finished ? doneTest.end_date : "-" }}</td>
              <td>
                <router-link v-if="Array.isArray(doneTest.results) && doneTest.results.length !==0" :to="'/test/done/' + doneTest.id">
                  <font-awesome-icon icon="chart-line" title="Show test results"/>
                </router-link>
                <font-awesome-icon v-else icon="hourglass-half" title="Test still in process..."/>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <hr>
        <paginator :items="allDoneTests"
                   :maxPages="4"
                   :initialPage="currentPage"
                   :key="paginatorKey"
                   @changePage="onChangePage"
        />
      </template>
    </div>
  </div>
</template>

<script>
import Paginator from "@/components/Paginator";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "DoneTests",
  components: {Paginator},
  computed: {
    ...mapGetters(["allDoneTests"]),
    paginatorKeyChange: function (){
      this.allDoneTests;
      this.incrementPaginatorKey();
      return 0;
    }
  },
  data() {
    return {
      isTestScenarioModalVisible: false,
      isComputing: false,
      pageOfDoneTests: null,
      currentPage: 1,
      currentPageFirstIndex: 1,
      paginatorKey: 0
    }
  },
  methods: {
    ...mapActions(["getDoneTests"]),
    onChangePage(pageOfItems, page, currentPageFirstIndex){
      this.currentPage = page;
      this.pageOfDoneTests = pageOfItems;
      this.currentPageFirstIndex = currentPageFirstIndex;
    },
    incrementPaginatorKey(){
      this.paginatorKey += 1;
    },
    async refresh(){
      try {
        let response = await this.getDoneTests();
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
      let response = await this.getDoneTests();
      if(response.status !== 200){
        alert(`${response.status}: ${response.data.error}`);
      } else {
        this.timer = setInterval((function (){
          this.refresh();
        }).bind(this), 1000 * 60);
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