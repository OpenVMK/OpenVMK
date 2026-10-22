// vmk_pirates2_game_preshow_handler.cct / CRoomInstanceList / clear

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function clear(_me: LingoMe) {
  for (var tObj of meProp(_me, "m_ar_pTopics").toArray()) {
  callNamed("removeObject", callMethod("getID", tObj))
  }

}

