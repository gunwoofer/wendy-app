import { Weekend } from "../models/weekend";
import { Action } from 'easy-peasy';

export interface StoreModel {
  currentWeekend: Weekend | undefined;
  availableWeekends: Weekend[];
  setWeekend: Action<StoreModel, Weekend>;
}