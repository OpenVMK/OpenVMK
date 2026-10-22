// d0e535313898676eb605277339b50f27.cct / CAvatarRenderer / stopAnimation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function stopAnimation(_me: LingoMe) {
  setMeProp(_me, "m_bAnimating", 0);
  setMeProp(_me, "m_sCurrentAnim", "");
  callNamed("call", symbol("remAnimation"), meProp(_me, "m_mpSortedParts"))
}

