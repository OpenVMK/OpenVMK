// d0e535313898676eb605277339b50f27.cct / CAvatarClassHauntedMansion / ReleaseBeam

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ReleaseBeam(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rBeamSpr"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_rBeamSpr").spriteNum)
  setMeProp(_me, "m_rBeamSpr", undefined);
  setMeProp(_me, "m_iBeamCounter", undefined);
  var it_mpDelays = new LingoPropList([]);
  var t_mpDelays = _me.delays;
  for (var g = 1; g <= t_mpDelays.count; ++g) {
  callMethod("cancel", _me, callMethod("getPropAt", t_mpDelays, g))
  }

  }

}

