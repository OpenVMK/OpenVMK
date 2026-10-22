// d0e535313898676eb605277339b50f27.cct / CAvatarNameTagWindow / _QueueChat

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _QueueChat(_me: LingoMe, _this: LingoValue, a_rChat: LingoValue) {
  callMethod("append", meProp(_me, "m_ar_rChatQueue"), a_rChat)
}

