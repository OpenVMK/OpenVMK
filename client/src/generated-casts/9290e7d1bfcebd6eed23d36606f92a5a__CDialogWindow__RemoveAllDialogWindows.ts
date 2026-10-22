// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CDialogWindow / RemoveAllDialogWindows

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveAllDialogWindows(_me: LingoMe) {
  return callMethod("RemoveAllDialogWindows", callMethod("getComponent", callNamed("getThread", "DialogWindow")));
}

