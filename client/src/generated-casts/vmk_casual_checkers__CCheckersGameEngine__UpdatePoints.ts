// vmk_casual_checkers.cct / CCheckersGameEngine / UpdatePoints

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdatePoints(_me: LingoMe, _this: LingoValue, a_iAvatarRef: LingoValue, a_iPoints: LingoValue) {
  callMethod("setaProp", callMethod("getaProp", meProp(_me, "m_rPlayers"), a_iAvatarRef), symbol("points"), a_iPoints)
}

