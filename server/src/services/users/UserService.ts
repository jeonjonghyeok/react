import {Inject, Injectable, Service} from "@tsed/common";
import {$log} from "@tsed/logger";
import {User} from "../../models/user/User";
import {MongooseModel} from "@tsed/mongoose";

@Service()
export class UsersService {
    @Inject(User)
  private User: MongooseModel<User>;
  $onInit() {
  }

   /**
   * Find a User by his ID.
   * @param id
   * @returns {undefined|User}
   */
  async find(id: string): Promise<User | null> {
    $log.debug("Search a User from ID", id);
    const User = await this.User.findOne({email:id});

    $log.debug("Found", User);

    return User;
  }

   /**
   * Find a User by his ID.
   * @param username
   * @returns {undefined|User}
   */
  async findOne(username: string): Promise<User | null> {
    $log.debug("Search a User from ID", username);
    const User = await this.User.findOne({email:username});

    $log.debug("Found", User);

    return User;
  }
  
   /**
   *
   * @param User
   * @returns {Promise<TResult|TResult2|User>}
   */
  async save(User: User): Promise<User> {
    $log.debug({message: "Validate User", User});

    // const m = new CModel(User);
    // console.log(m);
    // await m.update(User, {upsert: true});

    const model = new this.User(User);
    $log.debug({message: "Save User", User});
    await model.save(function(err,User){
      if(err) return console.error(err);
      console.log(User);
    });


    $log.debug({message: "User saved", model});

    return model;
  }

  /**
   *
   * @returns {User[]}
   */
  async query(options = {}): Promise<User[]> {
    return this.User.find(options);
  }

  /**
   *
   * @param id
   * @returns {Promise<User>}
   */
  async remove(id: string) {
    await this.User.deleteOne({
      _id: id
    }).exec();
  }
}