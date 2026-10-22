// vmk_safari_handler.cct / CStage / GetPowerups

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetPowerups(_me: LingoMe, i_type: LingoValue) {
  if (callNamed("voidp", i_type)) {
  return meProp(_me, "m_ar_powerups");
  } else {
  var tOut = new LingoList([]);
  for (var tItem of meProp(_me, "m_ar_powerups").toArray()) {
  if (lingoBinary("eq", tItem._type, i_type)) {
  callMethod("append", tOut, tItem)
  }

  }

  return tOut;
  }

}

