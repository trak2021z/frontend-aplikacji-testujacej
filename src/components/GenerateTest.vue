<template>
    <div class="main-container">
    <div class="main-table">
      <h2>Generate Test</h2>

     <loading :active.sync="isComputing" :is-full-page="false"/>
     
      <template v-if="!getTests">
        <h3 v-if="!isComputing">Oops... something went wrong!</h3>
      </template>

      <template v-else>
      <test-progress-modal :is-visible="isTestProgressModalVisible" 
      :test-obj="this.tests[this.selectedTest]" :test-users="this.edt_users" :test-amount="this.edt_queries" @hide="closeModal"/>

      <form>
        <div class="form-group">
          <div class="row">
            <label for="sel_test_type">Test Type</label>
            <select name="sel_test_type" v-model="selectedTest" @change="onChange" class="browser-default custom-select">
                <option v-for="(test, index) in this.tests=getTests" v-bind:value="index" :key="test.pk"> {{ test.name }} </option>
            </select>
          </div><br>
          <div class="row">
            <label v-if="edt_users != null" for="edt_users">User Amount</label>
            <input type="number" name="edt_users" v-model="edt_users" @change="onChange" min="1" step="1"
             value=null class="form-control" placeholder="User Amount"
             v-model.trim="$v.edt_users.$model"
             :class="{'is-invalid':$v.edt_users.$error, 'is-valid':!$v.edt_users.$invalid }">
            <div class="invalid-feedback">
                <span v-if="!$v.edt_users.required">User Amount is required</span>
                <span v-else-if="!$v.edt_users.minValue">User Amount must be a positive number</span>
                <span v-else-if="!$v.edt_users.numeric">User Amount must be a numeric value</span>
            </div>
          </div><br>
          <div class="row">
            <label v-if="edt_queries != null" for="edt_queries">Test Queries</label>
            <input type="number" name="edt_queries" v-model="edt_queries" @change="onChange" min="1" step="1"
             value=null class="form-control" placeholder="Test Queries"
             v-model.trim="$v.edt_queries.$model"
             :class="{'is-invalid':$v.edt_queries.$error, 'is-valid':!$v.edt_queries.$invalid }">
            <div class="invalid-feedback">
                <span v-if="!$v.edt_queries.required">Test Queries are required</span>
                <span v-else-if="!$v.edt_queries.minValue">Test Queries amount must be a positive number</span>
                <span v-else-if="!$v.edt_queries.numeric">Test Queries amount must be a numeric value</span>
            </div>
          </div><br>
          <div class="row">
            <input @click="showModal()" type="button" class="btn btn-success btn-lg btn-block" value="Start Test"/>
          </div>
        </div>
      </form>

      </template>

    </div>
  </div>
</template>

<script>
import {required, numeric, minValue} from "vuelidate/lib/validators";
import TestProgressModal from "@/components/TestProgressModal";
import {mapGetters, mapActions} from "vuex";

export default {
    name: "GenerateTests",
    computed: {
    ...mapGetters(["getTests"])
    },
    components: {TestProgressModal},
    data() {
    return {
        testObj: null,
        isTestProgressModalVisible: false,
        selectedTest : 1,
        edt_users: null,
        edt_queries: null,
        isComputing: false,
        tests: {
          pk: "0",
          name: "testName",
          description: "testDescription",
          stockAmount: "1",
        },
    }
  },
  methods: {
    ...mapActions(["getAllTests"]),
    onChange(){},
    showModal() {
        this.$v.$touch();
        if (this.$v.$invalid) {
            alert('Fill all fields correctly before generating a test')
        } 
        else{
            this.isTestProgressModalVisible = true;
        }
    },
    closeModal() {
      this.isTestProgressModalVisible = false;
    }
  },
  async created() {
    this.isComputing = true;
    await this.getAllTests();
    this.isComputing = false;
  },
  validations: {
        edt_users:{
          required,
          numeric,
          minValue: minValue(1)
        },
        edt_queries:{
          required,
          numeric,
          minValue: minValue(1),
        }
    }
}
</script> 