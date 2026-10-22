// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomComponent / _CreateRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _CreateRoom(_me: LingoMe, _this: LingoValue, a_rXML: LingoValue, a_iVersion: LingoValue) {
  setMeProp(_me, "m_bProcessInitialized", 0);
  if (callNamed("objectp", meProp(_me, "m_rContext"))) {
  callMethod("_RemoveRoom", _this)
  }

  callMethod("_ResetProcess", _this)
  callMethod("GetRoot", a_rXML)
  if ((lingoTruthy(callMethod("Search", a_rXML, "type", "FILES")) ? 0 : 1)) {
  return callNamed("error", _this, "Invalid resource document!", symbol("_CreateRoom"));
  }

  setMeProp(_me, "m_sActive", callMethod("getaProp", callMethod("GetNode", a_rXML).param, "ID"));
  var t_iRoomCode = callMethod("getaProp", callMethod("GetNode", a_rXML).param, "CODE");
  callMethod("setaProp", meProp(_me, "m_rCache"), meProp(_me, "m_sActive"), a_rXML)
  if (callMethod("Search", a_rXML, "type", "CASTS")) {
  var t_rCasts = callMethod("GetNode", a_rXML);
  if (lingoBinary("gt", t_rCasts.child.count, 0)) {
  for (var t_rCast of t_rCasts.child.toArray()) {
  callMethod("add", meProp(_me, "m_rProcess").casts, 0)
  var t_iLoadID = callNamed("startCastLoad", callMethod("getaProp", t_rCast.param, "URL"), 0, 1);
  callNamed("registerCastloadCallback", t_iLoadID, symbol("_UpdateProcess"), callMethod("getID", _this), "casts_ready")
  }

  callMethod("ShowLoadBar", callMethod("getInterface", _this), "foo", t_iRoomCode)
  } else {
  callMethod("_UpdateProcess", _this, "casts_ready")
  }

  }

  callMethod("GetRoot", a_rXML)
  callMethod("Search", a_rXML, "type", "FILES")
  if (callMethod("Search", a_rXML, "type", "OTHER")) {
  var t_rFiles = callMethod("GetNode", a_rXML);
  if (lingoBinary("gt", t_rFiles.child.count, 0)) {
  for (var t_rFile of t_rFiles.child.toArray()) {
  callMethod("add", meProp(_me, "m_rProcess").Files, 0)
  var t_iMemNum = callNamed("queueDownload", callMethod("getaProp", t_rFile.param, "URL"), undefined, undefined, 1);
  callNamed("registerDownloadCallback", t_iMemNum, symbol("_UpdateProcess"), callMethod("getID", _this), "files_ready")
  }

  }

  } else {
  callMethod("_UpdateProcess", _this, "files_ready")
  }

  if (callNamed("integerp", a_iVersion)) {
  setMeProp(_me, "m_iVersion", a_iVersion);
  } else {
  setMeProp(_me, "m_iVersion", 0);
  }

}

