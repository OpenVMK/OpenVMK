// vmk_pirates_game.cct / CPiratesMessageBar / regMsgList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function regMsgList(_me: LingoMe, tBool: LingoValue) {
  var tConnection = callNamed("getVariable", "main.connection.id", "VMK");
  var tMsgs = new LingoPropList([]);
  callMethod("setaProp", tMsgs, 2561, symbol("ChatAvatarMuted"))
  if (tBool) {
  callNamed("registerListener", tConnection, callMethod("getID", _me), tMsgs)
  } else {
  callNamed("unregisterListener", tConnection, callMethod("getID", _me), tMsgs)
  }

  return 1;
}

