// const csrf = require("csurf");
// const csrfDefence = csrf({ cookie: { httpOnly: true } });
// const verifiers = require("../middleware/verifyJWT");

// const middlewareRoutes = (router) => {
//   router.get("/middleware/verifyUser", csrfDefence, [verifiers.verifyToken]);
//   router.get("/middleware/verifyAdmin", csrfDefence, [
//     (verifiers.verifyToken, verifiers.isAdmin),
//   ]);
// };

// module.exports = middlewareRoutes;
