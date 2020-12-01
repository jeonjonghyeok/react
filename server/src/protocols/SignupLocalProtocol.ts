import {BodyParams, Req} from "@tsed/common";
import {OnInstall, OnVerify, Protocol} from "@tsed/passport";
import {Strategy} from "passport-local";
import {Forbidden} from "@tsed/exceptions";
import {UserCreation} from "../models/user/UserCreation";
import {UsersService} from "../services/users/UserService";
import {User} from "../models/user/User";

@Protocol({
  name: "signup",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password"
  }
})
export class SignupLocalProtocol implements OnVerify, OnInstall {
  constructor(private usersService: UsersService) {
  }

  async $onVerify(@Req() request: Req, @BodyParams() user: User) {
    const {email} = user;
    const found = await this.usersService.find(email);

    if (found) {
      throw new Forbidden("Email is already registered");
    }

    return this.usersService.save(user);
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }
}