// vmk_npc_treehouse.cct / CTreehouseComponent / stopAnimations

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function stopAnimations(_me: LingoMe, tAnimEngine: LingoValue) {
  callMethod("StopAnim", tAnimEngine, meProp(_me, "m_animIDs")[1])
  callMethod("StopAnim", tAnimEngine, meProp(_me, "m_animIDs")[2])
  callMethod("StopAnim", tAnimEngine, meProp(_me, "m_animIDs")[3])
  callMethod("StopAnim", tAnimEngine, meProp(_me, "m_animIDs")[4])
  callMethod("StopAnim", tAnimEngine, meProp(_me, "m_animIDs")[5])
  callMethod("StopAnim", tAnimEngine, meProp(_me, "m_animIDs")[6])
}

