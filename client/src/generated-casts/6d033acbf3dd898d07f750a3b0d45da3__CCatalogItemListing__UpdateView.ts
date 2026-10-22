// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogItemListing / UpdateView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateView(_me: LingoMe, a_Pnt: LingoValue) {
  var t_mpList = meProp(_me, "m_ar_rects");
  if (lingoBinary("gt", t_mpList[t_mpList.count].bottom, a_Pnt.locV)) {
  for (var i = 1; i <= t_mpList.count; ++i) {
  if ((lingoTruthy(lingoBinary("gt", a_Pnt.locV, meProp(_me, "m_ar_rects")[i].bottom)) ? 0 : 1)) {
  var t_iPos = i;
  break;
  }

  }

  if (lingoBinary("and", lingoBinary("lt", t_mpList[t_iPos].left, a_Pnt.locH), lingoBinary("gt", t_mpList[t_iPos].right, a_Pnt.locH))) {
  var t_iType = callMethod("GetType", meProp(_me, "m_ar_pTopics")[t_iPos]);
  }

  }

  switch (t_iType) {
case 1:
  callMethod("setState", meProp(_me, "m_ar_pTopics")[t_iPos])
  var t_bUpdate = callMethod("UpdateTopics", _me, callMethod("getText", meProp(_me, "m_ar_pTopics")[t_iPos]));
  if (t_bUpdate) {
  callMethod("createTopics", _me, meProp(_me, "m_mpOrigServerData"))
  }

  setMeProp(_me, "m_sCurrentLand", callMethod("getLand", meProp(_me, "m_ar_pTopics")[t_iPos]));
  break;
case 2:
  for (var f = 1; f <= meProp(_me, "m_ar_pTopics").count; ++f) {
  if (callMethod("GetState", meProp(_me, "m_ar_pTopics")[f])) {
  callMethod("setState", meProp(_me, "m_ar_pTopics")[f], 0)
  callMethod("RenderOne", _me, f)
  }

  }

  callMethod("setState", meProp(_me, "m_ar_pTopics")[t_iPos], 1)
  callMethod("RenderOne", _me, t_iPos)
  var t_iLink = callMethod("getLink", meProp(_me, "m_ar_pTopics")[t_iPos]);
  setMeProp(_me, "m_iCategoryId", t_iLink);
  setMeProp(_me, "m_sCurrentLand", callMethod("getLand", meProp(_me, "m_ar_pTopics")[t_iPos]));
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 16, new LingoPropList([symbol("int"), t_iLink]))
  break;
  }

  return meProp(_me, "m_Img");
}

