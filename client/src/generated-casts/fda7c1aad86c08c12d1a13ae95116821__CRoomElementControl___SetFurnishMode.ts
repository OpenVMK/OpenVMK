// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomElementControl / _SetFurnishMode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SetFurnishMode(_me: LingoMe, _this: LingoValue, a_bFurnish: LingoValue) {
  if (a_bFurnish) {
  if (callNamed("objectp", meProp(_me, "m_rSelected"))) {
  callMethod("select", _this, meProp(_me, "m_rSelected"))
  }

  } else {
  callMethod("hide", meProp(_me, "m_rControls"))
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rSelected"))) ? 0 : 1)) {
  if ((lingoTruthy(callNamed("voidp", callMethod("GetVisual", meProp(_me, "m_rSelected")))) ? 0 : 1)) {
  callMethod("select", callMethod("GetVisual", meProp(_me, "m_rSelected")), 0)
  }

  }

  }

}

