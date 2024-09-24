import { CountryCode } from "./Enam";

export type Nullable<Value> = Value | null;

export type Digital = string

export const  Mask = {
  [CountryCode.AUS]: '(***)-***-****',
  [CountryCode.AUT]: '(****)-****',
  [CountryCode.RU]: '(***)-***-**-**',
  [CountryCode.UA]: '(***)-***-**-**',
  [CountryCode.UK]: '(***)-***-**-**',
  [CountryCode.US]: '(***)-***-**-**',
  [CountryCode.UZ]: '(***)-***-**-**',
  [CountryCode.BY]: '(***)-***-**-**',
  [CountryCode.KGZ]: '(***)-*****-**',
  [CountryCode.IN]: '(***)-*****-**',
  [CountryCode.IR]: '(***)***-****',
}