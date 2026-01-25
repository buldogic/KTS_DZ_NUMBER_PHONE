import { action, computed, makeObservable, observable } from 'mobx';

type PrivateValue = '_value' | '_isOpen'

export class CountryCodeModel<T = string> {
  protected _value: T;
  protected initialValue: T;
  protected _isOpen: boolean;

  constructor(value: T) {
    this._value = value;
    this.initialValue = value;
    this._isOpen = false;

    makeObservable<CountryCodeModel<T>, PrivateValue>(this, {
      _isOpen: observable,
      _value: observable,
      value: computed,
      isOpen: computed,
      setIsOpen: action.bound,
      change: action.bound,
      reset: action.bound,
    });
  }


  get value(): T {
    return this._value;
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  setIsOpen(v: boolean) {
    return this._isOpen = v;
  }

  change(value: T): void {
    if (value === this._value) {
      return;
    }
    this._value = value;
  }

  reset(): void {
    this.change(this.initialValue);
  }
}
