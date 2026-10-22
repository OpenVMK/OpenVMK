// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomMouseEventAgent / mouseUpOutSide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mouseUpOutSide(_me: LingoMe, _this: LingoValue) {
  if (callMethod("Process", meProp(_me, "m_rProcessor"), symbol("mouseUpOutSide"), meProp(_me, "m_sOwnerKey"))) {
  callNamed("stopEvent")
  } else {
  callNamed("pass")
  }

}

