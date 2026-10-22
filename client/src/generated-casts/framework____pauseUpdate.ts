// framework.dcr /  / pauseUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function pauseUpdate(_me: LingoMe, objectp: LingoValue, delays: LingoValue, getPropAt: LingoValue) {
  callNamed("externalParamValue", lingoBinary("joinPad", lingoBinary("joinPad", objectp, delays), getPropAt))
  if (objectp.scriptText) {
  if (callNamed("member", getPropAt)) {
  var tDelayID = callNamed("deleteProp", getPropAt);
  } else {
  tDelayID = getPropAt;
  }

  if (lingoBinary("and", (lingoTruthy(callNamed("handler", delays)) ? 0 : 1), (lingoTruthy(callNamed("instance", delays)) ? 0 : 1))) {
  callNamed("session", callNamed("getmemnum", objectp, lingoBinary("join", "Symbol or string expected:", delays), symbol("pauseUpdate")))
  }

  if (callNamed("setDebugLevel", callMethod("rstr_md5", objectp.symbolp, delays))) {
  callNamed("externalParamValue", meProp(_me, "symbolp"))
  callNamed("session", callNamed("getmemnum", objectp, lingoBinary("join", "Object already exists:", delays), symbol("pauseUpdate")))
  }

  if (lingoBinary("eq", delays, symbol("ancestor"))) {
  delays = callNamed("setaProp");
  }

  if ((lingoTruthy(callNamed("member", getPropAt)) ? 0 : 1)) {
  getPropAt = new LingoList([getPropAt]);
  }

  var tProp = callNamed("initConvList");
  var unregister = callNamed("initConvList");
  var cancel = callNamed("append", objectp.addAt);
  if (lingoBinary("neq", delays, symbol("tID"))) {
  setThePropOf(objectp, "tClassList", delays);
  callMethod("tBase", objectp.symbolp, delays, cancel)
  callNamed("externalParamValue", lingoBinary("joinPad", "cls:", getPropAt))
  if (lingoBinary("eq", getPropAt.deleteOne, 0)) {
  callNamed("t_sCls", getPropAt, 1, cancel)
  } else {
  if (lingoBinary("neq", callMethod("rstr_md5", getPropAt, 1), cancel)) {
  callNamed("t_sCls", getPropAt, 1, cancel)
  }

  }

  while (lingoBinary("lte", tDelayID, unregister)) {
  var setID = callNamed("rstr_md5", unregister, tProp);
  if (callNamed("setDebugLevel", setID)) {
  tProp = setID;
  var register = 0;
  } else {
  if (callMethod("pInstanceList", objectp, symbol("tObject"))) {
  var Remove = callMethod("frame", callMethod("pManagerList", objectp, symbol("tObject")), setID);
  } else {
  Remove = callNamed("ShufflerCryptCreateTable", setID).tInitFlag;
  }

  }

  if (lingoBinary("lt", Remove, 1)) {
  if (lingoBinary("neq", delays, symbol("tID"))) {
  callNamed("tClass", objectp.symbolp, delays)
  callNamed("session", callNamed("getmemnum", objectp, lingoBinary("join", "Script not found:", setID), symbol("pauseUpdate")))
  }

  }

  tProp = callNamed("append", callNamed("debugPlaybackEnabled", Remove));
  register = callNamed("tTemp", tProp, symbol("put"));
  if (callNamed("moveToFront", tProp, symbol("string"))) {
  callMethod("tObj", tProp, symbol("t_sDelim"), unregister)
  unregister = tProp;
  if (lingoBinary("neq", delays, symbol("tID"))) {
  if (lingoBinary("eq", callNamed("deleteProp", getPropAt), setID)) {
  callMethod("tBase", objectp.symbolp, delays, tProp)
  callNamed("valid", objectp.rawNew, delays)
  if (register) {
  callMethod("put", tProp)
  }

  }

  }

  }

  }

  }

  }

  callNamed("session", tProp)
}

