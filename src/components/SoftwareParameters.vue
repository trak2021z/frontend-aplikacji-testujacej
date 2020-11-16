<template>
  <div class="container-fluid table-responsive">
    <h3>Software parameters</h3><br>

    <template v-if="displayed_container === 'All'">
      <h5>Views rendering time</h5>
      <column-chart :data="getAllContainers('time_taken')" suffix=" ms" :round="precision"></column-chart><br>

      <h5>Time spent on SQL Queries</h5>
      <column-chart :data="getAllContainers('time_spent_on_sql_queries')" suffix=" ms" :round="precision"></column-chart><br>
    </template>

    <template v-else>
      <div class="row">
        <div class="col-sm-6">
          <h5>Number of SQL Queries</h5>
          <column-chart :data="getContainers('num_sql_queries')"></column-chart><br>
        </div>
        <div class="col-sm-6">
          <h5>Time spent on SQL Queries</h5>
          <column-chart :data="getContainers('time_spent_on_sql_queries')" suffix=" ms" :round="precision"></column-chart><br>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <h5>Views rendering time</h5>
          <column-chart :data="getContainers('time_taken')" suffix=" ms" :round="precision"></column-chart><br>
        </div>
      </div>

      <br>

      <table class="table table-hover">
        <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Average</th>
          <th scope="col">Total</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">SQL queries</th>
          <td>{{avg(sqlQueries).toFixed(precision)}}</td>
          <td>{{total(sqlQueries)}}</td>
        </tr>
        <tr>
          <th scope="row">Time spent on SQL queries</th>
          <td>{{avg(sqlQueriesTimes).toFixed(precision)}}<i>ms</i></td>
          <td>{{total(sqlQueriesTimes).toFixed(precision)}}<i>ms</i></td>
        </tr>
        <tr>
          <th scope="row">View rendering time</th>
          <td>{{avg(viewsTimes).toFixed(precision)}}<i>ms</i></td>
          <td>{{total(viewsTimes).toFixed(precision)}}<i>ms</i></td>
        </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
export default {
  name: "SoftwareParameters",
  props: ["data", "displayed_container"],
  data(){
    return{
      precision: 3,
    }
  },
  computed: {
    results: function (){
      return this.data.reduce((prev, cur) => {
        if (!prev[cur['container_id']]) {
          prev[cur['container_id']] = [];
        }

        prev[cur['container_id']].push(cur);

        return prev;
      }, {});
    },
    sqlQueries: function (){
      return this.getArrayWithValues(this.results[this.displayed_container], "num_sql_queries")
    },
    sqlQueriesTimes: function (){
      return this.getArrayWithValues(this.results[this.displayed_container], "time_spent_on_sql_queries")
    },
    viewsTimes: function (){
      return this.getArrayWithValues(this.results[this.displayed_container], "time_taken")
    },
  },
  methods: {
    total(arrayOfValues) {
      return arrayOfValues.reduce((a, b) => a + b, 0);
    },
    avg(arrayOfValues) {
      return this.total(arrayOfValues) / arrayOfValues.length;
    },
    getArrayWithValues(objArray, valueName, nestedValue = null) {
      return nestedValue ? objArray.map(a => a[valueName][nestedValue]) : objArray.map(a => a[valueName]);
    },
    columnData(arrayOfValues) {
      return [
        ["Avg", this.avg(arrayOfValues)],
        ["Min", Math.min(...arrayOfValues)],
        ["Max", Math.max(...arrayOfValues)]
      ]
    },
    getAllContainers(field, nestedField = null) {
      return Object.keys(this.results).map(function (id) {
        return {name: id, data: this.columnData(this.getArrayWithValues(this.results[id], field, nestedField))}
      }, this);
    },
    getContainers(field, nestedField = null) {
      return this.columnData(this.getArrayWithValues(this.results[this.displayed_container], field, nestedField));
    },
  }
}
</script>

<style scoped>

</style>