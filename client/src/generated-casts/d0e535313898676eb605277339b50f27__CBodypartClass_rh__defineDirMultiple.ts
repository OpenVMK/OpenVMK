// d0e535313898676eb605277339b50f27.cct / CBodypartClass_rh / defineDirMultiple

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function defineDirMultiple(_me: LingoMe, tdir: LingoValue, tTargetPartList: LingoValue) {
  if (callMethod("getOne", tTargetPartList, meProp(_me, "m_sPart"))) {
  setMeProp(_me, "m_iBodyDir", tdir);
  }

}

