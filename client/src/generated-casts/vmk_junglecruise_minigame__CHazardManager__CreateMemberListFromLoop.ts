// vmk_junglecruise_minigame.cct / CHazardManager / CreateMemberListFromLoop

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateMemberListFromLoop(_me: LingoMe, _loop: LingoValue) {
  var tMemList = new LingoList([]);
  for (var tMemName of _loop.toArray()) {
  var tMem = callNamed("getMember", tMemName);
  if (lingoBinary("neq", tMem, 0)) {
  callMethod("append", tMemList, tMem)
  continue;
  }

  callNamed("put", "CHazardManager: Could not find animation member from loop")
  }

  return tMemList;
}

