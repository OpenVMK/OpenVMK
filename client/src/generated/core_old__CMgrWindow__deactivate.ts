// core.old.cct / CMgrWindow / deactivate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deactivate(_me: LingoMe, tID: LingoValue) {
  if (callMethod("exists", _me, tID)) {
  if (!lingoTruthy(callMethod("getProperty", callMethod("get", _me, tID), symbol("modal")))) {
  callMethod("deleteOne", _me.pItemList, tID)
  callMethod("addAt", _me.pItemList, 1, tID)
  callMethod("Activate", _me)
  return 1;
  }

  }

  return 0;
}

