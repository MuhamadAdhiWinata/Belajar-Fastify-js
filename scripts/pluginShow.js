const app = require("../app");

app.ready().then(
  () => {
    console.log("===== Show Plugins =====");
    console.log(app.printPlugins());
  },
  (error) => {
    console.error("Show plugins error: ", error);
  }
);
