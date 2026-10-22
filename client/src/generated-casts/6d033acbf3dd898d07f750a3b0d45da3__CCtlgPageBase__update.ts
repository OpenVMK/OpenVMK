// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCtlgPageBase / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue, a_mpItemList: LingoValue, a_kAlteredCategory: LingoValue, a_kDefaultPage: LingoValue, a_mpPageToShowItemList: LingoValue) {
  if (lingoBinary("eq", a_kAlteredCategory, "index")) {
  callMethod("GetRooms", _this, a_mpItemList)
  }

  var t_kDefaultPage = symbol("clothes");
  if ((lingoTruthy(callNamed("voidp", a_kDefaultPage)) ? 0 : 1)) {
  t_kDefaultPage = a_kDefaultPage;
  }

  if (lingoBinary("neq", a_kAlteredCategory, "PageToShow")) {
  setMeProp(_me, "m_mp_CatalogData", a_mpItemList);
  } else {
  if ((lingoTruthy(callNamed("listp", meProp(_me, "m_mp_RoomDataList"))) ? 0 : 1)) {
  callMethod("GetRooms", _this, a_mpPageToShowItemList)
  }

  setMeProp(_me, "m_mp_CatalogData", a_mpPageToShowItemList);
  var t_kPage = callMethod("FindPageToShowTab", _this, a_mpItemList[1], a_mpItemList[2]);
  if (callNamed("voidp", t_kPage)) {
  t_kDefaultPage = symbol("clothes");
  } else {
  t_kDefaultPage = t_kPage;
  }

  }

  var t_updatedPage = 0;
  if (callNamed("voidp", meProp(_me, "m_rWindow"))) {
  var t_sID = callNamed("getUniqueID");
  if (callNamed("createWindow", t_sID)) {
  setMeProp(_me, "m_rWindow", callNamed("getWindow", t_sID));
  callMethod("registerClient", meProp(_me, "m_rWindow"), callMethod("getID", _this))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _this), symbol("mouseUp"))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _this), symbol("mouseDown"))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _this), symbol("keyDown"))
  if (callMethod("merge", meProp(_me, "m_rWindow"), "vmk_cat.window")) {
  callMethod("center", meProp(_me, "m_rWindow"))
  if (lingoBinary("neq", a_kAlteredCategory, "PageToShow")) {
  callMethod("_ChangePage", _this, t_kDefaultPage)
  } else {
  callMethod("_ChangePage", _this, t_kDefaultPage, "PageToShow", a_mpItemList)
  }

  t_updatedPage = 1;
  }

  }

  }

  if ((lingoTruthy(t_updatedPage) ? 0 : 1)) {
  callNamed("call", symbol("update"), new LingoList([meProp(_me, "m_rCurPageObj")]), a_mpItemList, a_kAlteredCategory)
  }

}

