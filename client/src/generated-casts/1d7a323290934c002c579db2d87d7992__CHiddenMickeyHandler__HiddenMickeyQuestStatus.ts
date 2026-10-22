// 1d7a323290934c002c579db2d87d7992.cct / CHiddenMickeyHandler / HiddenMickeyQuestStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HiddenMickeyQuestStatus(_me: LingoMe, tMsg: LingoValue) {
  var tFoundMickeys = callMethod("GetIntFrom", tMsg.connection);
  var tTotalMickeys = callMethod("GetIntFrom", tMsg.connection);
  callMethod("setQuestStatus", callMethod("getComponent", _me), tFoundMickeys, tTotalMickeys)
  callNamed("executeMessage", symbol("HiddenMickeyQuestStatus"), new LingoPropList([symbol("foundMickeys"), tFoundMickeys, symbol("totalMickeys"), tTotalMickeys]))
}

