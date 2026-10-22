// d0e535313898676eb605277339b50f27.cct / CBodypartClass_bu / setItemObj

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setItemObj(_me: LingoMe, tmodel: LingoValue) {
  if (lingoBinary("or", lingoBinary("eq", meProp(_me, "m_sPart"), "ri"), lingoBinary("eq", meProp(_me, "m_sPart"), "li"))) {
  setMeProp(_me, "m_iModel", tmodel);
  }

}

