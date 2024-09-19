import { action, computed, makeObservable } from 'mobx';
import { CountryCode } from '../types';
import { DigitModel } from './DigitModel';
import { ValueModel } from './ValueModel';

export class FormPhoneStore {
  readonly code: ValueModel<CountryCode>;
  readonly digits: ValueModel<DigitModel[]>;

  constructor(code: CountryCode = CountryCode.RU, digits: DigitModel[] = []) {
    this.code = new ValueModel(code);
    this.digits = new ValueModel<DigitModel[]>(digits);

    makeObservable(this, {
      digitCount: computed,
      changeCode: action,
      changeDigitNext: action.bound,
      changeDigitPrev: action.bound,
    });
  }

  get digitCount(): number {
    return 10;
  }

  changeCode(code: CountryCode) {
    this.code.change(code);

    const newDigitArr = [];

    for (let i = 0; i < this.digitCount; i++) {
      newDigitArr.push(new DigitModel());
    }

    this.digits.change(newDigitArr);
  }

  changeDigitNext(value: string, index: number) {
    const digit = this.digits.value[index];
    const nextDigit = this.digits.value[index + 1];

    digit.value.change(value);

    if (index === this.digitCount - 1) return;

    return nextDigit.focus();
  }
  changeDigitPrev(index: number) {
    const prevDigit = this.digits.value[index - 1];
    const digit = this.digits.value[index];

    if (digit.value.value !== '') {
      return digit.value.reset();
    }

    if (index === 0) return;

    prevDigit.value.reset();
    return prevDigit.focus();
  }
}

export const phoneModel = new FormPhoneStore();
