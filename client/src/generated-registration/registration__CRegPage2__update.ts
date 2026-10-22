// registration.cct / CRegPage2 / update

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue, a_mp_kType_mp_iRef_rItem: LingoValue, a_kAlteredCategory: LingoValue) {
  setMeProp(_me, "m_ar_AvatarData", a_mp_kType_mp_iRef_rItem);
  switch (a_kAlteredCategory) {
case "AvatarCreated":
  setMeProp(_me, "m_bDataGathered", 1);
  break;
case "AvatarNames":
  callMethod("_SuggestNames", _this)
  break;
  }

}

