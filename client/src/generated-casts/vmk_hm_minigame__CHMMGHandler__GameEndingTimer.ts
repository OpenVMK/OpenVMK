// vmk_hm_minigame.cct / CHMMGHandler / GameEndingTimer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GameEndingTimer(_me: LingoMe, i_iSecondsRemaining: LingoValue) {
  callMethod("SetTimerDisplay", callMethod("HMGGetWindow", meProp(_me, "m_rHauntedMansionInterface"), "UI"), i_iSecondsRemaining)
}

