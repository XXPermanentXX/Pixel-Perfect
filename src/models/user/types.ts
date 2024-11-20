import { Prompt } from "../types";

export interface history{
  date:string,
  url:string
}
export interface User {
  userId:string;
  username: string;
  avatarUrl: string;
  email: string;
  promptRequest:Prompt,
}