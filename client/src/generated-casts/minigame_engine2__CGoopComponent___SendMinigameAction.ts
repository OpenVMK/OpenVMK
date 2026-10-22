// minigame_engine2.cct / CGoopComponent / _SendMinigameAction

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SendMinigameAction(_me: LingoMe, i_iAction: LingoValue, i_ar_iData: LingoValue) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  var tMsg = new LingoPropList([]);
  callMethod("addProp", tMsg, symbol("integer"), callNamed("integer", lingoBinary("add", i_ar_iData.count, 1)))
  callMethod("addProp", tMsg, symbol("integer"), callNamed("integer", i_iAction))
  for (var tdata of i_ar_iData.toArray()) {
  callMethod("addProp", tMsg, symbol("integer"), callNamed("integer", tdata))
  }

  callMethod("_SendAction", callMethod("getHandler", _me), tMsg)
}

