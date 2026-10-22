// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurnitureMap / GetTypecodeList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetTypecodeList(_me: LingoMe, _this: LingoValue) {
  var t_ar_iOutput = new LingoList([]);
  for (var i = 1; i <= meProp(_me, "m_mp_iCode_rItem").count; ++i) {
  callMethod("append", t_ar_iOutput, callMethod("getPropAt", meProp(_me, "m_mp_iCode_rItem"), i))
  }

  return t_ar_iOutput;
}

