import App from "./app"
import Route from "./decorators/index.decorator";
import IndexController from "./controllers/index.controller";
import UserController from "./controllers/user.controller"

const app : App = new App([new Route(IndexController) , new Route(UserController)]);

app.listen();