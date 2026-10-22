// fireworks_engine.cct / 3D Object Class / transformMeAndChildren

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function transformMeAndChildren(_me: LingoMe, p_mp_Output: LingoValue, p_pMatrixStack: LingoValue) {
  var t_newMatrixStack = callMethod("duplicate", p_pMatrixStack);
  callMethod("multiply", meProp(_me, "m_pTransformMtx"), p_pMatrixStack, t_newMatrixStack)
  setMeProp(_me, "m_pWorldTransformMtx", t_newMatrixStack);
  setMeProp(_me, "m_bWorldTransformValid", 1);
  p_mp_Output[callMethod("getID", _me)] = new LingoList([]);
  callMethod("transform", _me, t_newMatrixStack, p_mp_Output[callMethod("getID", _me)])
  if (lingoBinary("gt", callMethod("count", meProp(_me, "m_ar_Children")), 0)) {
  callNamed("call", symbol("transformMeAndChildren"), meProp(_me, "m_ar_Children"), p_mp_Output, t_newMatrixStack)
  }

}

