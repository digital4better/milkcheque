<template>
  <div>
    <div class="cheque__container" v-bind:class="selected">
      <form class="cheque__form" @submit.prevent="handleSubmit">
        <div class="cheque__wrapper">
          <div class="cheque__left">
            <!-- <div class="cheque__montantLettre__wrapper" id="montantLettreWrapper"> -->
            <textarea
              readonly="true"
              aria-disabled="true"
              v-if="montantLetter"
              v-model="montantLetter"
              class="cheque__montantLettre"
              rows="2"
              maxlength="130"
              id="montantLettre"
            >
            </textarea>
            <!-- </div> -->
            <RecipientInput v-model="recipient" />
          </div>
          <AmountInput v-on:montantLettre="returnMontant" />
        </div>
        <div class="cheque__date__wrapper">
          <CityInput v-model="city" />
          <DateInput v-model="date" />
        </div>
        <div class="cheque__nb__wrapper">
          <!-- <ChequeNbInput />
          <AccountNbInput /> -->
          <select
            tabindex="1"
            v-if="bankList && bankList.length"
            v-model="selected"
            class="cheque__banks select"
          >
            <option
              :value="bank.value"
              :key="`${index}-bank`"
              v-for="(bank, index) in bankList"
            >
              {{ bank.name }}
            </option>
          </select>
        </div>
      </form>
    </div>
    <button
      v-on:click="PrintWindow"
      class="printBtn"
      v-if="recipient && city && date"
    >
      Imprimer
    </button>
  </div>
</template>

<script>
import DateInput from "./DateInput";
import RecipientInput from "./RecipientInput.vue";
import AmountInput from "./AmountInput.vue";
import CityInput from "./CityInput.vue";
// import AccountNbInput from "./AccountNbInput.vue";
// import ChequeNbInput from "./ChequeNbInput.vue";
import banks from "../utils/banks.js";

export default {
  name: "Cheque",
  components: {
    DateInput,
    RecipientInput,
    AmountInput,
    CityInput
    // CompteNbInput,
    // ChequeNbInput
  },
  data() {
    return {
      montantLetter: null,
      selected: "bpop",
      bankList: [],
      recipient: null,
      city: "Nantes",
      date: new Date().toISOString().substr(0, 10)
    };
  },
  methods: {
    returnMontant(value) {
      this.montantLetter = `*** ${value}`;
    },
    PrintWindow() {
      window.print();
    }
  },
  updated: function() {
    if (this.montantLetter) {
      let maxLength = document
        .getElementById("montantLettre")
        .getAttribute("maxlength");
      let textareaLength = document.getElementById("montantLettre").value.length;
      let asteriskNb = "*".repeat(maxLength - textareaLength);
      this.montantLetter += ` ${asteriskNb}`;
    }
    this.$emit("datas", this.changedvalue);
  },
  mounted: function() {
    this.bankList = banks;
  }
};
</script>

<style lang="scss">
@import "../assets/css/variables.scss";
@import "../assets/css/banks.scss";

.cheque {
  &__container {
    background-color: #f0f0f0;
    // padding: 20px;
    width: 175mm;
    height: 80mm;
    box-sizing: border-box;
  }
  &__wrapper {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  &__left {
    display: flex;
    flex-direction: column;
    width: 70%;
  }
  &__input__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &__date__wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  &__nb__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__montantLettre {
    text-transform: uppercase;
    text-align: left;
    display: inline-block;
    text-indent: 42mm;
    width: 100%;
    border: none;
    background: transparent;
    resize: none;
    font-size: 9px;
    word-break: break-all;
    line-height: 5mm;
  }
  &__montantLettre__wrapper {
    text-align: left;
    position: relative;
  }
  &__banks {
    position: absolute;
    left: 50%;
    bottom: 5mm;
    transform: translateX(-50%);
    text-transform: uppercase;
    border: none;
    background: transparent;
    &::-ms-expand {
      display: none;
    }
  }
}
@media print {
  .select {
    display: none;
  }
}
</style>
