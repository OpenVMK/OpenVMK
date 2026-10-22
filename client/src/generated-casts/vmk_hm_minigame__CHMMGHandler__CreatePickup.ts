// vmk_hm_minigame.cct / CHMMGHandler / CreatePickup

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreatePickup(_me: LingoMe, i_iPickup: LingoValue, i_iTile: LingoValue, i_iType: LingoValue) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "[HMDBG] Create pickup", i_iPickup), "of type"), i_iType), "on tile"), i_iTile))
  }

  callNamed("executeMessage", "PlayInterfaceSound", "create-pickup")
}

