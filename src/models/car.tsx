import { UserModel } from "./user";

export interface Car {
  id: number;
  name: string;
  max_person: number;
  matricule: string;
  start_hour: string;
  start_address: string;
  passagers: UserModel[];
}
