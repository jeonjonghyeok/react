import {PlatformTest} from "@tsed/common";
import {TypeORMService} from "@tsed/typeorm";
import {expect} from "chai";
import {MemoryStorage} from "../storage/MemoryStorage";
import EmployeeRepository from "../../repositories/EmployeeRepository";
import {CalendarsService} from "./CalendarsService";

describe("CalendarsService", () => {
  before(() => PlatformTest.create());
  before(() => PlatformTest.reset());

  describe("without IOC", () => {
    it("should do something", () => {
      /* new EmployeeRepository(), */
      expect(new CalendarsService(new MemoryStorage(), new EmployeeRepository(), new TypeORMService())).to.be.an.instanceof(
        CalendarsService
      );
    });
  });

  describe("with inject()", () => {
    it("should get the service from the inject method", PlatformTest.inject(
      [CalendarsService],
      (calendarsService: CalendarsService) => {
        expect(calendarsService).to.be.an.instanceof(CalendarsService);
      }
    ));
  });

  describe("via PlatformTest to mock other service", () => {
    it("should get the service from InjectorService", async () => {
      // GIVEN
      const memoryStorage = {
        set: () => {
        },
        get: () => {
        }
      };

      // WHEN
      const calendarsService: CalendarsService = await PlatformTest.invoke(
        CalendarsService,
        [{token: MemoryStorage, use: memoryStorage}]
      );

      // THEN
      expect(calendarsService).to.be.an.instanceof(CalendarsService);
      // @ts-ignore
      expect(calendarsService.memoryStorage).to.equal(memoryStorage);
    });
  });
});
