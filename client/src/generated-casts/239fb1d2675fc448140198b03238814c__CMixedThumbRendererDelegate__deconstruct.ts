// 239fb1d2675fc448140198b03238814c.cct / CMixedThumbRendererDelegate / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rCallback", undefined);
  setMeProp(_me, "m_mp_iType_rOutput", undefined);
  setMeProp(_me, "m_mp_kCategory_mp_iType_rImage", undefined);
  return 1;
}

