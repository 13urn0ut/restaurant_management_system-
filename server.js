const server = require("./app");
const { testConnection, sql } = require("./dbConnection");

require("dotenv").config();

const port = process.env.PORT;

(async () => {
  try {
    await testConnection();

    server.listen(port, () => console.log(`Server listening on port ${port}`));
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }

  process.on("SIGINT", () => {
    console.log("Shutting down server...");
    sql.end();
    process.exit(0);
  });
})();
