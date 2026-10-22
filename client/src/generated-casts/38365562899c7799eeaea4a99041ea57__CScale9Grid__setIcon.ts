// 38365562899c7799eeaea4a99041ea57.cct / CScale9Grid / setIcon

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
  if (callNamed("voidp", t_sIconAlign)) {
  t_sIconAlign = "CENTER";
  }

  setMeProp(_me, "m_sIconAlign", t_sIconAlign);
  if (lingoBinary("neq", meProp(_me, "m_sIcon"), "")) {
  callMethod("setIconImage", _me, callMethod("duplicate", callNamed("member", meProp(_me, "m_sIcon")).image))
  } else {
  callMethod("setIconImage", _me, undefined)
  }

}

