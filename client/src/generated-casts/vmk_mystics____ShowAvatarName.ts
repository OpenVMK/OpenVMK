// vmk_mystics.cct /  / ShowAvatarName

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowAvatarName(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue) {
  if (callNamed("objectp", _this.m_rRenderer)) {
  callMethod("ShowHideAvatarName", _this.m_rRenderer, a_kEvent)
  }

}

