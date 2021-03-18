<template>
  <div class="cheque__date">
    <span>LE</span>
    <input
      type="date"
      aria-label="choisissez la date"
      :value="changedvalue"
      @input="handleInput($event.target.value)" />
  </div>
</template>

<script>
export default {
  name: "DateInput",
  data() {
    return {
      changedvalue: null
    };
  },
  props: {
    value: { type: String, require: true }
  },
  mounted() {
    this.changedvalue = this.value;
  },
  methods: {
    handleInput(e){
      this.changedvalue = e;
      this.$emit("input", this.changedvalue);
    }
  }
};
</script>
<style scoped lang="scss">
@import "../assets/css/variables.scss";

.cheque__date {
  display: flex;
  align-items: center;
  input[type="date"] {
    background: transparent;
    border: none;
    border-bottom: 1px solid #000;
    font-size: 8px;
    height: $date;
    width: 41mm;
  }
}
@media print {
  .cheque__date {
    span {
      display: none;
    }
    input[type="date"] {
      border-bottom: none;
    }
  }
}
</style>
