// vmk_hm_minigame.cct / CHMGameComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("put", "CHMGameComponent::Construct - begin")
  setMeProp(_me, "m_iRound", 0);
  setMeProp(_me, "m_ar_roundResults", new LingoList([]));
  setMeProp(_me, "m_bPrepared", 0);
  setMeProp(_me, "m_rSoundPlayer", undefined);
  setMeProp(_me, "m_ar_rDoors", new LingoPropList([]));
  callNamed("executeMessage", symbol("SetMinigameHandler"), "CHMMGHandler")
  callNamed("put", "CHMGameComponent::Construct - end")
  setMeProp(_me, "m_bGhostDebug", 0);
  setMeProp(_me, "m_rOwnPlayer", undefined);
  setMeProp(_me, "m_ar_GhostPuffs", new LingoList([]));
  setMeProp(_me, "m_iPuffCounter", 0);
  return 1;
}

