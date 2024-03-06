import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema({
  idSale: {
    type: String,
  },
  date: {
    type: Date,
  },
  products: {
    type: Array,
  },
  priceTotal: {
    type: Number,
  },
  client: {
    type: Object,
    default: {},
  },
  dues: {
    type: Object,
    default: {
      payd: 0,
      cant: 0,
    },
  },
  invoice: {
    type: String,
    default: "",
  },
  state:{
    type:Boolean,
    default:false //sale open
  }
});

SaleSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }
  // Función auxiliar para rellenar con ceros a la izquierda
  function padWithZeros(number, length) {
    let result = "" + number;
    while (result.length < length) {
      result = "0" + result;
    }
    return result;
  }
  try {
    const lastSale = await Sale.findOne().sort({ idSale: -1 });

    if (lastSale) {
      this.idSale = padWithZeros(Number(lastSale.idSale) + 1, 4);
    } else {
      this.idSale = "0001";
    }

    next();
  } catch (error) {
    console.error("Error during pre-save hook:", error);
    next(error);
  }
});

const Sale = mongoose.model("Sale", SaleSchema);

export default Sale;
