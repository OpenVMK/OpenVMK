// vmk_central_handler.cct / HMMickeyDetailsList / createTopics

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
  for (var tListItem of a_mp_List.toArray()) {
  var t_sName = lingoBinary("joinPad", tListItem.date, callNamed("getText", lingoBinary("join", "hidden.mickey.", callMethod("padNum", _me, tListItem.id, 3))));
  var t_Obj = callMethod("createTopCategory", _me, t_sName, 0, callMethod("duplicate", tListItem));
  }

  setMeProp(_me, "m_mp_List", a_mp_List);
  callMethod("render", _me)
  return meProp(_me, "m_Img");
}

