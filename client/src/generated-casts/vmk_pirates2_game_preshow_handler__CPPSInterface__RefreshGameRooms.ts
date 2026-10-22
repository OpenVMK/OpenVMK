// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / RefreshGameRooms

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
  var t_ar_filteredInstances = new LingoList([]);
  if (lingoBinary("and", callNamed("listp", meProp(_me, "m_ar_instances")), lingoBinary("gt", meProp(_me, "m_ar_instances").count, 1))) {
  var t_OneEmptyAdded = 0;
  for (var i = 1; i <= meProp(_me, "m_ar_instances").count; ++i) {
  if (lingoBinary("gt", meProp(_me, "m_ar_instances")[i].population, 0)) {
  callMethod("add", t_ar_filteredInstances, meProp(_me, "m_ar_instances")[i])
  continue;
  }

  if ((lingoTruthy(t_OneEmptyAdded) ? 0 : 1)) {
  callMethod("add", t_ar_filteredInstances, meProp(_me, "m_ar_instances")[i])
  t_OneEmptyAdded = 1;
  }

  }

  } else {
  t_ar_filteredInstances = meProp(_me, "m_ar_instances");
  }

  for (var tInstance of t_ar_filteredInstances.toArray()) {
  if (lingoBinary("gt", i, meProp(_me, "m_ar_instanceTitles").count)) {
  i = 1;
  }

  callMethod("addProp", t_mp_topics, meProp(_me, "m_ar_instanceTitles")[i], tInstance)
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

