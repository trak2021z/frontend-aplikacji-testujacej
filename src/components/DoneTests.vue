<template>
  <div class="main-container">
    <div class="vld-parent main-table">

      <h2>Done Tests</h2>
      <loading :active.sync="isComputing" :is-full-page="false"/>

      <template v-if="!allDoneTests">
        <h3 v-if="!isComputing">Oops... something went wrong!</h3>
      </template>

      <template v-else>

        <div class="table-responsive">
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
            <tr v-for="(doneTest, index) in pageOfDoneTests" :key="doneTest.pk">
              <td>{{ currentPageFirstIndex + index }}</td>
              <td>{{ doneTest.test.name }}</td>
              <td>{{ doneTest.num_users }}</td>
              <td>{{ doneTest.start_date }}</td>
              <td>{{ doneTest.end_date }}</td>
              <td>
                <router-link v-if="doneTest.is_finished" :to="'/test/done/' + doneTest.pk">
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
  computed: mapGetters(["allDoneTests"]),
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
  },
  async created() {
    this.isComputing = true;
    try {
      let response = await this.getDoneTests();
      if(response.status !== 200){
        alert(`${response.status}: ${response.data.error}`);
      } else {
        setInterval((function (){
          this.getDoneTests();
          this.paginatorKey += 1;
        }), 1000 * 60);
      }
    }catch(e){
      console.log(e);
    }
    this.isComputing = false;
  }
}

// allDoneTests: [
//   {
//     pk: "1",
//     name: "testName",
//     description: "testDescription",
//     num_users: "5",
//     start_date: "15.05.2020 17:47:31",
//     end_date: "15.05.2020 19:41:15",
//     is_finished: false
//   },
//   {
//     pk: "2",
//     name: "testName",
//     description: "testDescription",
//     num_users: "4",
//     start_date: "15.05.2020 17:47:31",
//     end_date: "15.05.2020 19:41:15",
//     is_finished: false
//   },
//   {
//     pk: "3",
//     name: "testName",
//     description: "testDescription",
//     num_users: "21",
//     start_date: "15.05.2020 17:47:31",
//     end_date: "15.05.2020 19:41:15",
//     is_finished: true
//   },
//   {
//     pk: "4",
//     name: "testName",
//     description: "testDescription",
//     num_users: "1",
//     start_date: "15.05.2020 17:47:31",
//     end_date: "15.05.2020 19:41:15",
//     is_finished: true
//   },
//   {
//     pk: "5",
//     name: "testName",
//     description: "testDescription",
//     num_users: "11",
//     start_date: "15.05.2020 17:47:31",
//     end_date: "15.05.2020 19:41:15",
//     is_finished: true
//   },
//   {
//     pk: "6",
//     name: "testName",
//     description: "testDescription",
//     num_users: "8",
//     start_date: "15.05.2020 17:47:31",
//     end_date: "15.05.2020 19:41:15",
//     is_finished: true
//   },
//   {
//     pk: "7",
//     name: "testName",
//     description: "testDescription",
//     num_users: "9",
//     start_date: "15.05.2020 17:47:31",
//     end_date: "15.05.2020 19:41:15",
//     is_finished: true
//   },
//   {
//     pk: "8",
//     name: "testName",
//     description: "testDescription",
//     num_users: "3",
//     start_date: "15.05.2020 17:47:31",
//     end_date: "15.05.2020 19:41:15",
//     is_finished: true
//   },
//   {
//     pk: "9",
//     name: "testName",
//     description: "testDescription",
//     num_users: "12",
//     start_date: "15.05.2020 17:47:31",
//     end_date: "15.05.2020 19:41:15",
//     is_finished: true
//   },
//   {
//     pk: "10",
//     name: "testName",
//     description: "testDescription",
//     num_users: "20",
//     start_date: "15.05.2020 17:47:31",
//     end_date: "15.05.2020 19:41:15",
//     is_finished: true
//   },
//   {
//     pk: "11",
//     name: "testName",
//     description: "testDescription",
//     num_users: "8",
//     start_date: "15.05.2020 17:47:31",
//     end_date: "15.05.2020 19:41:15",
//     is_finished: true
//   },
//   {
//     pk: "12",
//     name: "testName",
//     description: "testDescription",
//     num_users: "4",
//     start_date: "15.05.2020 17:47:31",
//     end_date: "15.05.2020 19:41:15",
//     is_finished: true
//   },
//   {
//     pk: "13",
//     name: "testName",
//     description: "testDescription",
//     num_users: "2",
//     start_date: "15.05.2020 17:47:31",
//     end_date: "15.05.2020 19:41:15",
//     is_finished: true
//   },
//   {
//     pk: "14",
//     name: "testName",
//     description: "testDescription",
//     num_users: "7",
//     start_date: "15.05.2020 17:47:31",
//     end_date: "15.05.2020 19:41:15",
//     is_finished: true
//   },
//   {
//     pk: "15",
//     name: "testName",
//     description: "testDescription",
//     num_users: "9",
//     start_date: "15.05.2020 17:47:31",
//     end_date: "15.05.2020 19:41:15",
//     is_finished: true
//   },
// ],
</script>