// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorMenu / SetPermissions

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetPermissions(_me: LingoMe, _this: LingoValue, a_ar_PermList: LingoValue) {
  if (callNamed("listp", a_ar_PermList)) {
  setMeProp(_me, "m_ar_PermList", a_ar_PermList);
  }

}

