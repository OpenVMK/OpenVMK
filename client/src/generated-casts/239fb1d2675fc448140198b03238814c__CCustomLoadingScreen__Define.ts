// 239fb1d2675fc448140198b03238814c.cct / CCustomLoadingScreen / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, _this: LingoValue, a_iRoomID: LingoValue) {
  var t_rConf = callNamed("GetLoadingScreenConfigurationObj");
  setMeProp(_me, "m_arConf", callMethod("getConfigurationForRoom", t_rConf, a_iRoomID));
  if (callNamed("voidp", meProp(_me, "m_arConf"))) {
  a_iRoomID = -float(1);
  setMeProp(_me, "m_arConf", callMethod("getConfigurationForRoom", t_rConf, a_iRoomID));
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_arConf"))) ? 0 : 1)) {
  if (callNamed("createWindow", "room_custom_load_wnd", "vmk_customload.window", 0, 0)) {
  var t_rWnd = callNamed("getWindow", "room_custom_load_wnd");
  callMethod("center", t_rWnd)
  if ((lingoTruthy(callMethod("ResourcesReady", t_rConf, a_iRoomID)) ? 0 : 1)) {
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_arConf")[4], symbol("img")))) ? 0 : 1)) {
  callNamed("registerDownloadCallback", callMethod("GetMemnumForUrl", t_rConf, callMethod("getaProp", meProp(_me, "m_arConf")[4], symbol("img"))), symbol("FeedBackground"), callMethod("getID", _this), undefined)
  } else {
  callMethod("FeedBackground", _this)
  }

  for (var i = 1; i <= 3; ++i) {
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_arConf")[i], symbol("img")))) ? 0 : 1)) {
  var t_iIndex = i;
  callNamed("registerDownloadCallback", callMethod("GetMemnumForUrl", t_rConf, callMethod("getaProp", meProp(_me, "m_arConf")[i], symbol("img"))), symbol("FeedImageSlot"), callMethod("getID", _this), t_iIndex)
  } else {
  callMethod("FeedImageSlot", _this, i)
  }

  callMethod("FeedTextSlot", _this, i)
  }

  } else {
  callMethod("FeedBackground", _this)
  for (var i = 1; i <= 3; ++i) {
  callMethod("FeedImageSlot", _this, i)
  callMethod("FeedTextSlot", _this, i)
  }

  }

  }

  return 1;
  } else {
  return 0;
  }

}

