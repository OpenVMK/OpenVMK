// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurnitureMap / _LoadMapFile

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _LoadMapFile(_me: LingoMe, _this: LingoValue) {
  callNamed("unregisterMessage", lingoBinary("join", "start_process_", meProp(_me, "m_iProcessNumber")), callMethod("getID", _this))
  callNamed("ShowCustomLoadingScreen", 0)
  if ((lingoTruthy(callMethod("exists", callNamed("getObjectManager"), "RoomFurniMapLoadingDialog")) ? 0 : 1)) {
  var t_rObj = callNamed("createObject", "RoomFurniMapLoadingDialog", "CLoadingWindow");
  callMethod("DefineWindow", t_rObj, new LingoPropList([symbol("headline"), callNamed("getText", "room.loading.furnimap.headline"), symbol("infotext"), callNamed("getText", "room.loading.furnimap.info"), symbol("showbutton"), 0, symbol("modal"), 0, symbol("client"), callMethod("getID", _this)]))
  }

  callMethod("lock", callNamed("getWindowManager"))
  var i = 1;
  setMeProp(_me, "m_ar_sMapFileName", new LingoList([]));
  while (1) {
  if (callNamed("variableExists", lingoBinary("join", "furnituremap_url.", i))) {
  var t_sFile = callNamed("getVariable", lingoBinary("join", "furnituremap_url.", i));
  callMethod("add", meProp(_me, "m_ar_sMapFileName"), t_sFile)
  if (callNamed("memberExists", t_sFile)) {
  callMethod("_FileLoadCallback", _this, t_sFile)
  }

  } else {
  break;
  }

  i = lingoBinary("add", i, 1);
  }

  if (meProp(_me, "m_ar_sMapFileName").count) {
  for (var i = 1; i <= meProp(_me, "m_ar_sMapFileName").count; ++i) {
  t_sFile = meProp(_me, "m_ar_sMapFileName")[i];
  var t_sMember = t_sFile;
  var t_iMember = callNamed("queueDownload", t_sFile, t_sMember, symbol("text"));
  callNamed("registerDownloadCallback", t_iMember, symbol("_FileLoadCallback"), callMethod("getID", _this), t_sMember)
  }

  setMeProp(_me, "m_bReady", 0);
  } else {
  setMeProp(_me, "m_bReady", 1);
  }

  if (lingoBinary("eq", meProp(_me, "m_ar_sMapFileName").count, 0)) {
  if (callNamed("variableExists", "furnituremap_url")) {
  t_sFile = callNamed("getVariable", "furnituremap_url");
  t_sMember = t_sFile;
  t_iMember = callNamed("queueDownload", t_sFile, t_sMember, symbol("text"));
  callMethod("add", meProp(_me, "m_ar_sMapFileName"), t_sFile)
  callNamed("registerDownloadCallback", t_iMember, symbol("_FileLoadCallback"), callMethod("getID", _this), t_sMember)
  setMeProp(_me, "m_bReady", 0);
  } else {
  setMeProp(_me, "m_bReady", 1);
  }

  }

}

