// core.old.cct / CMgrTimeout / get

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _get(_me: LingoMe, tID: LingoValue) {
  if (!lingoTruthy(callMethod("exists", _me, tID))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Item not found:", tID), symbol("get"));
  }

  var tTask = _me.pItemList[tID];
  if (callNamed("voidp", tTask[symbol("client")])) {
  callNamed("value", lingoBinary("join", lingoBinary("join", lingoBinary("join", tTask[symbol("handler")], "("), tTask[symbol("argument")]), ")"))
  } else {
  var tObjMgr = callNamed("getObjectManager");
  if (callMethod("exists", tObjMgr, tTask[symbol("client")])) {
  callNamed("call", tTask[symbol("handler")], callMethod("get", tObjMgr, tTask[symbol("client")]), tTask[symbol("argument")])
  } else {
  return callMethod("Remove", _me, tID);
  }

  }

}

