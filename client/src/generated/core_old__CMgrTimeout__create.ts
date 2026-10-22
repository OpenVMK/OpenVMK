// core.old.cct / CMgrTimeout / create

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function create(_me: LingoMe, tID: LingoValue, tTime: LingoValue, tHandler: LingoValue, tClientID: LingoValue, tArgument: LingoValue, tIterations: LingoValue) {
  if (callMethod("exists", _me, tID)) {
  return callNamed("error", _me, lingoBinary("joinPad", "Timeout already registered:", tID), symbol("create"));
  }

  if (!lingoTruthy(callNamed("integerp", tTime))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Integer expected:", tTime), symbol("create"));
  }

  if (!lingoTruthy(callNamed("symbolp", tHandler))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Symbol expected:", tHandler), symbol("create"));
  }

  var tObjMgr = callNamed("getObjectManager");
  if (callMethod("exists", tObjMgr, tClientID)) {
  if (!lingoTruthy(callMethod("handler", callMethod("get", tObjMgr, tClientID), tHandler))) {
  return callNamed("error", _me, lingoBinary("joinPad", lingoBinary("joinPad", "Handler not found in object:", tHandler), tClientID), symbol("create"));
  }

  } else {
  if (!lingoTruthy(callNamed("voidp", tClientID))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Object ID or VOID expected:", tClientID), symbol("create"));
  }

  }

  var tUniqueId = lingoBinary("joinPad", "Timeout", callNamed("getUniqueID"));
  callMethod("create", tObjMgr, tUniqueId, callMethod("new", callNamed("timeout", tUniqueId), tTime, symbol("executeTimeOut"), _me))
  var tList = new LingoPropList([]);
  tList[symbol("uniqueid")] = tUniqueId;
  tList[symbol("handler")] = tHandler;
  tList[symbol("client")] = tClientID;
  tList[symbol("argument")] = tArgument;
  tList[symbol("iterations")] = tIterations;
  tList[symbol("count")] = 0;
  _me.pItemList[tID] = tList;
  return 1;
}

