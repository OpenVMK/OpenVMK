// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CScale9Grid / setIcon

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setIcon(_me: LingoMe, t_sIcon: LingoValue, t_sIconAlign: LingoValue) {
  setMeProp(_me, "m_sIcon", t_sIcon);
  if ((lingoTruthy(callNamed("voidp", t_sIconAlign)) ? 0 : 1)) {
  setMeProp(_me, "m_sIconAlign", t_sIconAlign);
  }

  if (callNamed("voidp", meProp(_me, "m_sIconAlign"))) {
  setMeProp(_me, "m_sIconAlign", "CENTER");
  }

  if (lingoBinary("neq", meProp(_me, "m_sIcon"), "")) {
  callMethod("setIconImage", _me, callMethod("duplicate", callNamed("member", meProp(_me, "m_sIcon")).image))
  } else {
  callMethod("setIconImage", _me, undefined)
  }

}

