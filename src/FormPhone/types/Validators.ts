import { Nullable } from './Values';

type ErrorString = string;

export type ValidatorResult<ErrorResult = ErrorString> = Nullable<ErrorResult>;

export type Validator<T, E = ErrorString> = (value: T) => ValidatorResult<E>;
