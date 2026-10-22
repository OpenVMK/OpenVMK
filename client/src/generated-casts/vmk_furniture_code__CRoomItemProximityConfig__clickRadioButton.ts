// vmk_furniture_code.cct / CRoomItemProximityConfig / clickRadioButton

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function clickRadioButton(_me: LingoMe, a_sDir: LingoValue, a_sElemID: LingoValue) {
  var t_iLen = a_sElemID.length;
  var t_iValue = callNamed("value", a_sElemID.char.range(t_iLen, t_iLen));
  if (lingoBinary("eq", meProp(_me, "m_ar_configuration")[a_sDir], t_iValue)) {
  t_iValue = 0;
  }

  meProp(_me, "m_ar_configuration")[a_sDir] = t_iValue;
  setMeProp(_me, "m_bShowTiles", 1);
  setMeProp(_me, "m_bReady", 0);
  callMethod("activateDirection", _me, a_sDir, t_iValue)
}

