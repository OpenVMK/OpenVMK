// d0e535313898676eb605277339b50f27.cct / CEmoticonGrid / GetSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSelected(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("lt", meProp(_me, "m_mp_iRef_rItem").count, meProp(_me, "m_iSelected"))) {
  return new LingoPropList([symbol("ref"), -float(1), symbol("code"), -float(1), symbol("param"), -float(1), symbol("state"), symbol("invalid")]);
  } else {
  return meProp(_me, "m_mp_iRef_rItem")[meProp(_me, "m_iSelected")];
  }

}

