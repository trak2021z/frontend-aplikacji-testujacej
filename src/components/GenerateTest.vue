<template>
    <div class="main-container">
    <div class="main-table">
      <h2>Generate test</h2>
      <form>
        <div class="form-group">
          <div class="row">
            <label for="sel_test_type">Test Type</label>
            <select name="sel_test_type" v-model="selectedTest" @change="onChange" class="browser-default custom-select">
                <option v-for="(item, index) in tests" v-bind:value="index" :key="item.id"> {{ item.name }} </option>
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
                <span v-else-if="!$v.edt_users.numeric">User Amount must be a numeric value</span>
                <span v-if="!$v.edt_users.minValue">User Amount must be a positive number</span>
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
                <span v-else-if="!$v.edt_queries.numeric">Test Queries amount must be numeric value</span>
                <span v-if="!$v.edt_queries.minValue">Test Queries amount must be a positive number</span>
            </div>
          </div><br>
          <div class="row">
            <input @click="submit" type="button" class="btn btn-success btn-lg btn-block" value="Start Test"/>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {required, numeric, minValue} from "vuelidate/lib/validators";
export default {
    data() {
    return {
        selectedTest : 1,
        edt_users: null,
        edt_queries: null,
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
    }
  },
  methods: {
    onChange(){
        console.log('Offer type selected: ', this.selectedOfferType);
    },
    onChangeStock(){
        console.log('Stock selected: ', this.selectedStock);
    },
    submit() {
    }
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