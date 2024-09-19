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
  }, [setIsOpen, phoneModel.code.value]);

  const countryCode = Object.entries(CountryCode).map((option) => {
    const [key, value] = option;
    return (
      <div
      className={cn(s.item)}
      onClick={() => {
        setIsOpen(!isOpen);
        phoneModel.changeCode(value);
        phoneModel.changeDigitNext('', 0);
      }}
      key={key}
    >
      {value}
    </div>
    );
  
  });

  return  <div className={s.container}>
            <div className={s.code} ref={rootRef}>
              <input className={s.input} value={phoneModel.code.value} readOnly  />
              <img className={s.icon} src={DropImg} alt="Dropdown arrow"/>
              {isOpen && <div className={s.menuCode}>{countryCode}</div>}
            </div>
            {phoneModel.digits.value.map((digit, index) => (
              <input
                key={index}
                className={s.number}
                maxLength={1}
                value={digit.digitValue}
                onChange={(e) => phoneModel.changeDigitNext(e.target.value , index)}
                ref={(ref) => digit.ref.change(ref)}
                onFocus={() => digit.focus()}
                onKeyDownCapture={(e) => {
                  if (e.key === 'Backspace') {
                    phoneModel.changeDigitPrev(index);
                  }
                }}
              />
            ))}
          </div> 
}

export default observer(FormPhone)
