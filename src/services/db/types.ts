import { UserInfo } from "firebase/auth";

export type UserData = UserInfo & {};

export type BareUserData = Pick<
  UserData,
  "uid" | "displayName" | "photoURL" | "email" | "phoneNumber"
>;

export type UnknownUserData = UserData | BareUserData;
