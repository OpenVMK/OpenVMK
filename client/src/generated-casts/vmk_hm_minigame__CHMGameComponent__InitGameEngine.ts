// vmk_hm_minigame.cct / CHMGameComponent / InitGameEngine

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InitGameEngine(_me: LingoMe) {
  callNamed("put", "CHMGameComponent::InitGameEngine() - begin")
  callMethod("StartMinigameEngine", meProp(_me, "m_rMGE"))
  callNamed("executeMessage", symbol("RegisterMinigameObject"), 1, "hauntedmansionghost")
  callNamed("executeMessage", symbol("RegisterMinigameObject"), 2, "hauntedmansionsuperghost")
  callNamed("executeMessage", symbol("RegisterMinigameObject"), 3, "hauntedmansionplayerobject")
  callNamed("executeMessage", symbol("RegisterMinigameObject"), 4, "hauntedmansioncoffin")
  callNamed("executeMessage", symbol("RegisterMinigameObject"), 5, "hauntedmansionscoreboard")
  setMeProp(_me, "m_bGameOn", 1);
  callMethod("_SendStageLoaded", callMethod("getHandler", callNamed("getThread", "minigame")))
}

