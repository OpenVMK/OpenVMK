// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageBase / _ShowHideUI

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ShowHideUI(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bVisible")) {
  callMethod("close", _this)
  } else {
  callMethod("open", _this)
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callMethod("BringUpFront", meProp(_me, "m_rWindow"))
  }

  }

}

