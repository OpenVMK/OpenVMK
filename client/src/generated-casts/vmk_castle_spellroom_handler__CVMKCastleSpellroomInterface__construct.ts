// vmk_castle_spellroom_handler.cct / CVMKCastleSpellroomInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("initSpellRoom"))
  setMeProp(_me, "m_ar_spellSprites", new LingoList([]));
  setMeProp(_me, "m_pExits", new LingoList([]));
  setMeProp(_me, "m_pTileExits", new LingoList([]));
  return 1;
}

