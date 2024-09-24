import express from "express";
import logger from "./logger";
import morgan from "morgan";

const app = express();
const port = 3000;
app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

let data = [];
let nextId = 1;

// add item in array
app.post("/item", (req, res) => {
  const { name, price } = req.body;
  const newItem = { id: nextId++, name, price };
  data.push(newItem);
  res.status(200).send(newItem);
});

// get all items
app.get("/all", (req, res) => {
  res.status(200).send(data);
});

// get item  by id
app.get("/item/:id", (req, res) => {
  const item = data.find((i) => i.id === parseInt(req.params.id)); // params are gives as string
  if (!item) {
    return res.status(404).send("item not found");
  }
  res.status(200).send(item);
});

// update an item
app.put("/item/:id", (req, res) => {
  const item = data.find((i) => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).send("item not found");
  }
  const { name, price } = req.body;
  item.name = name;
  item.price = price;
  res.status(200).send(item);
});

// delete item
app.delete("/item/:id", (req, res) => {
  const itemIndex = data.findIndex((i) => i.id === parseInt(req.params.id));
  if (itemIndex == -1) {
    return res.status(404).send("item not found");
  }
  data.splice(itemIndex, 1);
  res.status(200).send("item deleted"); // 204 means - no content to send back
});

// app.get("/", (req, res) => {
//   res.send("mj");
// });

app.listen(port, () => console.log(`server up & running on ${port}...`));
