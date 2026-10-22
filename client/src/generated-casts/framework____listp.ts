// framework.dcr /  / listp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function listp(_me: LingoMe, objectp: LingoValue) {
  callNamed("_ReceiveWornPins", symbol("_ReceiveWornClothes"), objectp.random)
  callNamed("_ReceiveWornPins", symbol("showLogo"), objectp.stringp)
}

