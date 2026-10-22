// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Connection Manager Class / registerCommands

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerCommands(_me: LingoMe, tID: LingoValue, tObjID: LingoValue, tCmdList: LingoValue) {
  if (lingoBinary("and", lingoBinary("neq", callNamed("ilk", tID), symbol("symbol")), lingoBinary("neq", callNamed("ilk", tID), symbol("string")))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Invalid message header ID:", tID), symbol("registerListener"));
  }

  if (callNamed("voidp", meProp(_me, "pCommandsList")[tID])) {
  var tPtr = callNamed("getStructVariable", "struct.pointer");
  callMethod("setaProp", tPtr, symbol("value"), new LingoPropList([]))
  meProp(_me, "pCommandsList")[tID] = tPtr;
  } else {
  tPtr = meProp(_me, "pCommandsList")[tID];
  }

  for (var i = 1; i <= tCmdList.count; ++i) {
  var tCmd = callMethod("getPropAt", tCmdList, i);
  var tNum = tCmdList[i];
  var tOld = callMethod("getaProp", callMethod("getaProp", tPtr, symbol("value")), tCmd);
  var tBy1 = callNamed("numToChar", callNamed("bitOr", 64, lingoBinary("div", tNum, 64)));
  var tBy2 = callNamed("numToChar", callNamed("bitOr", 64, callNamed("bitAnd", 63, tNum)));
  var tNew = lingoBinary("join", tBy1, tBy2);
  if (lingoBinary("neq", tOld, undefined)) {
  if (lingoBinary("neq", tOld, tNew)) {
  callNamed("error", _me, lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Registered command override:", tCmd), "/"), tOld), "->"), tNew))
  }

  }

  callMethod("setaProp", callMethod("getaProp", tPtr, symbol("value")), tCmd, tNew)
  }

  return 1;
}

