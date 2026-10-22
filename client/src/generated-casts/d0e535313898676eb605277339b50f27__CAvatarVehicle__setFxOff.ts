// d0e535313898676eb605277339b50f27.cct / CAvatarVehicle / setFxOff

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setFxOff(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_FxSnd_obj"))) {
  callMethod("StopSound", meProp(_me, "m_FxSnd_obj"))
  }

}

