const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const connectDB = require("./db/config");
const authRoute = require("./routes/authRoute");
const adminRoute = require("./routes/adminRoute");
const employeeRoute = require("./routes/employeeRoute");
const installationRoute = require("./routes/installationRoute");
const toolRoute = require("./routes/toolRoute");
const clientRoute = require("./routes/clientRoute");

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/employee", employeeRoute);
app.use("/tool", toolRoute);
app.use("/client", clientRoute);
app.use("/installation", installationRoute);

connectDB();

app.listen(3001);
