"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var App = Express();
App.get("/valami/:id", function (req, res) {
    console.log("alma");
    res.send('Szia!' + req.params.id);
});
App.listen(3000, function () {
    console.log("listening on port 3000");
});
//# sourceMappingURL=index.js.map