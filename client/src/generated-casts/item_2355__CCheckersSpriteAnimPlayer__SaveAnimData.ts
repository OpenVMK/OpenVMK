// item_2355.cct / CCheckersSpriteAnimPlayer / SaveAnimData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SaveAnimData(_me: LingoMe, _this: LingoValue, a_rMember: LingoValue) {
  setThePropOf(a_rMember, "text", callNamed("string", new LingoPropList([symbol("version"), 0, symbol("members"), meProp(_me, "m_ar_rMembers"), symbol("frames"), meProp(_me, "m_ar_rFrames")])));
}

