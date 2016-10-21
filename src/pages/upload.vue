<template lang="html">
  <div class="EX_upload_22"></div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  created(){
    this.uploadImg()
  },
  methods:{
    ...mapActions([
      'uploadImg'
    ])
  }
};
</script>
