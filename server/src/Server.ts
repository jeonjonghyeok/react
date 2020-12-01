import {Configuration, Inject, PlatformApplication} from "@tsed/common";
import "@tsed/mongoose"; // import mongoose ts.ed module
import "@tsed/platform-express";
import "@tsed/swagger";
import "@tsed/typeorm";
import "@tsed/passport";
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import * as path from "path";
import "reflect-metadata";
import mongooseConfig from "./config/mongoose";
const rootDir = __dirname;
const clientDir = path.join(rootDir, "../../client/build");

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8081,
  httpsPort: false,
  mongoose: mongooseConfig,
  logger: {
    debug: true,
    logRequest: false,
    requestFields: [
      "reqId",
      "method",
      "url",
      "headers",
      "query",
      "params",
      "duration"
    ]
  },
  mount: {
    "/rest": [
      `${rootDir}/controllers/**/*.ts` // Automatic Import, /!\ doesn"t works with webpack/jest, use  require.context() or manual import instead
    ]
  },
  componentsScan: [
    "${rootDir}/middlewares/**/*.ts",
    "${rootDir}/services/**/*.ts",
    "${rootDir}/repositories/**/*.ts",
    "${rootDir}/protocols/**/*.ts"
  ],
  swagger: [
    {
      path: "/api-docs"
    }
  ],
  calendar: {
    token: true
  },
  statics: {
    "/": clientDir
  },
  typeorm: [
    {
      name: "default",
      type: "postgres",
      host: process.env.POSTGRES_HOST || "localhost",
      port: 5432,
      username: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "jjh5942",
      database: process.env.POSTGRES_DB || "postgres",
      logging: false,
      synchronize: true,
      entities: [
        `${rootDir}/entities/*{.ts,.js}`
      ],
      migrations: [
        `${rootDir}/migrations/*{.ts,.js}`
      ],
      subscribers: [
        `${rootDir}/subscriber/*{.ts,.js}`
      ]
    }
  ]
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;
  /**
   * This method let you configure the middleware required by your application to works.
   * @returns {Server}
   */
  $beforeRoutesInit(): void | Promise<any> {
    this.app
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        })
      )
      .use(session({
        secret: "mysecretkey",
        resave: true,
        saveUninitialized: true,
        maxAge: 36000,
        cookie: {
          path: "/",
          httpOnly: true,
          secure: false
        }
      }));

    return null;
  }

  $afterRoutesInit() {
    this.app.get(`*`, (req, res) => {
      res.sendFile(path.join(clientDir, "index.html"));
    });
  }
}
