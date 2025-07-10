module.exports = async function (appInstance) {
  const userHandler = require("./userHandler")(appInstance);

  appInstance.get("/", {}, userHandler.getList);
  appInstance.post("/", {}, userHandler.create);
  appInstance.get("/:userId", {}, userHandler.show);
  appInstance.put("/:userId", userHandler.update);
  appInstance.delete("/:userId", userHandler.destroy);
};
