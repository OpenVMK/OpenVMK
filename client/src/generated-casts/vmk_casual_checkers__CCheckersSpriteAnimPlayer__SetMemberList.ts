// vmk_casual_checkers.cct / CCheckersSpriteAnimPlayer / SetMemberList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetMemberList(_me: LingoMe, _this: LingoValue, a_ar_rMembers: LingoValue) {
  setMeProp(_me, "m_ar_rMembers", a_ar_rMembers);
}

