import { UserModel } from "./user";

export interface Weekend {
    id: number;
    name: string;
    address: string;
    date_debut: string;
    date_fin: string;
    participants: UserModel[];
    sharing_code: string;
    tricount_link: string;
    reservation_link: string;
    status: string;
}
  