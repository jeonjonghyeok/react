import {Property, Required} from "@tsed/common";
import {Model, ObjectID} from "@tsed/mongoose";
import { Ignore } from '@tsed/schema';
import { request } from 'http';
import { UserCreation } from './UserCreation';

@Model()
export class User extends UserCreation{
  @ObjectID("id")
  _id: string;

  @Ignore()
  @Property()
  password: string;

  @Property()
  email: string;

  verifyPassword(password: string) {
    return this.password === password;
  }
}
