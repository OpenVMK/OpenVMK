// vmk_hm_lobby_handler.cct / CRoomInstanceList / GetSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSelected(_me: LingoMe) {
  var tSelected = 0;
  for (var i = 1; i <= meProp(_me, "m_ar_pTopics").count; ++i) {
  if (callMethod("GetState", meProp(_me, "m_ar_pTopics")[i])) {
  return i;
  }

  }

  return tSelected;
}

