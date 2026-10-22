// vmk_hm_lobby_handler.cct / CRoomInstanceList / createTopics

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createTopics(_me: LingoMe, a_mp_List: LingoValue) {
  callMethod("clear", _me)
  var t_mp_list = new LingoPropList([]);
  setMeProp(_me, "m_objTopics", undefined);
  var m_pImage = undefined;
  setMeProp(_me, "m_ar_pTopics", new LingoList([]));
  setMeProp(_me, "m_ar_pLinks", new LingoList([]));
  setMeProp(_me, "m_ar_rects", new LingoList([]));
  setMeProp(_me, "m_mpOrigServerData", a_mp_List);
  for (var i = 1; i <= a_mp_List.count; ++i) {
  var t_sName = callMethod("getPropAt", a_mp_List, i);
  var t_Obj = callMethod("createTopCategory", _me, t_sName, 0, a_mp_List[i]);
  }

  setMeProp(_me, "m_mp_List", a_mp_List);
  callMethod("render", _me)
  return meProp(_me, "m_Img");
}

