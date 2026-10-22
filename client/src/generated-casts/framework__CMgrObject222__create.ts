// framework.dcr / CMgrObject222 / create

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function create(_me: LingoMe, _this: LingoValue, tID: LingoValue, tClassList: LingoValue) {
  callNamed("trace", lingoBinary("joinPad", lingoBinary("joinPad", _this, tID), tClassList))
  if (_this.m_bLogger) {
  if (callNamed("listp", tClassList)) {
  var t_sCls = callNamed("getLast", tClassList);
  } else {
  t_sCls = tClassList;
  }

  if (lingoBinary("and", (lingoTruthy(callNamed("symbolp", tID)) ? 0 : 1), (lingoTruthy(callNamed("stringp", tID)) ? 0 : 1))) {
  return callNamed("error", _this, lingoBinary("join", "Symbol or string expected:", tID), symbol("create"));
  }

  if (callNamed("objectp", _this.pObjectList[tID])) {
  callNamed("trace", meProp(_me, "pObjectList"))
  return callNamed("error", _this, lingoBinary("join", "Object already exists:", tID), symbol("create"));
  }

  if (lingoBinary("eq", tID, symbol("random"))) {
  tID = callNamed("getUniqueID");
  }

  if ((lingoTruthy(callNamed("listp", tClassList)) ? 0 : 1)) {
  tClassList = new LingoList([tClassList]);
  }

  var tObject = undefined;
  var tTemp = undefined;
  var tBase = callNamed("rawNew", _this.pBaseClsMem);
  if (lingoBinary("neq", tID, symbol("temp"))) {
  setThePropOf(_this, "id", tID);
  _this.pObjectList[tID] = tBase;
  callNamed("trace", lingoBinary("joinPad", "cls:", tClassList))
  if (lingoBinary("eq", tClassList.count, 0)) {
  callNamed("addAt", tClassList, 1, tBase)
  } else {
  if (lingoBinary("neq", tClassList[1], tBase)) {
  callNamed("addAt", tClassList, 1, tBase)
  }

  }

  while (lingoBinary("lte", t_sCls, tTemp)) {
  var tClass = callNamed("getAt", tTemp, tObject);
  if (callNamed("objectp", tClass)) {
  tObject = tClass;
  var tInitFlag = 0;
  } else {
  if (callMethod("managerExists", _this, symbol("resource_manager"))) {
  var tMemNum = callMethod("getmemnum", callMethod("getManager", _this, symbol("resource_manager")), tClass);
  } else {
  tMemNum = callNamed("member", tClass)._number;
  }

  }

  if (lingoBinary("lt", tMemNum, 1)) {
  if (lingoBinary("neq", tID, symbol("temp"))) {
  callNamed("deleteProp", _this.pObjectList, tID)
  return callNamed("error", _this, lingoBinary("join", "Script not found:", tClass), symbol("create"));
  }

  }

  tObject = callNamed("rawNew", callNamed("script", tMemNum));
  tInitFlag = callNamed("handler", tObject, symbol("construct"));
  if (callNamed("ilk", tObject, symbol("instance"))) {
  callMethod("setaProp", tObject, symbol("ancestor"), tTemp)
  tTemp = tObject;
  if (lingoBinary("neq", tID, symbol("temp"))) {
  if (lingoBinary("eq", callNamed("getLast", tClassList), tClass)) {
  _this.pObjectList[tID] = tObject;
  callNamed("append", _this.pInstanceList, tID)
  if (tInitFlag) {
  callMethod("construct", tObject)
  }

  }

  }

  }

  }

  }

  }

  return tObject;
}

