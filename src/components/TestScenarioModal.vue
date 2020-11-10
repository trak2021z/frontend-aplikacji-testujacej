<template>
  <div class="modal fade" id="modalTestScenario" tabindex="-1" role="dialog" aria-labelledby="buySellStockModal"
       aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title w-100 font-weight-bold">Test Scenario Actions</h4>
          <button @click="hide" type="button" class="close position-absolute" style="right:4%" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {{getTestScenario}}
        <div class="modal-body mx-3">
          <test-tree-item
              class="item"
              :item="treeData"
          ></test-tree-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jQuery from 'jquery';
import TestTreeItem from "@/components/TestTreeItem";
import {mapActions, mapGetters} from "vuex";

window.$ = window.jQuery = jQuery;

export default {
  name: "BuySellModal",
  components: {TestTreeItem},
  computed: {
    ...mapGetters(["getTestScenario"])
  },
  data() {
    return {
      treeData: {
        name: "Register",
        children: [
          { name: "Log in" },
          {
            name: "Buy Action",
            children: [
              {
                name: "Sell Action",
                children: [{ name: "Log out" }, { name: "Log in" }]
              },
              { name: "Create Offer" },
              { name: "Cancel Offer" },
              {
                name: "Create Offer",
                children: [{ name: "Check if Offer Changed Status" }, { name: "Log out" }]
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(["getTestScenarioById"]),
    show() {
      jQuery('#modalTestScenario').modal()
    },
    hide() {
      this.$emit('hide');
      jQuery('#modalTestScenario').modal('hide');
    },
    async getNewScenario() {
      this.isComputing = true;
      try {
        let response = await this.getTestScenarioById(this.testPk);
        if(response.status !== 200){
          alert(`${response.status}: ${response.data.error}`);
        }
      }catch(e){
        console.log(e);
      }
      this.isComputing = false;
    }
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    testPk: {
      required: true
    }
  },
  watch: {
    isVisible: async function(newVal) {
      if(newVal){
        //await this.getNewScenario();
        this.show();
      }
    }
  },
  async created() {
    //await this.getNewScenario();
  },
}
</script>