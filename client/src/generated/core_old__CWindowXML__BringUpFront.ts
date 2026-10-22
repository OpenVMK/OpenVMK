// core.old.cct / CWindowXML / BringUpFront

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function BringUpFront(_me: LingoMe, _this: LingoValue) {
  callMethod("Activate", meProp(_me, "pWindowMngr"), callMethod("getID", _this))
}

