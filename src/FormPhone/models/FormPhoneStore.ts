import { action, makeObservable } from 'mobx';
import { CountryCode, Mask } from '../types';
import { CountryCodeModel } from './CountryCodeModel';
import { DigitModel } from './DigitModel';
import { ValueModel } from './ValueModel';

export class FormPhoneStore {
  readonly code: CountryCodeModel<CountryCode>;
  readonly mask: ValueModel<string>;
  readonly digits: ValueModel<DigitModel[]>;

  constructor(
    code: CountryCode = CountryCode.RU,
    digits: DigitModel[] = Mask[CountryCode.RU].split('').map((digit) => new DigitModel(digit)),
    mask: string = Mask[CountryCode.RU],
  ) {
    this.code = new CountryCodeModel(code);
    this.digits = new ValueModel<DigitModel[]>(digits);
    this.mask = new ValueModel(mask);

    makeObservable(this, {
      changeCode: action,
      changeDigitNext: action.bound,
      changeDigitPrev: action.bound,
      onInput: action.bound,
    });
  }

  onInput(value: string): boolean {
    return value === '(' || value == ')' || value === '-';
  }

  changeCode(code: CountryCode) {
    this.mask.change(Mask[code]);
    this.digits.reset();

    const newDigitArr = [];

    for (let i = 0; i < this.mask.value.length; i = i + 1) {
      newDigitArr.push(new DigitModel(!this.onInput(this.mask.value[i]) ? '' : this.mask.value[i]));
    }

    this.digits.change(newDigitArr);
  }

  changeDigitNext(value: string, index: number) {
    const digit = this.digits.value[index];
    const nextDigit = this.digits.value[index + 1];

    digit.value.change(value);
    if (index === this.mask.value.length - 1) return;

    if (nextDigit.ref.value === null) {
      this.changeDigitNext(nextDigit.value.value, index + 1);
    }
    this.digits.value[index].change(value);
    return nextDigit.focus();
  }
  changeDigitPrev(index: number) {
    const prevDigit = this.digits.value[index - 1];
    const digit = this.digits.value[index];

    if (index === 0) return;

    if (prevDigit.ref.value === null) {
      this.changeDigitPrev(index - 1);
    }

    if (index === this.mask.value.length - 1 && digit.value.value !== '*') {
      digit.value.reset();
      return digit.focus();
    }
    prevDigit.value.reset();
    return prevDigit.focus();
  }

  onChangeValue() {
    const value = `${this.code.value}${this.digits.value.map((digit) => (digit.digitValue !== '' ? digit.digitValue : '*')).join('')}`;
    console.log(value);
  }
}

export const phoneModel = new FormPhoneStore();
