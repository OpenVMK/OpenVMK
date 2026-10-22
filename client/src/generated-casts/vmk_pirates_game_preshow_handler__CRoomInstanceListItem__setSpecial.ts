// vmk_pirates_game_preshow_handler.cct / CRoomInstanceListItem / setSpecial

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setSpecial(_me: LingoMe, a_bSpecial: LingoValue) {
  setMeProp(_me, "m_bSpecial", a_bSpecial);
  callMethod("render", _me)
}

