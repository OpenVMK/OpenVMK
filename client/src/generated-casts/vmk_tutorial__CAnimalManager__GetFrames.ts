// vmk_tutorial.cct / CAnimalManager / GetFrames

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetFrames(_me: LingoMe, i_iID: LingoValue) {
  return callMethod("getaProp", meProp(_me, "m_mp_animalDecl"), i_iID).framelist;
}

