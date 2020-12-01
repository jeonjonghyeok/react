import {BodyParams, Controller, Delete, Get, PathParams, Post, Put} from "@tsed/common";
import {NotFound} from "@tsed/exceptions";
import {Description, Required, Returns, Status, Summary} from "@tsed/schema";
import {Solar} from "../../models/energy/Solar";
import {SolarService} from "../../services/energy/SolarService";

/**
 * Add @Controller annotation to declare your class as Router controller.
 * The first param is the global path for your controller.
 * The others params is the controller dependencies.
 *
 * In this case, EventsCtrl is a dependency of CalendarsCtrl.
 * All routes of EventsCtrl will be mounted on the `/calendars` path.
 */
@Controller({
  path: "/energy",
})
export class EnergyCtrl {
  constructor(private solarService: SolarService) {}

  @Get("/solar")
  @Summary("Return a Solar")
  @(Status(200, Solar).Description("Success"))
  async get(): Promise<Solar> {
    const energy = await this.solarService.findOne();

    if (energy) {
      return energy;
    }

    throw new NotFound("Solar not found");
  }

  @Post("/solar")
  @Summary("Create a new Solar")
  @(Returns(201, Solar).Description("Created"))
  save(
    @Description("Solar model")
    @BodyParams()
    @Required()
    solar: Solar
  ) {
    return this.solarService.save(solar);
  }

//   @Put("/:id")
//   @Summary("Update calendar information")
//   @(Returns(200, Calendar).Description("Success"))
//   async update(@PathParams("id") @CalendarId() id: string, @BodyParams() @Required() calendar: Calendar): Promise<Calendar> {
//     calendar._id = id;

//     return this.calendarsService.save(calendar);
//   }

//   @Delete("/:id")
//   @Summary("Remove a calendar.")
//   @(Returns(204).Description("No content"))
//   async remove(@PathParams("id") @CalendarId() id: string): Promise<void> {
//     await this.calendarsService.remove(id);
//   }

//   @Get("/")
//   @Summary("Return all calendars")
//   @(Returns(200, Array).Of(Calendar))
//   async getAllCalendars(): Promise<Calendar[]> {
//     return this.calendarsService.query();
//   }
}
