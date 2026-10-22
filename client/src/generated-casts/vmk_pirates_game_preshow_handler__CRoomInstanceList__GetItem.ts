// vmk_pirates_game_preshow_handler.cct / CRoomInstanceList / GetItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetItem(_me: LingoMe, i_iIndex: LingoValue) {
  return meProp(_me, "m_ar_pTopics")[i_iIndex];
}

