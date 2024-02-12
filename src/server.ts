import App from "./app";
import IndexController from "./controllers/index.controller";
import UserController from "./controllers/user.controller";
import UserRoute from "./routes/user.route";
import IndexRoute from "./routes/index.route";

const app: App = new App([
    new IndexRoute(IndexController),
    new UserRoute(UserController),
]);

app.listen();
