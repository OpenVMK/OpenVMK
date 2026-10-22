// vmk_hm_lobby_handler.cct / CHMLobbyInterface / RefreshGameRooms

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RefreshGameRooms(_me: LingoMe) {
  callMethod("clear", meProp(_me, "m_rRoomInstanceList"))
  var t_mp_topics = new LingoPropList([]);
  var i = 1;
  var t_iCount = meProp(_me, "m_ar_instanceTitles").count;
  for (var tInstance of meProp(_me, "m_ar_instances").toArray()) {
  if (lingoBinary("lt", t_iCount, lingoBinary("add", i, 1))) {
  i = 1;
  }

  callMethod("addProp", t_mp_topics, meProp(_me, "m_ar_instanceTitles")[i], tInstance)
  i = lingoBinary("add", i, 1);
  }

  callMethod("createTopics", meProp(_me, "m_rRoomInstanceList"), t_mp_topics)
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sPeerlistWndTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  var tList = callMethod("getElement", tWndObj, "hm.selectroom.list");
  if (lingoBinary("neq", tList, 0)) {
  callMethod("setProperty", tList, symbol("ink"), 36)
  callMethod("feedImage", tList, callMethod("getImage", meProp(_me, "m_rRoomInstanceList")))
  callNamed("updateStage")
  } else {
  return callNamed("error", _me, "List not found in window", symbol("RefreshGameRooms"));
  }

  }

}

