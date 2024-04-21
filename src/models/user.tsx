export interface UserModel {
    id: string;
    first_name: string;
    second_name: string;
    email: string;
    is_present?: boolean;
    is_driver?: boolean;
}
  