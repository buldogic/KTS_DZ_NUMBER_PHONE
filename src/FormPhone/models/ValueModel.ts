import { action, computed, makeObservable, observable } from 'mobx';

export class ValueModel<T = string> {
  protected _value: T;
  protected initialValue: T;

  constructor(value: T) {
    this._value = value;
    this.initialValue = value;

    makeObservable<ValueModel<T>, '_value'>(this, {
      _value: observable,
      value: computed,
      change: action.bound,
      reset: action.bound,
    });
  }

  get value(): T {
    return this._value;
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
