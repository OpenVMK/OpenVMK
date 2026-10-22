// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorElement / GetBlocks

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetBlocks(_me: LingoMe, _this: LingoValue) {
  var t_ar_rBlock = new LingoList([]);
  var t_rContext = callMethod("GetContext", callMethod("getObject", _this));
  for (var t_sKey of meProp(_me, "m_ar_sKey").toArray()) {
  callMethod("add", t_ar_rBlock, callMethod("GetObjByKey", t_rContext, t_sKey))
  }

  return t_ar_rBlock;
}

