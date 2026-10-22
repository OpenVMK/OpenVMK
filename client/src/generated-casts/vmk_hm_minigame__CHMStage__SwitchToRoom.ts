// vmk_hm_minigame.cct / CHMStage / SwitchToRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SwitchToRoom(_me: LingoMe) {
  if (lingoBinary("neq", meProp(_me, "m_sVisual"), "")) {
  callNamed("executeMessage", symbol("room_switch"), meProp(_me, "m_sVisual"))
  }

}

