
export interface promptRequest{
  aspectRatio:string,
  diffusionSteps:number
  filename:string,
  generationSeed:string,
  influence:number,
  keywords:string[],
  model:string,
  prompt:string,
  refine:boolean,
  triggerWord:string,
  type:string
}
export interface history{
  date:string,
  url:string
}
export interface User {
  userId:string;
  username: string;
  avatarUrl: string;
  email: string;
  promptRequest:promptRequest 
}