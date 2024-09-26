import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { phoneModel } from '../models';

import CountryCodeModal from './countryCodeModal/CountryCodeModal';
import InputsNumber  from './inputsNumber';
import s from './FormPhone.module.scss'


const FormPhone = () => {

  return  <div className={s.container}>
              <CountryCodeModal store={phoneModel}/>
              <InputsNumber store={phoneModel}/>
            <div>
              <button className={s.btn} onClick={() => phoneModel.onChangeValue()}>Results</button>
            </div>
          </div> 
}

export default observer(FormPhone)
