<template>
  <div class="modal fade" id="modalTestProgress" tabindex="-1" role="dialog" aria-labelledby="testProgressModal"
       aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title w-100 font-weight-bold">Test Progress</h4>
          <button @click="hide" type="button" class="close position-absolute" style="right:4%" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

      <template v-if="testObj != null">
        <div class="modal-body mx-3">
          <template v-if="testCallCompleted != true">
            <table class="table table-borderless">
                <tr>Test: {{testObj.name}} with {{testUsers}} users calling {{testAmount}} queries is in progress</tr><br>
                <tr>Please wait...</tr>
            </table>
            <div class="text-center">
                <b-spinner variant="primary" label="Text Centered"></b-spinner>
            </div>
            </template>
            <template v-else>
              <table class="table table-borderless">
                <tr>Test: {{testObj.name}} with {{testUsers}} users calling {{testAmount}} queries finished successfully.</tr><br>
                <tr>Test completed, you can view the results by pressing a button below.</tr>
            </table>
            </template>
        </div>
      </template>

        <div class="modal-footer d-flex justify-content-center">
          <template v-if="testCallCompleted != true">
            <button class="btn btn-success" disabled>Show Results</button>
          </template>
          <template v-else>
            <button class="btn btn-success" @click="showResults()" >Show Results</button>
          </template>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import jQuery from 'jquery';
import { BSpinner } from 'bootstrap-vue'

window.$ = window.jQuery = jQuery;

export default {
  name: "TestProgressModal",
  components: {BSpinner},
  data() {
    return {
    }
  },
  methods: {
    show() {
      jQuery('#modalTestProgress').modal()
    },
    hide() {
      this.$emit('hide');
      jQuery('#modalTestProgress').modal('hide');
    },
    showResults(){
      alert('<< Test results will be here >>')
    }
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    testObj: {
      required: true
    },
    testAmount:{
        required: true
    },
    testUsers:{
        required: true
    },
    testCallCompleted:{
      required: true
    }
  },
  watch: {
    isVisible: function(newVal) {
      if(newVal){
        this.show();
      }
    }
  }
}
</script>