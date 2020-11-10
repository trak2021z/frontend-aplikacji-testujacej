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
            <table class="table table-borderless">
                <tr>Test: {{testObj.name}} with {{testUsers}} users calling {{testAmount}} queries is in progress</tr><br>
                <tr>Please wait...</tr>
            </table>
            <div class="text-center">
                <b-spinner variant="primary" label="Text Centered"></b-spinner>
            </div>
        </div>
      </template>

        <div class="modal-footer d-flex justify-content-center">
          <button class="btn btn-success" disabled>Show Results</button>
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