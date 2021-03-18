<template>
  <div class="cheque__amount cheque__input__wrapper">
    <input
      tabindex="2"
      v-model="montant"
      type="text"
      v-on:input="twoDigitMax"
      aria-label="entrez le montant du chèque avec maximum deux chiffres après la virgule"
      oninput="this.value = this.value.replace(/[^0-9,]/g, '')"
    />
    <button v-on:click="returnMontant" class="validateBtn" aria-label="valider">
      Valider
    </button>
  </div>
</template>

<script>
export default {
  name: "AmountInput",
  data() {
    return {
      montant: "0,00"
    };
  },
  methods: {
    addAsterics(value) {
      this.montant = `*** ${value} *** `;
    },
    twoDigitMax: function() {
      let amount = this.montant;
      if (amount.includes(",")) {
        let str = amount.split(",");
        if (str.length === 2) {
          let size = str[1].length > 2 ? 2 : str[1].length;
          this.montant = str[0] + "," + str[1].substring(0, size);
        }
      }
    },
    returnMontant: function(e) {
      e.preventDefault();
      let amount = this.montant;
      let isDecimalInAmount = amount.includes(",");
      this.montant += isDecimalInAmount ? `` : ",00";

      let montantSplit = this.montant.split(",");
      let montantEuro = montantSplit[0];
      let montantCentimes = montantSplit[1];

      let writtenNumberLibrary = require("written-number");
      let writtenEuros = writtenNumberLibrary(montantEuro, { lang: "fr" });
      let writtenCentimes = writtenNumberLibrary(montantCentimes, {
        lang: "fr"
      });

      let writtenCentimesCheck =
        montantCentimes === "00" ? "" : writtenCentimes;
      let CentimesPlural = montantCentimes === "01" ? "centime" : "centimes";
      let EuroPlural = montantEuro === "1" ? "euro" : "euros";

      let writtenNumber = `${writtenEuros} ${EuroPlural}`;
      writtenNumber += writtenCentimesCheck
        ? ` et ${writtenCentimesCheck} ${CentimesPlural}`
        : "";

      this.addAsterics(this.montant);
      this.$emit("amountLetter", writtenNumber);
    }
  }
};
</script>
<style scoped lang="scss">
.cheque__amount {
  max-width: 152px;
  input[type="text"] {
    width: 41mm;
    height: 10mm;
    box-sizing: border-box;
    font-size: 14px;
  }
  .validateBtn {
    position: absolute;
    top: -16mm;
    color: #fff;
    background-color: #F15842;
    border-radius: 25px;
    border: none;
    cursor: pointer;
    text-transform: none;
    font-weight: 600;
    font-size: 16px;
    padding: 5px 10px;
    margin-top: 20px;
  }
}
@media print {
  .cheque__amount {
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
