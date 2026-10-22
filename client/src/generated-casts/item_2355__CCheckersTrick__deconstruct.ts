// item_2355.cct / CCheckersTrick / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("removeUpdate", callMethod("getID", _this))
  if (callNamed("objectp", meProp(_me, "m_rAnimation"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rAnimation")))
  setMeProp(_me, "m_rAnimation", undefined);
  }

  return 1;
}

