<template>
  <div id="app">
    <router-view keep-alive></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
  };
</script>
<style media="screen">
  body{position: inherit !important;padding: 0 !important;overflow: auto !important;}
</style>
