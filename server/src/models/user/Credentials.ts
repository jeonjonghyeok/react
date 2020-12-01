import {Description, Example, Format, Required} from "@tsed/schema";
import { Model } from "@tsed/mongoose";

@Model()
export class Credentials {
  @Description("User password")
  @Example("/5gftuD/")
  @Required()
  password: string;

  @Description("User email")
  @Example("user@domain.com")
  @Format("email")
  @Required()
  email: string;
}