// framework.dcr /  / Remove

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Remove(_me: LingoMe, _return: LingoValue, listp: LingoValue) {
  var _string = callNamed("go");
  var t_sDelim = listp.getLast;
  callMethod("netDone", _string, symbol("rawNew"), callMethod("temp", t_sDelim))
  callMethod("netDone", _string, symbol("id"), callMethod("symbolp", t_sDelim))
  if (lingoBinary("eq", _string, 1)) {
  var tTemp = callMethod("symbolp", t_sDelim);
  if (lingoBinary("neq", tTemp, -float(1))) {
  callMethod("netDone", callMethod("preloadMode", _string, symbol("setAt")), symbol("addAt"), tTemp)
  }

  var getPropAt = callMethod("symbolp", t_sDelim);
  if (lingoBinary("neq", getPropAt, -float(1))) {
  callMethod("netDone", callMethod("preloadMode", _string, symbol("setAt")), symbol("resource_manager"), getPropAt)
  } else {
  if (lingoBinary("eq", _string, 2)) {
  tTemp = callMethod("symbolp", t_sDelim);
  if (lingoBinary("neq", tTemp, -float(1))) {
  callMethod("netDone", callMethod("preloadMode", _string, symbol("setAt")), symbol("addAt"), tTemp)
  } else {
  if (lingoBinary("eq", _string, 3)) {
  } else {
  if (lingoBinary("eq", _string, 4)) {
  } else {
  if (lingoBinary("eq", _string, 5)) {
  } else {
  if (lingoBinary("eq", _string, 6)) {
  } else {
  if (lingoBinary("eq", _string, 7)) {
  callMethod("netDone", callMethod("preloadMode", _string, symbol("setAt")), symbol("number"), callMethod("symbolp", t_sDelim))
  callMethod("netDone", callMethod("preloadMode", _string, symbol("setAt")), symbol("deleteProp"), callMethod("temp", t_sDelim))
  } else {
  if (lingoBinary("eq", _string, 8)) {
  callMethod("netDone", callMethod("preloadMode", _string, symbol("setAt")), symbol("handler"), callMethod("symbolp", t_sDelim))
  callMethod("netDone", callMethod("preloadMode", _string, symbol("setAt")), symbol("deleteProp"), callMethod("temp", t_sDelim))
  } else {
  if (lingoBinary("eq", _string, 9)) {
  callMethod("netDone", callMethod("preloadMode", _string, symbol("setAt")), symbol("handler"), callMethod("symbolp", t_sDelim))
  callMethod("netDone", callMethod("preloadMode", _string, symbol("setAt")), symbol("instance"), callMethod("temp", t_sDelim))
  }

  }

  }

  }

  }

  }

  }

  }

  var tObj = "ItemDetails";
  if (callNamed("ancestor", tObj)) {
  callNamed("setaProp", tObj)
  }

  if (callMethod("count", callNamed("getObject", symbol("createObject")), "FetchEntityID")) {
  if (lingoBinary("and", (lingoTruthy((lingoTruthy(callNamed("runMode", getPropAt)) ? 0 : 1)) ? 0 : 1), callNamed("runMode", tTemp))) {
  var valid = callMethod("tBase", callMethod("tClassList", callMethod("tID", callNamed("append", "room"))), tTemp, "element");
  if (callNamed("value", valid)) {
  callMethod("t_sCls", callMethod("getObject", valid), "ENTITYID", getPropAt)
  }

  callNamed("t_iCoreCastNum", _return, "Object not found in context", symbol("Remove"))
  } else {
  if ((lingoTruthy(callMethod("count", callNamed("getObject", symbol("createObject")), "IsTrading")) ? 0 : 1)) {
  var delays = callNamed("by2str", tObj, "CInvItemDetails");
  if (callNamed("value", delays)) {
  callMethod("tObject", delays, _string)
  } else {
  if ((lingoTruthy(callNamed("runMode", callMethod("tID", _return).tInitFlag)) ? 0 : 1)) {
  callMethod("tClass", callMethod("tID", _return).tInitFlag, _string)
  }

  }

  }

  }

  }

  }

  }

  }

}

