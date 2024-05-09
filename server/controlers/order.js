import Order from "../models/order.js";
import Product from "../models/product.js";

const OrderControl = {
  add: async (req, res) => {
    console.log("add ", req.body);

    const info = req.body.formData;
    console.log("the user", req.user);
    const products = req.body.products;

    const calcluleTotale = () => {
      let total = 0;
      products.map((product) => {
        total = product.product.prix * product.quantity;
      });
      return total;
    };
    const getOrders = () => {
      const orderArr = [];
      products.map((product) => {
        orderArr.push({
          product_id: product.product._id,
          quantity: product.quantity,
        });
      });
      return orderArr;
    };
    if (products) {
      const total_price = calcluleTotale();
      const order = getOrders();
      console.log(total_price, order);

      const newOrder = new Order({
        user_id: req.user._id,
        order: order,
        total_price: total_price,
        info: {
          numberUrg: info.urgentNumber,
          adress: info.adress,
          city: info.city,
          email: info.email,
          zip: info.zip,
          name: info.name,
          lastName: info.last_name,
          phone: info.phone,
        },
      });
      await newOrder.save();
      res.status(201).json({ success: true, data: newOrder });
      console.log("the ddd");

      console.log(newOrder);
      Order.create(newOrder);
    }
  },
  get: async (req, res) => {
    try {
      let orders = await Order.find({});
      return res.status(201).json({ orders });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: "error in data" });
    }
  },
  delete: async (req, res) => {
    console.log("start delete");
    try {
      let id = req.params.id;
      console.log(id);
      let result = await Order.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).send("No record found");
      } else {
        return res.status(200).send("Deleted Successfully!");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      return res.status(500).send("Internal Server Error");
    }
  },
  edit: async (req, res) => {
    const id = req.params.id;
    const state = req.params.state;
  },
};

export default OrderControl;
