// core.old.cct / CMgrConnection / create

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function create(_me: LingoMe, tID: LingoValue, tHost: LingoValue, tPort: LingoValue) {
  if (lingoBinary("and", !lingoTruthy(callNamed("symbolp", tID)), !lingoTruthy(callNamed("stringp", tID)))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Symbol or string expected:", tID), symbol("create"));
  }

  if (!lingoTruthy(callNamed("stringp", tHost))) {
  return callNamed("error", _me, lingoBinary("joinPad", "String expected:", tHost), symbol("create"));
  }

  if (!lingoTruthy(callNamed("integerp", tPort))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Integer expected:", tPort), symbol("create"));
  }

  var t_iLogLevel = callNamed("getIntVariable", "connection.log.level");
  switch (t_iLogLevel) {
case 2:
  if (!lingoTruthy(callNamed("memberExists", "connectionLog.text"))) {
  var tLogField = callNamed("member", callNamed("createMember", "connectionLog.text", symbol("field")));
  setThePropOf(tLogField, "boxType", symbol("scroll"));
  setThePropOf(tLogField, "rect", callNamed("rect", 0, 0, 300, 250));
  } else {
  tLogField = callNamed("member", callNamed("getmemnum", "connectionLog.text"));
  }

  setThePropOf(tLogField, "text", lingoBinary("join", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", tLogField.text, "\r"), "Connection logging"), tID), "\r"));
  break;
case 3:
  setMeProp(_me, "pClassString", "connection.debug.class");
  setTheProperty("debugPlaybackEnabled", 1);
  break;
  }

  if (!lingoTruthy(callMethod("exists", _me, tID))) {
  if (!lingoTruthy(callNamed("createObject", tID, callNamed("getClassVariable", meProp(_me, "pClassString"))))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Failed to initialize connection:", tID), symbol("create"));
  }

  callMethod("add", _me.pItemList, tID)
  }

  if (callNamed("voidp", meProp(_me, "pListenerList")[tID])) {
  var tMsgPtr = callNamed("getStructVariable", "struct.pointer");
  callMethod("setaProp", tMsgPtr, symbol("value"), new LingoPropList([]))
  meProp(_me, "pListenerList")[tID] = tMsgPtr;
  } else {
  tMsgPtr = meProp(_me, "pListenerList")[tID];
  }

  if (callNamed("voidp", meProp(_me, "pCommandsList")[tID])) {
  var tCmdPtr = callNamed("getStructVariable", "struct.pointer");
  callMethod("setaProp", tCmdPtr, symbol("value"), new LingoPropList([]))
  meProp(_me, "pCommandsList")[tID] = tCmdPtr;
  } else {
  tCmdPtr = meProp(_me, "pCommandsList")[tID];
  }

  callMethod("setProperty", callMethod("get", _me, tID), symbol("listener"), tMsgPtr)
  callMethod("setProperty", callMethod("get", _me, tID), symbol("commands"), tCmdPtr)
  callMethod("connect", callMethod("get", _me, tID), tHost, tPort)
  return 1;
}

