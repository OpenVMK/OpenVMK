// vmk_jungle_cruise.cct / CJungleCruiseHandlerExtension / OnPrepareRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnPrepareRoom(_me: LingoMe) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", meProp(_me, "m_sDebugPre"), "OnPrepareRoom()"))
  }

  callMethod("PrepareRoom", callMethod("getComponent", callNamed("getThread", "junglecruise")))
}

