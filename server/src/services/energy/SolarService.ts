import {Inject, Service} from "@tsed/common";
import {$log} from "@tsed/logger";
import {MongooseModel} from "@tsed/mongoose";
import {Solar} from "../../models/energy/Solar";

@Service()
export class SolarService {
  @Inject(Solar)
  private Solar: MongooseModel<Solar>;

  $onInit() {
    this.reload();
  }

  async reload() {
    // const solar = await this.Solar.find({});

    // if (solar.length === 0) {
    //   const promises = require("../../../resources/solar.json").map((solar: any) => this.save(solar));
    //   await Promise.all(promises);
    // }
  }

  /**
   * Find a calendar by his ID.
   * @param id
   * @returns {undefined|Solar}
   */
  async find(id: string): Promise<Solar | null> {
    $log.debug("Search a solar from ID", id);
    const solar = await this.Solar.findById(id).exec();

    $log.debug("Found", solar);

    return solar;
  }
  /**
   * Find a calendar by his ID.
   * @param id
   * @returns {undefined|Solar}
   */
  async findOne(): Promise<Solar | null> {
    $log.debug("Search a solar from ID");
    const solar = await this.Solar.findOne().sort({_id:-1}).limit(1).exec();

    $log.debug("Found", solar);

    return solar;
  }

  /**
   *
   * @param solar
   * @returns {Promise<TResult|TResult2|Solar>}
   */
  async save(solar: Solar): Promise<Solar> {
    $log.debug({message: "Validate solar", solar});

    // const m = new CModel(calendar);
    // console.log(m);
    // await m.update(calendar, {upsert: true});

    const model = new this.Solar(solar);
    $log.debug({message: "Save solar", solar});
    await model.save(function(err, solar) {
      if(err) return console.error(err);
      console.log(solar);
    })
    $log.debug({message: "Solar saved", model});

    return model;
  }

  /**
   *
   * @returns {Solar[]}
   */
  async query(options = {}): Promise<Solar[]> {
    return this.Solar.find(options);
  }

  /**
   *
   * @param id
   * @returns {Promise<Solar>}
   */
  async remove(id: string) {
    await this.Solar.deleteOne({
      _id: id
    }).exec();
  }
}
