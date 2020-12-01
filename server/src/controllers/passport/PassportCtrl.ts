import {BodyParams, Controller, Get, Post, Req} from "@tsed/common";
import {Authenticate, Authorize} from "@tsed/passport";
import {Returns, Security} from "@tsed/schema";
import { Credentials } from "../../models/user/Credentials";
import {User} from "../../models/user/User";

@Controller("/auth")
export class PassportCtrl {
  constructor() {
  }

  @Post("/login")
  @Authenticate("login", {failWithError: false})
  @Returns(200, User)
  @Returns(400).Description("Validation error")
  login(@Req() req: Req, @BodyParams() credentials: Credentials) {
    // FACADE
    return req.user;
  }

  @Post("/signup")
  @Returns(201, User)
  @Authenticate("signup")
  signup(@Req() req: Req, @BodyParams() user: User) {
    // FACADE
    return req.user;
  }

  @Get("/userinfo")
  @Authenticate("basic")
  @Security("auth:basic")
  @Returns(200, User)
  getUserInfo(@Req() req: Req): any {
    // FACADE
    return req.user;
  }


  @Get("/logout")
  logout(@Req() req: Req) {
    req.logout();
  }

  @Get("/connect/:protocol")
  @Authorize(":protocol")
  @Returns(200, User)
  connectProtocol(@Req() req: Req): any {
    // FACADE
    return req.user;
  }


  @Get("/connect/:protocol/callback")
  @Authorize(":protocol")
  @Returns(200, User)
  connectProtocolCallback(@Req() req: Req): any {
    // FACADE
    return req.user;
  }
}