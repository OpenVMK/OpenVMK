// vmk_fireworks_minigame.cct / CFireworksGameSoundPlayer / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_iCurFX1Channel", 1);
  setMeProp(_me, "m_iCurFX2Channel", 2);
  setMeProp(_me, "m_ar_rFx1Channel", new LingoList([callNamed("sound", 1), callNamed("sound", 2)]));
  setMeProp(_me, "m_ar_rFx2Channel", new LingoList([callNamed("sound", 3), callNamed("sound", 4)]));
  setMeProp(_me, "m_rCrowdChannel", callNamed("sound", 5));
  setMeProp(_me, "m_rMusicChannel", callNamed("sound", 6));
  setMeProp(_me, "m_iCrowdSatisfaction", 1);
  setMeProp(_me, "m_mp_rCrowdReactions", new LingoPropList([symbol("positive"), new LingoList([callNamed("member", "fireworks-crowd-2 1"), callNamed("member", "fireworks-crowd-1 1"), callNamed("member", "fireworks-crowd-3 1")]), symbol("negative"), new LingoList([callNamed("member", "fireworks-crowd-boo-1 1")])]));
  return 1;
}

