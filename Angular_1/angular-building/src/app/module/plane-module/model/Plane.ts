import {PlaneStatus} from "./PlaneStatus";
import {PlaneType} from "./PlaneType";
import {Stage} from "./Stage";

export interface Plane {
  imgs?: string;
  id?:number,
  area?:number,
  price?:number,
  management_costs?:number,
  planeStatus?:PlaneStatus,
  planeType?:PlaneType,
  stage?:Stage
}
