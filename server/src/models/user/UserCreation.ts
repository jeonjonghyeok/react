import {Required, Description} from "@tsed/schema";
import {Credentials} from "./Credentials";
import {Model, ObjectID} from "@tsed/mongoose";

@Model()
export class UserCreation extends Credentials {
  @Description("User first name")
  @Required()
  firstName: string;

  @Description("User last name")
  @Required()
  lastName: string;

  @Description("User phonenumber")
  phone: string;

  @Description("User address")
  address: string;
}