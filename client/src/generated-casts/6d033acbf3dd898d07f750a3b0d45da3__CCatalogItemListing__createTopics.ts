// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogItemListing / createTopics

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createTopics(_me: LingoMe, a_mp_List: LingoValue) {
  var t_mp_list = new LingoPropList([]);
  setMeProp(_me, "m_objTopics", undefined);
  var m_pImage = undefined;
  setMeProp(_me, "m_ar_pTopics", new LingoList([]));
  setMeProp(_me, "m_ar_pLinks", new LingoList([]));
  setMeProp(_me, "m_ar_rects", new LingoList([]));
  setMeProp(_me, "m_mpOrigServerData", a_mp_List);
  for (var i = 1; i <= a_mp_List.count; ++i) {
  var t_sName = callNamed("string", callMethod("getPropAt", a_mp_List, i));
  var t_iID = a_mp_List[i].id;
  if (lingoBinary("neq", t_iID, 10)) {
  var t_iState = a_mp_List[i].state;
  var t_iLandId = a_mp_List[i].id;
  callMethod("addProp", t_mp_list, t_sName, new LingoPropList([]))
  callMethod("addProp", t_mp_list[t_sName], symbol("state"), t_iState)
  var t_Obj = callMethod("createTopCategory", _me, t_sName, t_iState, t_iLandId);
  var t_iLand = a_mp_List[i].id;
  callMethod("addProp", t_mp_list[t_sName], symbol("object"), t_Obj)
  var t_iPos = callMethod("findPos", meProp(_me, "m_mpTopicByObject"), t_iID);
  if (callNamed("voidp", t_iPos)) {
  var t_sID2 = callNamed("string", t_iID);
  callMethod("addProp", meProp(_me, "m_mpTopicByObject"), t_sID2, new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mpTopicByObject")[t_sID2], symbol("top"), t_Obj)
  callMethod("addProp", meProp(_me, "m_mpTopicByObject")[t_sID2], symbol("bottom"), new LingoList([]))
  }

  if (lingoBinary("gt", t_iState, 0)) {
  for (var e = 2; e <= a_mp_List[i].count; ++e) {
  if (callNamed("listp", a_mp_List[i][e])) {
  t_sName = callMethod("getPropAt", a_mp_List[i], e);
  var t_sID = lingoBinary("join", callMethod("getPropAt", a_mp_List[i], e), t_iLandId);
  t_iState = a_mp_List[i][e].state;
  callMethod("addProp", t_mp_list, t_sID, new LingoPropList([]))
  callMethod("addProp", t_mp_list[t_sID], symbol("state"), t_iState)
  var t_iLink = a_mp_List[i][e].id;
  var t_sSpecial = a_mp_List[i][e].special;
  t_Obj = callMethod("createSubCategory", _me, t_sName, t_iState, t_iLink, t_sSpecial, t_iLand);
  callMethod("addProp", t_mp_list[t_sID], "Obj", t_Obj)
  if (callMethod("findPos", meProp(_me, "m_mpTopicByObject"), callNamed("string", t_iID))) {
  callMethod("add", meProp(_me, "m_mpTopicByObject")[callNamed("string", t_iID)].bottom, t_Obj)
  }

  }

  }

  }

  }

  }

  setMeProp(_me, "m_mp_List", t_mp_list);
  callMethod("render", _me)
  return meProp(_me, "m_Img");
}

