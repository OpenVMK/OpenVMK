// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomItemAssetManager / _CheckDepenciesForType

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _CheckDepenciesForType(_me: LingoMe, _this: LingoValue, a_iTypeCode: LingoValue) {
  var t_rType = callMethod("getaProp", meProp(_me, "m_mp_iType_rProps"), a_iTypeCode);
  if ((lingoTruthy(callNamed("voidp", t_rType)) ? 0 : 1)) {
  if (lingoBinary("eq", t_rType.status, symbol("ready"))) {
  return 1;
  }

  }

  for (var t_sCast of t_rType.casts.toArray()) {
  var t_rProps = meProp(_me, "m_mp_sCast_rProps")[t_sCast];
  if (callNamed("voidp", t_rProps)) {
  return 0;
  }

  if (lingoBinary("neq", t_rProps.status, symbol("ready"))) {
  return 0;
  }

  }

  return 1;
}

