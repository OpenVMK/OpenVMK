// vmk_castle_spellroom_handler.cct / CVMKCastleSpellroomInterface / showExits

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showExits(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "m_pExits").count, 0)) {
  callMethod("findExits", _me)
  }

  for (var t_exit of meProp(_me, "m_pExits").toArray()) {
  callMethod("SetParam", t_exit, "CLASS", "exit")
  }

  for (var t_exit of meProp(_me, "m_pTileExits").toArray()) {
  callMethod("SetParam", t_exit, "CLASS", "exit")
  }

}

