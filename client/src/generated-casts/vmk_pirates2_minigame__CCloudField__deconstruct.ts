// vmk_pirates2_minigame.cct / CCloudField / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  var tThread = callNamed("getThread", "minigame");
  if (lingoBinary("neq", tThread, 0)) {
  for (var tCloud of meProp(_me, "m_ar_clouds").toArray()) {
  callMethod("FreeObject", callMethod("GetObjectPool", meProp(_me, "m_rGameEng")), tCloud)
  }

  }

  setMeProp(_me, "m_ar_clouds", new LingoList([]));
  return 1;
}

