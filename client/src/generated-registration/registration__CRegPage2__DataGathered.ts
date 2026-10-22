// registration.cct / CRegPage2 / DataGathered

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DataGathered(_me: LingoMe, _this: LingoValue) {
  return meProp(_me, "m_bDataGathered");
}

