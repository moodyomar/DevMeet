exports.originAllow = (app) => {
  app.all("*", function (req, res, next) {
    if (!req.get("Origin")) return next();

    res.set("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.set(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,x-auth-token"
    );
    next();
  });
};