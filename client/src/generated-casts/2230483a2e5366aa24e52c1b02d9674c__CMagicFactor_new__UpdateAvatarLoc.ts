// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / UpdateAvatarLoc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateAvatarLoc(_me: LingoMe, a_veAvatarLoc: LingoValue, a_Img_Avat: LingoValue) {
  /* global */ var pTemp = globalVar("pTemp");
  setThePropOf(_me, "m_veAvatarLoc", a_veAvatarLoc);
  callNamed("update", _me, a_Img_Avat)
}

