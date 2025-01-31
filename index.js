import express from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import { Item } from "./models/itemmodel.js";
import cors from "cors";
import multer from "multer";  // Use ES module import for multer
import FormDataModel from './models/FormData.js';  // Adjusted for default export
 // Assuming ES module import for FormDataModel

const app = express();
app.use(express.json());
app.use(cors());
app.use('/files', express.static("files"));

//================================================== multer ==============================================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

//===========================================================================

mongoose.connect(
  'mongodb+srv://tanvikreddy:Hs8iRlr1mfhvMAKB@system.vesozdf.mongodb.net/?retryWrites=true&w=majority&appName=System',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Error connecting to MongoDB Atlas:", err));

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  FormDataModel.findOne({ email: email })
    .then(user => {
      if (user) {
        res.json("Already registered");
      } else {
        FormDataModel.create(req.body)
          .then(log_reg_form => res.json(log_reg_form))
          .catch(err => res.json(err));
      }
    });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  FormDataModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json("Wrong password");
        }
      } else {
        res.json("No records found!");
      }
    });
});

// app.listen(3001, () => {
//   console.log("Server listening on http://localhost:8000");
// });

// ============================== get =================================
app.get("/item", async (req, res) => {
  try {
    const items = await Item.find({});
    return res.status(200).json({
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// =============================== post ====================================
app.post("/item", upload.single("file"), async (req, res) => {
  console.log(req.file);
  try {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.phoneno ||
      !req.body.title ||
      !req.body.description
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const newItem = {
      name: req.body.name,
      email: req.body.email,
      phoneno: req.body.phoneno,
      title: req.body.title,
      description: req.body.description,
      image: req.file.filename,
    };
    const item = await Item.create(newItem);
    return res.status(200).send(item);

  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

// =================================- get by id ==================================
app.get("/item/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findById(id);
    return res.status(200).json(item);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// =================================== delete ==================================
app.delete("/item/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Item.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Item not found" });
    }
    return res.status(200).send({ message: "Item deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
