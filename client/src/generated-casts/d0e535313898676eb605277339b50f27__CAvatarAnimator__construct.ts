// d0e535313898676eb605277339b50f27.cct / CAvatarAnimator / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  var m_ClsPartObj = undefined;
  setMeProp(_me, "m_ar_ClothesToLoad", new LingoList([]));
  setMeProp(_me, "m_bAllClothesLoaded", 0);
  setMeProp(_me, "m_mp_ParsedData", undefined);
  setMeProp(_me, "m_mp_ActionData", undefined);
  setMeProp(_me, "m_rSpr", undefined);
  setMeProp(_me, "m_mp_CallBackData", undefined);
}

