// d0e535313898676eb605277339b50f27.cct / CAvatarClassHauntedMansion / updater2

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updater2(_me: LingoMe) {
  callMethod("Refresh", _me, meProp(_me, "m_iHeadDir"), meProp(_me, "m_iBdDir"))
  callMethod("updater", _me)
}

