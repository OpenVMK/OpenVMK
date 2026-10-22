// vmk_3.dcr /  / delays

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function delays(_me: LingoMe, t_status: LingoValue) {
  callNamed("ref", symbol("entityID"), t_status.tProp)
  callNamed("ref", symbol("showLogo"), t_status.tDelayID)
}

