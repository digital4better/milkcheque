<template>
  <div class="cheque__form__destinataire">
    <span>à</span>
    <input
      type="text"
      id="chequeDestinataire"
      aria-label="entrez le nom de votre destinataire"
      maxlength="78"
      :value="changedvalue"
      @input="handleInput($event.target.value)"
      v-on:blur="addAsterics"
    />
  </div>
</template>

<script>
export default {
  name: "RecipientInput",
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
    },
    addAsterics() {
      const maxLength = document
        .getElementById("chequeDestinataire")
        .getAttribute("maxlength");
      const textareaLength = document.getElementById("chequeDestinataire").value
        .length;
      const asteriskNb = "*".repeat(maxLength - textareaLength);
      if (this.changedvalue != null) {
        this.changedvalue += ` ${asteriskNb}`;
        this.$emit("input", this.changedvalue);
      }
    }
  }
};
</script>
<style scoped lang="scss">
.cheque__form__destinataire {
  display: flex;
  align-items: baseline;

  input[type="text"] {
    width: 100%;
    border: none;
    border-bottom: 1px solid #000;
    margin-left: 5px;
    font-size: 12px;
  }
}
@media print {
  .cheque__form__destinataire {
    span {
      display: none;
    }
    input[type="text"] {
      border-bottom: none;
      font-size: 12px;
    }
  }
}
</style>
