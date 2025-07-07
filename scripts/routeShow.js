const app = require("../app");

app.ready().then(
  () => {
    console.log("===== Show Routes =====");
    console.log(app.printRoutes());
  },
  (error) => {
    console.error("Show routes error: ", error);
  }
);
