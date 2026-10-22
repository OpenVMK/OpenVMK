// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorElement / CanBeMoved

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CanBeMoved(_me: LingoMe, _this: LingoValue) {
  var t_rContext = callMethod("GetContext", callMethod("getObject", _this));
  for (var t_sKey of meProp(_me, "m_ar_sKey").toArray()) {
  var t_rBlock = callMethod("GetObjByKey", t_rContext, t_sKey);
  if (callNamed("objectp", t_rBlock)) {
  var t_iCount = callMethod("GetCount", t_rBlock);
  if (lingoBinary("gt", t_iCount, 0)) {
  for (var i = 1; i <= t_iCount; ++i) {
  var t_rAbove = t_rBlock[i];
  if (lingoBinary("and", lingoBinary("neq", callMethod("GetParam", t_rAbove, "CLASS"), "avatar"), (lingoTruthy(lingoBinary("neq", callMethod("getPos", meProp(_me, "m_ar_sKey"), callMethod("GetKey", t_rAbove)), 0)) ? 0 : 1))) {
  return 0;
  break;
  }

  }

  }

  }

  }

  return 1;
}

