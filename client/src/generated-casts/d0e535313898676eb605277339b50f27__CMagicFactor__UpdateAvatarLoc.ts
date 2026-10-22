// d0e535313898676eb605277339b50f27.cct / CMagicFactor / UpdateAvatarLoc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateAvatarLoc(_me: LingoMe, a_veAvatarLoc: LingoValue, a_Img_Avat: LingoValue) {
  setMeProp(_me, "m_veAvatarLoc", a_veAvatarLoc);
  callMethod("update", _me, a_Img_Avat)
}

