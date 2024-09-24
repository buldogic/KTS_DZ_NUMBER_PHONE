import { action, computed, makeObservable } from 'mobx';
import { ValueModel } from './ValueModel';

export class DigitModel {
  readonly value: ValueModel<string>;
  readonly ref: ValueModel<HTMLInputElement | null>;
  constructor(value: string = '') {
    this.value = new ValueModel(value);
    this.ref = new ValueModel<HTMLInputElement | null>(null);

    makeObservable(this, {
      focus: action,
      change: action,
      digitValue: computed,
    });
  }

  get digitValue(): string {
    return this.value.value;
  }
  focus() {
    this.ref.value?.focus();
  }

  change(value: string) {
    this.value.change(value);
  }

  


}
