// vmk_jungle_cruise.cct / CAlbumWindow / SetBumpsHit

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetBumpsHit(_me: LingoMe, a_iBumps: LingoValue) {
  setThePropOf(meProp(_me, "m_mp_stats"), "bumps", a_iBumps);
}

