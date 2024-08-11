const app = require("./app");
const { sequelize } = require("./models/index");
const port = process.env.PORT || 3000;

// Sync models and start server
sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to sync database:", error);
  });
