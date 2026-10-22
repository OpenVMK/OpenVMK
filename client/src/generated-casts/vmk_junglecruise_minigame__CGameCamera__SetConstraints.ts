// vmk_junglecruise_minigame.cct / CGameCamera / SetConstraints

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetConstraints(_me: LingoMe, a_left: LingoValue, a_top: LingoValue, a_right: LingoValue, a_bottom: LingoValue) {
  setMeProp(_me, "m_constraints", callNamed("rect", a_left, a_top, a_right, a_bottom));
}

