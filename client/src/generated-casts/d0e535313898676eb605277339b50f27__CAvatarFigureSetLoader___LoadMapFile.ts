// d0e535313898676eb605277339b50f27.cct / CAvatarFigureSetLoader / _LoadMapFile

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
  if ((lingoTruthy(callMethod("exists", callNamed("getObjectManager"), "FigureSetLoadingDialog")) ? 0 : 1)) {
  var t_rObj = callNamed("createObject", "FigureSetLoadingDialog", "CLoadingWindow");
  callMethod("DefineWindow", t_rObj, new LingoPropList([symbol("headline"), callNamed("getText", "avatar.loading.figureset.headline"), symbol("infotext"), callNamed("getText", "avatar.loading.figureset.info"), symbol("showbutton"), 0, symbol("modal"), 0, symbol("client"), callMethod("getID", _this)]))
  }

  setMeProp(_me, "m_ar_sMapFileName", new LingoList([]));
  if (callNamed("variableExists", "figureset_url")) {
  var t_sFile = callNamed("getVariable", "figureset_url");
  var t_sMember = "figureTexts1";
  var t_iMember = callNamed("queueDownload", t_sFile, t_sMember, symbol("field"));
  callMethod("add", meProp(_me, "m_ar_sMapFileName"), t_sFile)
  callNamed("registerDownloadCallback", t_iMember, symbol("_FileLoadCallback"), callMethod("getID", _this), t_sMember)
  setMeProp(_me, "m_bReady", 0);
  } else {
  callNamed("error", _this, "URL for figure set not defined!", symbol("_LoadMapFile"))
  setMeProp(_me, "m_bReady", 1);
  callMethod("ProcessReadyCallback", callMethod("GetProcessManager", callNamed("getThread", symbol("main")).component), meProp(_me, "m_iProcessNumber"))
  }

}

