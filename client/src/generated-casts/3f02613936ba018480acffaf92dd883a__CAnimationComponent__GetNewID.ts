// 3f02613936ba018480acffaf92dd883a.cct / CAnimationComponent / GetNewID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetNewID(_me: LingoMe) {
  if (lingoBinary("lt", meProp(_me, "m_mp_arrangements").count, meProp(_me, "m_maxIDs"))) {
  setMeProp(_me, "m_idAllocator", lingoBinary("add", meProp(_me, "m_idAllocator"), 1));
  return meProp(_me, "m_idAllocator");
  } else {
  callNamed("error", _me, "Animation system is out of id's!", symbol("GetNewID"))
  return undefined;
  }

}

