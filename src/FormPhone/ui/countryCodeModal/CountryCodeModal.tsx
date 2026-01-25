import cn from 'classnames';
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import DropImg from '../../../img/DropImg.png'
import { FormPhoneStore } from '../../models'
import { CountryCode } from '../../types';



import s from './CountryCodeModal.module.scss'

type Props = {
  store: FormPhoneStore,
}
const CountryCodeModal: React.FC<Props> = ({store}) => {
  const {isOpen, setIsOpen, value, change} = store.code

  const countryCode = Object.entries(CountryCode).map((option) => {
    const [key, value] = option;
    return (
      <div
      className={cn(s.item)}
      onClick={() => {
        setIsOpen(!isOpen);
        change(value)
        store.changeCode(value);
      }}
      key={key}
    >
      {value}
    </div>
    );
  });

return  <button className={s.button} onClick={() => setIsOpen(!isOpen)} >
          <input className={s.input} value={value} readOnly  />
          <img className={s.icon} src={DropImg} alt="Dropdown arrow"/>
          {isOpen && <div className={s.menuCode}>{countryCode}</div>}
        </button> 
}

export default observer(CountryCodeModal)