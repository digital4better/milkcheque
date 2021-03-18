<template>
  <div class="cheque__form__ville">
    <span>À</span>
    <input
      type="text"
      :value="changedvalue"
      @input="handleInput($event.target.value)"
      aria-label="renseignez le nom de votre ville"
    />
  </div>
</template>

<script>
export default {
  name: "CityInput",
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
    handleInput(e) {
      this.changedvalue = e;
      this.$emit("input", this.changedvalue);
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/variables.scss";

.cheque__form__ville {
  display: flex;
  align-items: center;
  input[type="text"] {
    background: transparent;
    border: none;
    border-bottom: 1px solid #000;
    font-size: 8px;
    height: $city;
  }
}
@media print {
  .cheque__form__ville {
    span {
      display: none;
    }
    input[type="text"] {
      border-bottom: none;
    }
  }
}
</style>
