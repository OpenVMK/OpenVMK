// registration.cct / CRegNameResubmit / construct

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rComponentsPage", undefined);
  setMeProp(_me, "m_sActiveName", "");
  setMeProp(_me, "m_rWindow", undefined);
  callMethod("WindowCreator", _this)
  callMethod("GenerateNames", _this)
  return 1;
}

