// core.old.cct / CMgrDownload / registerCallback

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerCallback(_me: LingoMe, tMemNameOrNum: LingoValue, tMethod: LingoValue, tClientID: LingoValue, tArgument: LingoValue) {
  var tTaskData = callMethod("searchTask", _me, tMemNameOrNum);
  if (!lingoTruthy(tTaskData)) {
  if (callNamed("stringp", tMemNameOrNum)) {
  if (lingoBinary("eq", callNamed("getmemnum", tMemNameOrNum), 0)) {
  return callNamed("error", _me, lingoBinary("joinPad", "Task doesn't exist:", tMemNameOrNum), symbol("registerCallback"));
  }

  } else {
  if (callNamed("integerp", tMemNameOrNum)) {
  if (lingoBinary("eq", callNamed("member", tMemNameOrNum)._type, symbol("empty"))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Task doesn't exist:", tMemNameOrNum), symbol("registerCallback"));
  }

  } else {
  return callNamed("error", _me, lingoBinary("joinPad", "Member's name or number expected:", tMemNameOrNum), symbol("registerCallback"));
  }

  }

  tTaskData = new LingoPropList([symbol("status"), symbol("complete")]);
  }

  if (!lingoTruthy(callNamed("symbolp", tMethod))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Symbol referring to a handler expected:", tMethod), symbol("registerCallback"));
  }

  if (!lingoTruthy(callNamed("objectExists", tClientID))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Object not found:", tClientID), symbol("registerCallback"));
  }

  if (!lingoTruthy(callMethod("handler", callNamed("getObject", tClientID), tMethod))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Handler not found in object:", tMethod), tClientID, symbol("registerCallback"));
  }

  switch (tTaskData[symbol("status")]) {
case symbol("complete"):
  callNamed("call", tMethod, callNamed("getObject", tClientID), tArgument)
  break;
case symbol("queue"):
  meProp(_me, "pTaskQueue")[tTaskData[symbol("name")]][symbol("callback")] = new LingoPropList([symbol("method"), tMethod, symbol("client"), tClientID, symbol("argument"), tArgument]);
  break;
case symbol("Active"):
  callNamed("call", symbol("addCallBack"), meProp(_me, "pActiveTasks"), tTaskData[symbol("name")], new LingoPropList([symbol("method"), tMethod, symbol("client"), tClientID, symbol("argument"), tArgument]))
  break;
  }

  return 1;
}

