// vmk_mystics.cct /  / SetAvatarOnTile

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetAvatarOnTile(_me: LingoMe, _this: LingoValue, a_sBoolAvatarOnTile: LingoValue) {
  setMeProp(_me, "m_sBoolAvatarOnTile", a_sBoolAvatarOnTile);
}

