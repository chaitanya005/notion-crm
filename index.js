const express = require("express");
const app = express();
var axios = require("axios");
var cors = require("cors");

const { Client } = require("@notionhq/client");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// var app = express()

// app.use(bodyParser.json());

// for parsing application/xwww-

const notion = new Client({
  auth: "secret_nVMXTaXGC6XnMhivTGu5sIK5tnXTIOYIRTfhf23UbMi",
});

app.use(cors());

app.post("/notion", (req, res) => {
  console.log("sdjflksfjsdlkfj");
  var data = JSON.stringify({
    parent: {
      database_id: "746cbc16c13a4c2a959cd6b81033983f",
    },
    properties: {
      title: {
        title: [
          {
            text: {
              content: "POSTED!!!",
            },
          },
        ],
      },
    },
  });

  var config = {
    // method: "post",
    url: "https://api.notion.com/v1/pages",
    headers: {
      Authorization:
        "Bearer secret_nVMXTaXGC6XnMhivTGu5sIK5tnXTIOYIRTfhf23UbMi",
      "Content-Type": "application/json",
      "Notion-Version": "2021-05-13",
      "Access-Control-Allow-Origin": "*",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log("notion", error);
    });

  res.send("Done!!!");
});

app.get("/getNotion", async (req, res) => {
  /* axios
    .get(
      "https://api.notion.com/v1/databases/746cbc16c13a4c2a959cd6b81033983f/query",
      {
        headers: {
          Authorization:
            "Bearer secret_nVMXTaXGC6XnMhivTGu5sIK5tnXTIOYIRTfhf23UbMi",
          "Content-Type": "application/json",
          "Notion-Version": "2021-05-13",
          "Access-Control-Allow-Origin": "*",
        },
      },
      
    )
    .then((res) => {
      console.log(res.data.properties);
    })
    .catch((err) => console.log(err)); */

  const databaseId = "746cbc16c13a4c2a959cd6b81033983f";
  const response = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: "Tuscan Kale",
            },
          },
        ],
      },
    },
  });
  console.log(response);
});

app.post("/order", async (req, res) => {
  console.log(
    "requesting--------------------------------",
    req.body.values,
    req.body.orderId
  );
  // res.send(req.body);
  const databaseId = "746cbc16c13a4c2a959cd6b81033983f";

  const response = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: {
      "Order Id": {
        rich_text: [
          {
            type: "text",
            text: {
              content: req.body.orderId,
            },
            // mention: "",
          },
        ],
      },
      Name: {
        title: [
          {
            text: {
              content: req.body.values.name,
            },
          },
        ],
      },
      Email: {
        rich_text: [
          {
            type: "text",
            text: {
              content: req.body.values.email,
            },
          },
        ],
      },
      "Phone Number": {
        rich_text: [
          {
            type: "text",
            text: {
              content: req.body.values.phone,
            },
          },
        ],
      },
      Address: {
        rich_text: [
          {
            type: "text",
            text: {
              content: req.body.values.address,
            },
          },
        ],
      },
      "Pin Code": {
        rich_text: [
          {
            type: "text",
            text: {
              content: req.body.values.pincode,
            },
          },
        ],
      },
      Town: {
        rich_text: [
          {
            type: "text",
            text: {
              content: req.body.values.town,
            },
          },
        ],
      },
      District: {
        rich_text: [
          {
            type: "text",
            text: {
              content: req.body.values.district,
            },
          },
        ],
      },
      /* Admin: {
        people: [
          {
            text: {
              content: "people",
            },
            // name: "muva",
          },
        ],
      }, */
      "No of Items": {
        rich_text: [
          {
            type: "text",
            text: {
              content: req.body.i.toString(),
            },
          },
        ],
      },
      Items: {
        rich_text: [
          {
            type: "text",
            text: {
              content: req.body.items,
            },
          },
        ],
      },
      "Additional Info": {
        rich_text: [
          {
            type: "text",
            text: {
              content: req.body.values.additionInfo,
            },
          },
        ],
      },
      Total: {
        rich_text: [
          {
            type: "text",
            text: {
              content: req.body.total.toString(),
            },
          },
        ],
      },
      "Applied Coupon": {
        rich_text: [
          {
            type: "text",
            text: {
              content: req.body.coupon,
            },
          },
        ],
      },
    },
  });

  // console.log("response-------------------------------------", response);

  res.send(response);
});

app.get("/", (req, res) => {
  res.send("Hey!!");
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("listening to port ", port));
