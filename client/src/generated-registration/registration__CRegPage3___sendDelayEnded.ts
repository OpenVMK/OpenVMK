// registration.cct / CRegPage3 / _sendDelayEnded

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _sendDelayEnded(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_bWaitForAnswer", 0);
}

