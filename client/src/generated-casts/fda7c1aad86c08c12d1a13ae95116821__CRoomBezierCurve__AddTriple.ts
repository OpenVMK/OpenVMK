// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomBezierCurve / AddTriple

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddTriple(_me: LingoMe, _this: LingoValue, a_vA: LingoValue, a_vB: LingoValue, a_vC: LingoValue) {
  callMethod("add", meProp(_me, "m_ar_vCurve"), a_vA)
  callMethod("add", meProp(_me, "m_ar_vCurve"), a_vB)
  callMethod("add", meProp(_me, "m_ar_vCurve"), a_vC)
}

