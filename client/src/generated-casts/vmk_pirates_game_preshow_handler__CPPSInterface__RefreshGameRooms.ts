// vmk_pirates_game_preshow_handler.cct / CPPSInterface / RefreshGameRooms

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
  for (var tInstance of meProp(_me, "m_ar_instances").toArray()) {
  if (lingoBinary("gt", i, meProp(_me, "m_ar_instanceTitles").count)) {
  i = 1;
  }

  callMethod("addProp", t_mp_topics, meProp(_me, "m_ar_instanceTitles")[lingoBinary("add", tInstance.id, 1)], tInstance)
  i = lingoBinary("add", i, 1);
  }

  callMethod("createTopics", meProp(_me, "m_rRoomInstanceList"), t_mp_topics)
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sPeerlistWndTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  var tList = callMethod("getElement", tWndObj, "pirates.selectroom.list");
  callMethod("setProperty", tList, symbol("ink"), 36)
  callMethod("feedImage", tList, callMethod("getImage", meProp(_me, "m_rRoomInstanceList")))
  callNamed("updateStage")
  }

}

