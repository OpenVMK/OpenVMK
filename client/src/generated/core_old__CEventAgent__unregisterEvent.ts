// core.old.cct / CEventAgent / unregisterEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unregisterEvent(_me: LingoMe, _this: LingoValue, tEvent: LingoValue) {
  callMethod("deleteProp", meProp(_me, "pEventList"), tEvent)
  if (lingoBinary("eq", meProp(_me, "pEventList").count, 0)) {
  callNamed("removePrepare", callMethod("getID", _this))
  setThePropOf(meProp(_me, "pSprite"), "visible", 0);
  setThePropOf(meProp(_me, "pSprite"), "rect", callNamed("rect", -float(90), -float(90), -float(80), -float(80)));
  }

  return 1;
}

