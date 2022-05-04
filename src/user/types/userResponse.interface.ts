import { User } from "../user.entity";
import { UserType } from "./user.types";

export interface UserResponseInterface {
    user: UserType & { token: string};
}