// vmk_mystics.cct / CRoomVisualAvatar / GetOutlook

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetOutlook(_me: LingoMe, _this: LingoValue) {
  return _this.m_ar_AvatarOutlook;
}

