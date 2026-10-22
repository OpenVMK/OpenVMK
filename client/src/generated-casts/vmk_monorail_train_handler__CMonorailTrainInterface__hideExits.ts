// vmk_monorail_train_handler.cct / CMonorailTrainInterface / hideExits

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hideExits(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "m_pExits").count, 0)) {
  callMethod("findExits", _me)
  }

  for (var t_exit of meProp(_me, "m_pExits").toArray()) {
  callMethod("SetParam", t_exit, "CLASS", "hide")
  }

  for (var t_exit of meProp(_me, "m_pTileExits").toArray()) {
  callMethod("SetParam", t_exit, "CLASS", "tile")
  }

}

