// vmk_pirates_game.cct / CPiratesSound / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callMethod("stop", meProp(_me, "m_rSea"))
  callMethod("stop", meProp(_me, "m_rMusic"))
  callMethod("StopSound", meProp(_me, "m_ar_rFX")[1])
  callMethod("StopSound", meProp(_me, "m_ar_rFX")[2])
  callMethod("StopSound", meProp(_me, "m_ar_rFX")[3])
  callMethod("StopSound", meProp(_me, "m_ar_rFX")[4])
  setMeProp(_me, "m_rSea", undefined);
  setMeProp(_me, "m_rMusic", undefined);
  callNamed("removeObject", meProp(_me, "m_ar_rFX")[1])
  callNamed("removeObject", meProp(_me, "m_ar_rFX")[2])
  callNamed("removeObject", meProp(_me, "m_ar_rFX")[3])
  callNamed("removeObject", meProp(_me, "m_ar_rFX")[4])
  return 1;
}

