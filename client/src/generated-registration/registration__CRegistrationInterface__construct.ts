// registration.cct / CRegistrationInterface / construct

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_bInitialized", 0);
  setMeProp(_me, "m_rCurPageObj", undefined);
  setMeProp(_me, "m_bAllClothesLoaded", 0);
  setMeProp(_me, "m_mp_SavedDataWhileLoading", undefined);
  setMeProp(_me, "m_obj_NameRejectionWindow", undefined);
  return 1;
}

