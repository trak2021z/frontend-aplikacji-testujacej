<template>
  <div>
    <template v-if="this.getTestScenario === null">
    </template>

    <template v-else>
      <div class="modal fade" id="modalTestScenario" tabindex="-1" role="dialog" aria-labelledby="buySellStockModal"
           aria-hidden="true" data-keyboard="false" data-backdrop="static">
        <div style="max-width: 600px" class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title w-100 font-weight-bold">Test Scenario Actions</h4>
              <button @click="hide" type="button" class="close position-absolute" style="right:4%" data-dismiss="modal"
                      aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body mx-3">
              <test-tree-item
                  v-for="(branch) in treeData" :key="branch.value.Id"
                  class="item"
                  :item="branch"
              ></test-tree-item>
            </div>
          </div>
        </div>
      </div>
    </template>
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
      isComputing: null,
      treeData: null,
      arrayOfEndpointsIds: null,
    }
  },
  methods: {
    ...mapActions(["getTestScenarioById"]),
    buildHierarchy(arry) {

      var roots = [], children = {};

      for (var i = 0, len = arry.length; i < len; ++i) {
        var item = arry[i],
            p = item.Parent,
            target = !p ? roots : (children[p] || (children[p] = []));

        target.push({value: item});
      }

      var findChildren = function (parent) {
        if (children[parent.value.Id]) {
          parent.children = children[parent.value.Id];
          for (var i = 0, len = parent.children.length; i < len; ++i) {
            findChildren(parent.children[i]);
          }
        }
      };

      for (i = 0, len = roots.length; i < len; ++i) {
        findChildren(roots[i]);
      }

      return roots;
    },
    buildTreeData() {
      let arrayOfEndpoints = this.getTestScenario.endpoints.map(function (e) {
        if (e.order === 0) {
          return {"Id": e.id.toString(), "Name": e.name, "Parent": ""}
        } else {
          return {"Id": e.id.toString(), "Name": e.name, "Parent": e.order}
        }
      });

      for (let i = 0; i < arrayOfEndpoints.length; i++) {
        let id = 9999;
        if (arrayOfEndpoints[i].Parent.length > 1) {
          for (let j = arrayOfEndpoints[i].Parent.length - 1; j > 0; j--) {
            let removedId = arrayOfEndpoints[i].Parent.splice(-1,1);
            let object = {"Id": (id--).toString(), "Name": arrayOfEndpoints[i].Name, "Parent": [removedId]}
            arrayOfEndpoints.push(object);
          }
        }
      }

      arrayOfEndpoints = arrayOfEndpoints.map(function (e) {
          return {"Id": e.Id, "Name": e.Name, "Parent": e.Parent.toString(), "Closed": false}
      });

      let arrayOfEndpointsIds = [];

      arrayOfEndpointsIds = arrayOfEndpoints.map(function (e) {
            return e.Id;
          }
      );

      arrayOfEndpointsIds = arrayOfEndpointsIds.filter((v, i, a) => a.indexOf(v) === i);
      arrayOfEndpointsIds = arrayOfEndpointsIds.sort();

      this.arrayOfEndpointsIds = arrayOfEndpointsIds;

      for (let i = 0; i < this.arrayOfEndpointsIds.length; i++) {
        for (let j = 0; j < this.arrayOfEndpointsIds.length; j++) {
          if (arrayOfEndpoints[j].Id === this.arrayOfEndpointsIds[i]) {
            let parent = arrayOfEndpointsIds.indexOf(arrayOfEndpoints[j].Parent)
            if (parent === -1) {
              arrayOfEndpoints[j].Parent = "";
            } else {
              arrayOfEndpoints[j].Parent = (parent + 1).toString();
            }
            arrayOfEndpoints[j].Id = (i + 1).toString();
          }
        }
      }

      this.treeData = this.buildHierarchy(arrayOfEndpoints);
    },
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
        if (response.status !== 200) {
          alert(`${response.status}: ${response.data.error}`);
        }
      } catch (e) {
        console.log(e);
      }
      this.buildTreeData();
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
    isVisible: async function (newVal) {
      if (newVal) {
        await this.getNewScenario();
        this.show();
      }
    }
  },
  async created() {
  },
}
</script>