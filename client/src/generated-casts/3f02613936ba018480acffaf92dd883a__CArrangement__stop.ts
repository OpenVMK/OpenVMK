// 3f02613936ba018480acffaf92dd883a.cct / CArrangement / stop

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function stop(_me: LingoMe) {
  for (var snd of meProp(_me, "m_ar_sounds").toArray()) {
  snd[symbol("playcount")] = 0;
  }

  for (var anim of meProp(_me, "m_ar_pAnimations").toArray()) {
  callMethod("resetSounds", anim)
  }

  setMeProp(_me, "m_iState", symbol("stop"));
}

