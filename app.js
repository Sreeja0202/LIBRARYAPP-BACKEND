const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes.js");
const bookRoutes = require("./routes/book.routes.js");
const app = new express();

app.use(cors());
app.use(express.json());
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started @ port 3000");
});

app.use("/users", userRoutes);
app.use("/books", bookRoutes);
