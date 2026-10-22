// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CGiftInterface / PushPicture

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PushPicture(_me: LingoMe, _this: LingoValue, a_mpParams: LingoValue) {
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim"), undefined)
  callNamed("removeUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  setMeProp(_me, "m_bLoadingImage", 0);
  if ((lingoTruthy(lingoBinary("eq", meProp(_me, "m_mp_sUrl_rMember")[a_mpParams.mem]._type, symbol("bitmap"))) ? 0 : 1)) {
  return callNamed("error", _this, "There was a problem downloading the gift bg image, aborting.", symbol("PushPicture"));
  }

  if (callNamed("objectp", a_mpParams[symbol("element")])) {
  callMethod("feedImage", a_mpParams[symbol("element")], meProp(_me, "m_mp_sUrl_rMember")[a_mpParams.mem].image)
  }

}

