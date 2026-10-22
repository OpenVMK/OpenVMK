// vmk_hm_lobby_handler.cct / CRoomInstanceList / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, a_mp_List: LingoValue, a_sWndName: LingoValue) {
  setMeProp(_me, "m_rWndObj", a_sWndName);
  callMethod("createTopics", _me, a_mp_List)
  return meProp(_me, "m_Img");
}

