// core.old.cct / CMgrObject / create

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function create(_me: LingoMe, _this: LingoValue, tID: LingoValue, tClassList: LingoValue) {
  if (meProp(_me, "m_bLogger")) {
  if (callNamed("listp", tClassList)) {
  var t_sCls = callMethod("getLast", tClassList);
  } else {
  t_sCls = tClassList;
  }

  m_sLogger = m_sLogger + lingoBinary("join", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", lingoBinary("joinPad", theProperty("long time"), "Create"), "\""), tID), "\""), "/"), t_sCls), "\r");
  }

  if (lingoBinary("and", !lingoTruthy(callNamed("symbolp", tID)), !lingoTruthy(callNamed("stringp", tID)))) {
  return callNamed("error", _this, lingoBinary("joinPad", "Symbol or string expected:", tID), symbol("create"));
  }

  if (callNamed("objectp", meProp(_me, "pObjectList")[tID])) {
  return callNamed("error", _this, lingoBinary("joinPad", "Object already exists:", tID), symbol("create"));
  }

  if (lingoBinary("eq", tID, symbol("random"))) {
  tID = callNamed("getUniqueID");
  }

  if (!lingoTruthy(callNamed("listp", tClassList))) {
  tClassList = new LingoList([tClassList]);
  }

  tClassList = callMethod("duplicate", tClassList);
  var tObject = undefined;
  var tTemp = undefined;
  var tBase = callMethod("rawNew", meProp(_me, "pBaseClsMem"));
  callMethod("construct", tBase)
  if (lingoBinary("neq", tID, symbol("temp"))) {
  setThePropOf(tBase, "id", tID);
  meProp(_me, "pObjectList")[tID] = tBase;
  }

  if (lingoBinary("eq", tClassList.count, 0)) {
  callMethod("addAt", tClassList, 1, tBase)
  } else {
  if (lingoBinary("neq", tClassList[1], tBase)) {
  callMethod("addAt", tClassList, 1, tBase)
  }

  }

  for (var tClass of tClassList.toArray()) {
  if (callNamed("objectp", tClass)) {
  tObject = tClass;
  var tInitFlag = 0;
  } else {
  if (callMethod("managerExists", _this, symbol("resource_manager"))) {
  var tMemNum = callMethod("getmemnum", callMethod("getManager", _this, symbol("resource_manager")), tClass);
  } else {
  tMemNum = callNamed("member", tClass)._number;
  }

  if (lingoBinary("lt", tMemNum, 1)) {
  if (lingoBinary("neq", tID, symbol("temp"))) {
  callMethod("deleteProp", meProp(_me, "pObjectList"), tID)
  }

  return callNamed("error", _this, lingoBinary("joinPad", "Script not found:", tClass), symbol("create"));
  }

  tObject = callMethod("rawNew", callNamed("script", tMemNum));
  tInitFlag = callMethod("handler", tObject, symbol("construct"));
  }

  if (callNamed("ilk", tObject, symbol("instance"))) {
  callMethod("setaProp", tObject, symbol("ancestor"), tTemp)
  tTemp = tObject;
  }

  if (lingoBinary("neq", tID, symbol("temp"))) {
  if (lingoBinary("eq", callMethod("getLast", tClassList), tClass)) {
  meProp(_me, "pObjectList")[tID] = tObject;
  callMethod("append", meProp(_me, "pInstanceList"), tID)
  }

  }

  if (tInitFlag) {
  callMethod("construct", tObject)
  }

  }

  return tObject;
}

