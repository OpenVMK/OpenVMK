// vmk_tutorial.cct / CHazardManager / RemoveHazard

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveHazard(_me: LingoMe, i_rObj: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "Remove Hazard", i_rObj))
  callMethod("_RemoveIndexed", meProp(_me, "m_roomContext"), callMethod("GetParam", i_rObj, "Reference"), "rock")
}

