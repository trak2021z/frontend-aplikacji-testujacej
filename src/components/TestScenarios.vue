<template>
  <div class="main-container">
    <div class="vld-parent main-table">

      <h2>Test Scenarios</h2>
      <loading :active.sync="isComputing" :is-full-page="false"/>

      <template v-if="false">
        <h3 v-if="!isComputing">Oops... something went wrong!</h3>
      </template>

      <template v-else>
        <test-scenario-modal :is-visible="isTestScenarioModalVisible" :test-pk="this.testPk" @hide="closeModal"/>

        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Test Name</th>
              <th scope="col">Test Description</th>
              <th scope="col">Test Actions Amount</th>
              <th scope="col">Show Test</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(test, index) in pageOfTestScenarios" :key="test.pk">
              <td>{{ currentPage * 10 + index + 1 - 10}}</td>
              <td>{{ test.name }}</td>
              <td>{{ test.description }}</td>
              <td>{{ test.stockAmount }}</td>
              <td>
                <span style="cursor: pointer" @click="showBuySellModal(test.pk)">
                  <font-awesome-icon icon="search-plus"/>
                </span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <hr>
        <paginator :items="tests"
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
import TestScenarioModal from "@/components/TestScenarioModal";
import Paginator from "@/components/Paginator";

export default {
  name: "TestsScenarios",
  components: {Paginator, TestScenarioModal},
  data() {
    return {
      testPk: 1,
      customLabels: {
        first: '<<',
        last: '>>',
        previous: '<',
        next: '>'
      },
      tests: [
        {
          pk: "1",
          name: "testName",
          description: "testDescription",
          stockAmount: "5",
        },
        {
          pk: "2",
          name: "testName",
          description: "testDescription",
          stockAmount: "4",
        },
        {
          pk: "3",
          name: "testName",
          description: "testDescription",
          stockAmount: "21",
        },
        {
          pk: "4",
          name: "testName",
          description: "testDescription",
          stockAmount: "1",
        },
        {
          pk: "5",
          name: "testName",
          description: "testDescription",
          stockAmount: "11",
        },
        {
          pk: "6",
          name: "testName",
          description: "testDescription",
          stockAmount: "8",
        },
        {
          pk: "7",
          name: "testName",
          description: "testDescription",
          stockAmount: "9",
        },
        {
          pk: "8",
          name: "testName",
          description: "testDescription",
          stockAmount: "3",
        },
        {
          pk: "9",
          name: "testName",
          description: "testDescription",
          stockAmount: "12",
        },
        {
          pk: "10",
          name: "testName",
          description: "testDescription",
          stockAmount: "20",
        },
        {
          pk: "11",
          name: "testName",
          description: "testDescription",
          stockAmount: "8",
        },
        {
          pk: "12",
          name: "testName",
          description: "testDescription",
          stockAmount: "4",
        },
        {
          pk: "13",
          name: "testName",
          description: "testDescription",
          stockAmount: "2",
        },
        {
          pk: "14",
          name: "testName",
          description: "testDescription",
          stockAmount: "7",
        },
        {
          pk: "15",
          name: "testName",
          description: "testDescription",
          stockAmount: "9",
        },
      ],
      isTestScenarioModalVisible: false,
      isComputing: false,
      pageOfTestScenarios: null,
      currentPage: 1,
      paginatorKey: 0
    }
  },
  methods: {
    onChangePage(pageOfItems, page){
      this.currentPage = page;
      this.pageOfTestScenarios = pageOfItems;
    },
    showBuySellModal(testPk) {
      this.testPk = testPk;
      this.isTestScenarioModalVisible = true;
    },
    closeModal() {
      this.isTestScenarioModalVisible = false;
      this.paginatorKey += 1;
    }
  }
}
</script>