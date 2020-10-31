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
            <tr v-for="(test, index) in pageOfDoneTests" :key="test.pk">
              <td>{{ currentPageFirstIndex + index }}</td>
              <td>{{ test.name }}</td>
              <td>{{ test.num_users }}</td>
              <td>{{ test.start_date }}</td>
              <td>{{ test.end_date }}</td>
              <td>
                <router-link :to="'/test/done/' + 1">
                  <font-awesome-icon icon="chart-line"/>
                </router-link>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <hr>
        <paginator :items="allDoneTests"
                   :maxPages="4"
                   :initialPage="currentPage"
                   :labels="customLabels"
                   :key="paginatorKey"
                   @changePage="onChangePage"
        />
      </template>
    </div>
  </div>
</template>

<script>
import Paginator from "@/components/Paginator";

export default {
  name: "DoneTests",
  components: {Paginator},
  data() {
    return {
      customLabels: {
        first: '<<',
        last: '>>',
        previous: '<',
        next: '>'
      },
      allDoneTests: [
        {
          pk: "1",
          name: "testName",
          description: "testDescription",
          num_users: "5",
          start_date: "15.05.2020 17:47:31",
          end_date: "15.05.2020 19:41:15"
        },
        {
          pk: "2",
          name: "testName",
          description: "testDescription",
          num_users: "4",
          start_date: "15.05.2020 17:47:31",
          end_date: "15.05.2020 19:41:15"
        },
        {
          pk: "3",
          name: "testName",
          description: "testDescription",
          num_users: "21",
          start_date: "15.05.2020 17:47:31",
          end_date: "15.05.2020 19:41:15"
        },
        {
          pk: "4",
          name: "testName",
          description: "testDescription",
          num_users: "1",
          start_date: "15.05.2020 17:47:31",
          end_date: "15.05.2020 19:41:15"
        },
        {
          pk: "5",
          name: "testName",
          description: "testDescription",
          num_users: "11",
          start_date: "15.05.2020 17:47:31",
          end_date: "15.05.2020 19:41:15"
        },
        {
          pk: "6",
          name: "testName",
          description: "testDescription",
          num_users: "8",
          start_date: "15.05.2020 17:47:31",
          end_date: "15.05.2020 19:41:15"
        },
        {
          pk: "7",
          name: "testName",
          description: "testDescription",
          num_users: "9",
          start_date: "15.05.2020 17:47:31",
          end_date: "15.05.2020 19:41:15"
        },
        {
          pk: "8",
          name: "testName",
          description: "testDescription",
          num_users: "3",
          start_date: "15.05.2020 17:47:31",
          end_date: "15.05.2020 19:41:15"
        },
        {
          pk: "9",
          name: "testName",
          description: "testDescription",
          num_users: "12",
          start_date: "15.05.2020 17:47:31",
          end_date: "15.05.2020 19:41:15"
        },
        {
          pk: "10",
          name: "testName",
          description: "testDescription",
          num_users: "20",
          start_date: "15.05.2020 17:47:31",
          end_date: "15.05.2020 19:41:15"
        },
        {
          pk: "11",
          name: "testName",
          description: "testDescription",
          num_users: "8",
          start_date: "15.05.2020 17:47:31",
          end_date: "15.05.2020 19:41:15"
        },
        {
          pk: "12",
          name: "testName",
          description: "testDescription",
          num_users: "4",
          start_date: "15.05.2020 17:47:31",
          end_date: "15.05.2020 19:41:15"
        },
        {
          pk: "13",
          name: "testName",
          description: "testDescription",
          num_users: "2",
          start_date: "15.05.2020 17:47:31",
          end_date: "15.05.2020 19:41:15"
        },
        {
          pk: "14",
          name: "testName",
          description: "testDescription",
          num_users: "7",
          start_date: "15.05.2020 17:47:31",
          end_date: "15.05.2020 19:41:15"
        },
        {
          pk: "15",
          name: "testName",
          description: "testDescription",
          num_users: "9",
          start_date: "15.05.2020 17:47:31",
          end_date: "15.05.2020 19:41:15"
        },
      ],
      isTestScenarioModalVisible: false,
      isComputing: false,
      pageOfDoneTests: null,
      currentPage: 1,
      currentPageFirstIndex: 1,
      paginatorKey: 0
    }
  },
  methods: {
    onChangePage(pageOfItems, page, currentPageFirstIndex){
      this.currentPage = page;
      this.pageOfDoneTests = pageOfItems;
      this.currentPageFirstIndex = currentPageFirstIndex;
    },
  }
}
</script>