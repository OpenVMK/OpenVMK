// registration.cct / CRegistrationInterface / AllClothesLoaded

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AllClothesLoaded(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_bAllClothesLoaded", 1);
}

