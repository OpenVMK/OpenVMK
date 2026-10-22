// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomMouseEventAgent / mouseEnter

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mouseEnter(_me: LingoMe, _this: LingoValue) {
  if ((lingoTruthy(callMethod("Process", meProp(_me, "m_rProcessor"), symbol("mouseEnter"), meProp(_me, "m_sOwnerKey"))) ? 0 : 1)) {
  callNamed("pass")
  }

}

