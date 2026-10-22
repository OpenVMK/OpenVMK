// d0e535313898676eb605277339b50f27.cct / CAvatarAnimatorRenderer / openEyes

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function openEyes(_me: LingoMe) {
  callNamed("call", symbol("defineActMultiple"), meProp(_me, "m_mpSortedParts"), "std", new LingoList(["ey"]))
  setMeProp(_me, "m_bEyesClosed", 0);
  setMeProp(_me, "m_bChanges", 1);
  if (lingoBinary("eq", meProp(_me, "m_iMagic"), 16)) {
  callMethod("SetPushTheTrashcanAction", meProp(_me, "m_Obj_Magic"), "blk2")
  }

}

