// 02a651b7c670fb161ce1a3e4d28713a1.cct / CRoomPopulus / RemoveOne

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveOne(_me: LingoMe, i_string: LingoValue) {
  callMethod("deleteOne", meProp(_me, "m_ar_sPopulus"), i_string)
}

