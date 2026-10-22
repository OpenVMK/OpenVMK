// core.old.cct / CEventAgent / registerEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerEvent(_me: LingoMe, _this: LingoValue, tObj: LingoValue, tEvent: LingoValue, tMethod: LingoValue) {
  meProp(_me, "pEventList")[tEvent] = new LingoList([tObj, tMethod]);
  callMethod("registerProcedure", meProp(_me, "pSprite"), symbol("eventProcDefault"), callMethod("getID", _this), tEvent)
  setThePropOf(meProp(_me, "pSprite"), "visible", 1);
  return callNamed("receivePrepare", callMethod("getID", _this));
}

