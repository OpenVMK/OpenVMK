// d0e535313898676eb605277339b50f27.cct / CAvatarAnimator / AllClothesReady

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AllClothesReady(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_ObjRenderer"))) {
  callMethod("Define", meProp(_me, "m_ObjRenderer"), meProp(_me, "m_mp_ParsedData"))
  setMeProp(_me, "m_bAllClothesLoaded", 1);
  }

}

