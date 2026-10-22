// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomBezierCurve / AddPoint

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddPoint(_me: LingoMe, _this: LingoValue, a_vPnt: LingoValue) {
  callMethod("add", meProp(_me, "m_ar_vCurve"), a_vPnt)
}

