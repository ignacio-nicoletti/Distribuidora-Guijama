import { Admin } from "../models/admin.js";
import { Client } from "../models/clients.js";
import { Product } from "../models/products.js";
import { Sale } from "../models/sale.js";
import { DecodedToken } from "../utils/DecodedToken.js";
import { formatError } from "../utils/formatError.js";

function getMonthName(monthNumber) {
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  return months[monthNumber];
}
export const createSale = async (req, res) => {
  const { List, client, token } = req.body;

  try {
    let currentDate = new Date();

    const timeZoneOffset = -3; // La diferencia de la zona horaria en horas
    currentDate.setHours(currentDate.getHours() + timeZoneOffset);

    const pricetotalFunction = () => {
      const total = List.reduce((acc, el) => {
        return acc + el.priceList * el.unity;
      }, 0);
      return total;
    };

    const iduser = DecodedToken(token);
    let user = await Admin.findById(iduser.id);

    // --------new sale--------
    let sale = new Sale({
      date: currentDate,
      products: List,
      priceTotal: pricetotalFunction(),
      client: client,
      createdBy: user.email,
    });

    await sale.save();
    //--------new sale--------

    //--------edit product--------
    for (const product of List) {
      if (product.generic === false) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // Obtener el mes actual (0 = enero, 1 = febrero, etc.)
        const monthName = getMonthName(currentMonth);

        const existingProduct = await Product.findById(product._id);
        existingProduct.stock -= product.unity;

        const monthIndex = existingProduct.sales.findIndex(
          (sale) => sale.month === monthName
        );

        if (monthIndex !== -1) {
          const updatedSale = { ...existingProduct.sales[monthIndex] };
          updatedSale.amount += Number(product.unity);
          existingProduct.sales[monthIndex] = updatedSale;
        } else {
          existingProduct.sales.push({
            month: monthName,
            amount: Number(product.unity),
          });
        }
        await existingProduct.save();
      }
    }

    //--------edit product--------

    //--------edit Client--------
    let id = client.id;

    await Client.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          buys: {
            date: currentDate,
            products: List,
            priceTotal: pricetotalFunction(),
            idSale: sale.idSale,
          },
        },
      }
    );
    //--------edit Client--------

    return res.status(200).json({ msg: "Sale creado" });
  } catch (error) {
    console.log(error);
    res.status(400).json(formatError(error.message));
  }
};

export const GetAllSale = async (req, res) => {
  try {
    let sale = await Sale.find();
    return res.status(200).json(sale.reverse());
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const GetSaletById = async (req, res) => {
  const { id } = req.params;
  try {
    let sale = await Sale.findById(id);
    return res.status(200).json({ sale });
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const UpdateSaleById = async (req, res) => {
  const { id } = req.params;
  const { checkboxStates } = req.body;
  try {
    let statesTrue = checkboxStates.filter((state) => state === true).length;
    console.log(checkboxStates.length);

    let sale = await Sale.findByIdAndUpdate(
      id,
      {
        dues: { cant: checkboxStates.length, payd: checkboxStates },
        state: statesTrue === checkboxStates.length ? true : false,
      },
      { new: true }
    );

    return res.status(200).json({ sale });
  } catch (error) {
    console.log(error);
    res.status(400).json(formatError(error.message));
  }
};

export const DeleteSaleById = async (req, res) => {
  const { id } = req.params;
  try {
    await Sale.findByIdAndDelete(id);
    return res.status(200).json("Sale eliminado");
  } catch (error) {
    console.log(error);
    res.status(400).json(formatError(error.message));
  }
};
