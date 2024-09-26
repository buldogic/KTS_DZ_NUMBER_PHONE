import cn from 'classnames';
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { CountryCode } from '../../FormPhone';
import DropImg from '../../img/DropImg.png'
import { phoneModel } from '../models';

import s from './FormPhone.module.scss'


const FormPhone = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);



  React.useEffect(() => {

    const handleClick = (e: MouseEvent) => {
      if (!rootRef.current) return;

      if (!(e.target instanceof Element)) return;

      const isOpen = rootRef.current.contains(e.target);

      setIsOpen(isOpen);
    };

    window.document.addEventListener('click', handleClick);
    return () => {
      window.document.removeEventListener('click', handleClick);
    };
  }, [ phoneModel.code.value ]);

  const countryCode = Object.entries(CountryCode).map((option) => {
    const [key, value] = option;
    return (
      <div
      className={cn(s.item)}
      onClick={() => {
        setIsOpen(!isOpen);
        phoneModel.changeCode(value);
      }}
      key={key}
    >
      {value}
    </div>
    );
  });

  const InputNumber = phoneModel.digits.value.map((digit, index) => {

   return phoneModel.onInput(digit.digitValue) ? <span key={index}> {digit.digitValue} </span> :  (
    <input
    key={index}
    className={s.number}
    maxLength={1}
    value={digit.digitValue === '*' ? '' : digit.digitValue}
    onChange={(e) => {
      if (/[^0-9]$/.test(e.target.value)) return
      phoneModel.changeDigitNext(e.target.value , index)}}
    ref={(ref) => digit.ref.change(ref)}
    onKeyDownCapture={(e) => {
      if (e.key === 'Backspace') {
        phoneModel.changeDigitPrev(index);
      }
    }}
  />
   )
  })

  return  <div className={s.container}>
            <div className={s.code} ref={rootRef}>
              <input className={s.input} value={phoneModel.code.value} readOnly  />
              <img className={s.icon} src={DropImg} alt="Dropdown arrow"/>
              {isOpen && <div className={s.menuCode}>{countryCode}</div>}
            </div>
               {InputNumber}
            <div>
            <button className={s.btn} onClick={() => phoneModel.onChangeValue()}>Results</button>
            </div>
          </div> 
}

export default observer(FormPhone)
