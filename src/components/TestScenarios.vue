<template>
  <div class="main-container">
    <div class="vld-parent main-table">

      <h2>Test Scenarios</h2>
      <loading :active.sync="isComputing" :is-full-page="false"/>

      <template v-if="!getTests">
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
              <td>{{ currentPageFirstIndex + index }}</td>
              <td>{{ test.name }}</td>
              <td>{{ test.description }}</td>
              <td>{{ test.endpoints_count }}</td>
              <td>
                <span style="cursor: pointer" @click="showBuySellModal(test.id)">
                  <font-awesome-icon icon="search-plus"/>
                </span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <hr>
        <paginator :items="this.getTests"
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
import TestScenarioModal from "@/components/TestScenarioModal";
import Paginator from "@/components/Paginator";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "TestsScenarios",
  components: {Paginator, TestScenarioModal},
  computed: {
    ...mapGetters(["getTests"])
  },
  data() {
    return {
      testPk: 5,
      isTestScenarioModalVisible: false,
      isComputing: false,
      pageOfTestScenarios: null,
      currentPage: 1,
      currentPageFirstIndex: 1,
      paginatorKey: 0
    }
  },
  methods: {
    ...mapActions(["getAllTests"]),
    onChangePage(pageOfItems, page, currentPageFirstIndex){
      this.currentPage = page;
      this.pageOfTestScenarios = pageOfItems;
      this.currentPageFirstIndex = currentPageFirstIndex;
    },
    showBuySellModal(testPk) {
      this.testPk = testPk;
      this.isTestScenarioModalVisible = true;
    },
    closeModal() {
      this.isTestScenarioModalVisible = false;
      this.paginatorKey += 1;
    }
  },
  async created() {
    this.isComputing = true;
    try {
      let response = await this.getAllTests();
      if(response.status !== 200){
        alert(`${response.status}: ${response.data.error}`);
      }
    }catch(e){
      console.log(e);
    }
    this.isComputing = false;
  },
}
</script>