<template>
  <div id="app" class="container">
    <Cheque />
  </div>
</template>

<script>
import Cheque from "./components/Cheque.vue";

export default {
  name: "App",
  components: {
    Cheque
  }
};
</script>

<style lang="scss">
@page {
  size: A4;
  margin: 0;
}
@media print {
  input {
    border: none;
  }
  input[type="text"] {
    border-bottom: none;
  }
  .printBtn,
  .validateBtn {
    display: none;
  }
  .cheque__container {
    background-color: red;
  }
}
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 12px;
}
.container {
  max-width: 1440px;
  margin: 0 auto;
}
</style>
