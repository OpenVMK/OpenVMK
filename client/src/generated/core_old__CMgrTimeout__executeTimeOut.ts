// core.old.cct / CMgrTimeout / executeTimeOut

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function executeTimeOut(_me: LingoMe, tTimeout: LingoValue) {
  for (var i = 1; i <= _me.pItemList.count; ++i) {
  if (lingoBinary("eq", _me.pItemList[i][symbol("uniqueid")], tTimeout.name)) {
  var tID = callMethod("getPropAt", _me.pItemList, i);
  var tTask = _me.pItemList[tID];
  break;
  }

  }

  if (callNamed("voidp", tID)) {
  callMethod("forget", tTimeout)
  return 0;
  }

  _me.pItemList[tID][symbol("count")] = lingoBinary("add", _me.pItemList[tID][symbol("count")], 1);
  if (lingoBinary("eq", _me.pItemList[tID][symbol("count")], _me.pItemList[tID][symbol("iterations")])) {
  callMethod("Remove", _me, tID)
  }

  if (callNamed("voidp", tTask[symbol("client")])) {
  callNamed("value", lingoBinary("join", lingoBinary("join", lingoBinary("join", tTask[symbol("handler")], "("), tTask[symbol("argument")]), ")"))
  } else {
  var tObject = callNamed("getObject", tTask[symbol("client")]);
  if (callNamed("objectp", tObject)) {
  callNamed("call", tTask[symbol("handler")], tObject, tTask[symbol("argument")])
  } else {
  return callMethod("Remove", _me, tID);
  }

  }

  return 1;
}

