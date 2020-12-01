import { Property, Req, Required } from "@tsed/common";
import { Model, ObjectID } from "@tsed/mongoose";

@Model()
export class Solar {
  //누적발전량
  @Required()
  cumulative_power_generation: number;
  
  //잉여전력 감소량
  @Required()
  surplus_power_reduction: number;
  
  //전,금년도 잉여전력, 잉여전력 감소율
  @Required()
  surplus_power_2019: number;
  @Required()
  surplus_power_2020: number;
  @Required()
  surplus_power_rate: number;
  
  //금일, 금월, 금년 전력
  @Required()
  power_this_day: number;
  @Required()
  power_this_month: number;
  @Required()
  power_this_year: number;
  
  //전일, 전월, 전년 전력
  @Required()
  power_previous_day: number;
  @Required()
  power_previous_month: number;
  @Required()
  power_previous_year: number;
  
  //설비용량, CO2감소량, 식수효과
  @Required()
  facility_capacity: number;
  @Required()
  co2_reduction: number;
  @Required()
  drinking_water_effect: number;

}
