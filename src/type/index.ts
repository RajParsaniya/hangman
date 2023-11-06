import { IHangman } from "../interfaces";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type HangmanValue = IHangman<string | undefined>;
export type HangmanBodyPart = IHangman<boolean>;
