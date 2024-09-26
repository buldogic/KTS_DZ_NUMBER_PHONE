import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { FormPhoneStore } from '../../models'

import s from './InputsNumber.module.scss'
type Props = {
  store: FormPhoneStore
}

const InputsNumber: React.FC<Props> = ({store}) => {

  return store.digits.value.map((digit, index) => {
    return store.onInput(digit.digitValue) ? <span key={index}> {digit.digitValue} </span> :  (
      <input
        key={index}
        className={s.number}
        maxLength={1}
        value={digit.digitValue === '*' ? '' : digit.digitValue}
        onChange={(e) => {
          if (/[^0-9]$/.test(e.target.value)) return
          store.changeDigitNext(e.target.value , index)}}
          ref={(ref) => digit.ref.change(ref)}
        onKeyDownCapture={(e) => {
          if (e.key === 'Backspace') {
            store.changeDigitPrev(index);
          }
         }}
      />
    )
  })
}

export default observer(InputsNumber)