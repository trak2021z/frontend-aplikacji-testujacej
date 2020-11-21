<template>
  <div v-if="results" class="container-fluid">
    <h3>Hardware parameters</h3><br>

    <template v-if="displayed_container === 'All'">
      <div class="row">
        <div class="col-sm-6">
          <h5>CPU time spent on user tasks</h5>
          <column-chart :data="getAllContainers('cpu_time_spent_user')" suffix=" ms"></column-chart><br>
        </div>
        <div class="col-sm-6">
          <h5>CPU time spent on system tasks</h5>
          <column-chart :data="getAllContainers('cpu_time_spent_system')" suffix=" ms"></column-chart><br>
        </div>
        <div class="col-sm-12">
          <h5>CPU time spent idle</h5>
          <column-chart :data="getAllContainers('cpu_time_spent_idle')" suffix=" ms"></column-chart><br>
        </div>
      </div>
      <div class="row">
        <div :class="`col-sm-${showAggregatedUsage ? 6 : 12}`">
          <h5>CPU usage by container</h5>
          <column-chart :data="getAllContainers('cpu_usage_current', 'usage')" suffix="%"></column-chart><br>
        </div>
        <div v-if="showAggregatedUsage" class="col-sm-6">
          <h5>CPU usage by container</h5>
          <column-chart :data="getAllContainers('cpu_current_aggregated', 'usage')" suffix="%"></column-chart><br>
        </div>
        <div class="col-sm-12">
          <h5>Memory usage by container</h5>
          <column-chart :data="getAllContainers('memory_usage')" suffix="%"></column-chart><br>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="row">
        <div :class="`col-sm-${showAggregatedUsage ? 6 : 12}`">
          <h5>CPU current usage</h5>
          <column-chart :data="getContainers('cpu_usage_current', 'usage')" suffix="%"></column-chart><br>
        </div>
        <div v-if="showAggregatedUsage" class="col-sm-6">
          <h5>CPU usage aggregated</h5>
          <column-chart :data="getContainers('cpu_usage_aggregated', 'usage')" suffix="%"></column-chart><br>
        </div>
        <div class="col-sm-12">
          <h5>Memory usage by container</h5>
          <column-chart :data="getContainers('memory_usage')" suffix="%"></column-chart><br>
        </div>
        <div class="col-sm-12">
          <h5>CPU time</h5>
          <pie-chart :data="getCPUTimePieChartData()" suffix=" ms"></pie-chart><br>
        </div>
      </div>

      <table class="table table-hover">
        <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Min</th>
          <th scope="col">Max</th>
          <th scope="col">Average</th>
          <th scope="col">Total</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">CPU time spent on user tasks</th>
          <td>{{parseFloat(Math.min(...CPUTimeUser).toFixed(precision))}}<i> ms</i></td>
          <td>{{parseFloat(Math.max(...CPUTimeUser).toFixed(precision))}}<i> ms</i></td>
          <td>{{parseFloat(avg(CPUTimeUser).toFixed(precision))}}<i> ms</i></td>
          <td>{{parseFloat(total(CPUTimeUser).toFixed(precision))}}<i> ms</i></td>
        </tr>
        <tr>
          <th scope="row">CPU time spent on system tasks</th>
          <td>{{parseFloat(Math.min(...CPUTimeSystem).toFixed(precision))}}<i> ms</i></td>
          <td>{{parseFloat(Math.max(...CPUTimeSystem).toFixed(precision))}}<i> ms</i></td>
          <td>{{parseFloat(avg(CPUTimeSystem).toFixed(precision))}}<i> ms</i></td>
          <td>{{parseFloat(total(CPUTimeSystem).toFixed(precision))}}<i> ms</i></td>
        </tr>
        <tr>
          <th scope="row">CPU time spent idle</th>
          <td>{{parseFloat(Math.min(...CPUTimeIdle).toFixed(precision))}}<i> ms</i></td>
          <td>{{parseFloat(Math.max(...CPUTimeIdle).toFixed(precision))}}<i> ms</i></td>
          <td>{{parseFloat(avg(CPUTimeIdle).toFixed(precision))}}<i> ms</i></td>
          <td>{{parseFloat(total(CPUTimeIdle).toFixed(precision))}}<i> ms</i></td>
        </tr>
        <tr>
          <th scope="row">CPU usage</th>
          <td>{{parseFloat(Math.min(...CPUUsage).toFixed(precision))}}<i> %</i></td>
          <td>{{parseFloat(Math.max(...CPUUsage).toFixed(precision))}}<i> %</i></td>
          <td>{{parseFloat(avg(CPUUsage).toFixed(precision))}}<i> %</i></td>
          <td>-</td>
        </tr>
        <tr v-if="showAggregatedUsage">
          <th scope="row">CPU usage aggregated</th>
          <td>{{parseFloat(Math.min(...CPUUsageAggregated).toFixed(precision))}}<i> %</i></td>
          <td>{{parseFloat(Math.max(...CPUUsageAggregated).toFixed(precision))}}<i> %</i></td>
          <td>{{parseFloat(avg(CPUUsageAggregated).toFixed(precision))}}<i> %</i></td>
          <td>-</td>
        </tr>
        <tr>
          <th scope="row">Memory usage</th>
          <td>{{parseFloat(Math.min(...memoryUsage).toFixed(precision))}}<i> %</i></td>
          <td>{{parseFloat(Math.max(...memoryUsage).toFixed(precision))}}<i> %</i></td>
          <td>{{parseFloat(avg(memoryUsage).toFixed(precision))}}<i> %</i></td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
export default {
  name: "HardwareParameters",
  props: ["results", "displayed_container"],
  data(){
    return{
      precision: 3,
    }
  },
  computed: {
    CPUTimeUser: function (){
      return this.getArrayWithValues(this.results[this.displayed_container], 'cpu_time_spent_user')
    },
    CPUTimeSystem: function (){
      return this.getArrayWithValues(this.results[this.displayed_container], 'cpu_time_spent_system')
    },
    CPUTimeIdle: function (){
      return this.getArrayWithValues(this.results[this.displayed_container], 'cpu_time_spent_idle')
    },
    CPUUsage: function (){
      return this.getArrayWithValues(this.results[this.displayed_container], 'cpu_usage_current', 'usage')
    },
    CPUUsageAggregated: function (){
      return this.getArrayWithValues(this.results[this.displayed_container], 'cpu_usage_aggregated', 'usage')
    },
    memoryUsage: function (){
      return this.getArrayWithValues(this.results[this.displayed_container], 'memory_usage')
    },
    showAggregatedUsage: function (){
      return Object.keys(this.results).includes('cpu_usage_aggregated');
    }
  },
  methods: {
    total(arrayOfValues){
      return arrayOfValues.reduce((a, b) => a + b, 0);
    },
    avg(arrayOfValues){
      return this.total(arrayOfValues) / arrayOfValues.length;
    },
    getArrayWithValues(objArray, valueName, nestedValue = null){
      return nestedValue ? objArray.map(a => a[valueName][nestedValue]) : objArray.map(a => a[valueName]);
    },
    columnData(arrayOfValues){
      return [
          ["Avg", this.avg(arrayOfValues)],
          ["Min", Math.min(...arrayOfValues)],
          ["Max", Math.max(...arrayOfValues)]
      ]
    },
    getAllContainers(field, nestedField = null){
      return Object.keys(this.results).map(function (id) {
        return {name: id, data: this.columnData(this.getArrayWithValues(this.results[id], field, nestedField))}
      }, this);
    },
    getContainers(field, nestedField = null){
      return this.columnData(this.getArrayWithValues(this.results[this.displayed_container], field, nestedField));
    },
    getCPUTimePieChartData(){
      return [
        ['user tasks', this.total(this.getArrayWithValues(this.results[this.displayed_container], 'cpu_time_spent_user'))],
        ['system tasks', this.total(this.getArrayWithValues(this.results[this.displayed_container], 'cpu_time_spent_system'))],
        ['idle', this.total(this.getArrayWithValues(this.results[this.displayed_container], 'cpu_time_spent_idle'))]
      ];
    }
  }
}
</script>

<style scoped>

</style>