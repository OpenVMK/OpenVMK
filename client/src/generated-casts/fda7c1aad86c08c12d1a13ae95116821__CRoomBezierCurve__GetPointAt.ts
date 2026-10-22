// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomBezierCurve / GetPointAt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetPointAt(_me: LingoMe, _this: LingoValue, a_fTime: LingoValue) {
  if (lingoBinary("gte", a_fTime, float(1))) {
  return callMethod("getLast", meProp(_me, "m_ar_vCurve"));
  } else {
  var t_fPos = lingoBinary("mul", a_fTime, lingoBinary("sub", meProp(_me, "m_ar_vCurve").count, 1));
  var t_iPos = callNamed("floor", t_fPos);
  var t_fOffset = lingoBinary("sub", t_fPos, t_iPos);
  var t_vStart = meProp(_me, "m_ar_vCurve")[lingoBinary("add", t_iPos, 1)];
  var t_vEnd = meProp(_me, "m_ar_vCurve")[lingoBinary("add", t_iPos, 2)];
  return lingoBinary("add", t_vStart, lingoBinary("mul", lingoBinary("sub", t_vEnd, t_vStart), t_fOffset));
  }

}

