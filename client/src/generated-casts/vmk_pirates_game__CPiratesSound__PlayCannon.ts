// vmk_pirates_game.cct / CPiratesSound / PlayCannon

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlayCannon(_me: LingoMe, a_bGolden: LingoValue) {
  if (a_bGolden) {
  callMethod("playFx", _me, meProp(_me, "m_mp_sSoundList")["GoldenCannonball"][1])
  } else {
  var tRandom = callNamed("random", meProp(_me, "m_mp_sSoundList")["Cannon"].count);
  callMethod("playFx", _me, meProp(_me, "m_mp_sSoundList")["Cannon"][tRandom])
  }

}

