// core.old.cct / CCastLoadTask / addCallBack

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addCallBack(_me: LingoMe, tID: LingoValue, tMethod: LingoValue, tClientID: LingoValue, tArgument: LingoValue) {
  if (!lingoTruthy(callNamed("symbolp", tMethod))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Symbol referring to handler expected:", tMethod), symbol("addCallBack"));
  }

  if (!lingoTruthy(callNamed("objectExists", tClientID))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Object not found:", tClientID), symbol("addCallBack"));
  }

  if (!lingoTruthy(callMethod("handler", callNamed("getObject", tClientID), tMethod))) {
  return callNamed("error", _me, lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Handler not found in object:", tMethod), "/"), tClientID), symbol("addCallBack"));
  }

  if (lingoBinary("eq", meProp(_me, "pStatus"), symbol("ready"))) {
  callNamed("call", tMethod, callNamed("getObject", tClientID), tArgument)
  callMethod("removeCastLoadTask", callNamed("getCastLoadManager"), meProp(_me, "pGroupId"))
  } else {
  if (lingoBinary("eq", meProp(_me, "pStatus"), symbol("LOADING"))) {
  if (callNamed("voidp", meProp(_me, "pCallBack"))) {
  setMeProp(_me, "pCallBack", callNamed("list", new LingoPropList([symbol("method"), tMethod, symbol("client"), tClientID, symbol("argument"), tArgument])));
  } else {
  callMethod("add", meProp(_me, "pCallBack"), new LingoPropList([symbol("method"), tMethod, symbol("client"), tClientID, symbol("argument"), tArgument]))
  }

  }

  }

  return 1;
}

