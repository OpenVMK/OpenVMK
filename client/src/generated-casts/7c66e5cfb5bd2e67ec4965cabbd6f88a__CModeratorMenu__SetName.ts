// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorMenu / SetName

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetName(_me: LingoMe, _this: LingoValue, a_sName: LingoValue) {
  if (callNamed("stringp", a_sName)) {
  setMeProp(_me, "m_sName", a_sName);
  setMeProp(_me, "m_ObjUserToOperate", undefined);
  } else {
  if (lingoBinary("eq", a_sName, "")) {
  setMeProp(_me, "m_sName", a_sName);
  setMeProp(_me, "m_ObjUserToOperate", undefined);
  }

  }

}

