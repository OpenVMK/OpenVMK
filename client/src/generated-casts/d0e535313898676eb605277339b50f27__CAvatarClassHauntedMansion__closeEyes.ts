// d0e535313898676eb605277339b50f27.cct / CAvatarClassHauntedMansion / closeEyes

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function closeEyes(_me: LingoMe) {
  callNamed("call", symbol("defineActMultiple"), meProp(_me, "m_mpSortedParts"), "blk", new LingoList(["ey"]))
  setMeProp(_me, "m_bEyesClosed", 1);
  setMeProp(_me, "m_bChanges", 1);
}

