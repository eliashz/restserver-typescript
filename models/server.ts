import express, { Application } from "express";
import cors from "cors";
import userRoutes from "../routes/user";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = { users: "/api/users" };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Body parse
    this.app.use(express.json());

    // Public folder
  }

  routes() {
    this.app.use(this.apiPaths.users, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log("Server running on port " + this.port + ".")
    );
  }
}

export default Server;
