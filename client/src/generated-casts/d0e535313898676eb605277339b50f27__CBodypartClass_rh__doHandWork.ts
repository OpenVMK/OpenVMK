// d0e535313898676eb605277339b50f27.cct / CBodypartClass_rh / doHandWork

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function doHandWork(_me: LingoMe, tAct: LingoValue) {
  if (lingoBinary("neq", callMethod("getOne", new LingoList(["lh", "ls", "li", "rh", "rs", "ri"]), meProp(_me, "m_sPart")), 0)) {
  setMeProp(_me, "m_sAction", tAct);
  }

}

