<template>
  <div class="container-fluid">
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
    </template>
  </div>
</template>

<script>
export default {
  name: "HardwareParameters",
  props: ["data", "displayed_container"],
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