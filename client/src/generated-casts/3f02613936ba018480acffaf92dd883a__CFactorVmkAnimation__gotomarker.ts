// 3f02613936ba018480acffaf92dd883a.cct / CFactorVmkAnimation / gotomarker

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function gotomarker(_me: LingoMe, a_sMarkerName: LingoValue, i_offset: LingoValue) {
  var t_iFrame = meProp(_me, "m_ar_rMarkers")[a_sMarkerName];
  if (callNamed("integerp", t_iFrame)) {
  callMethod("SetParam", callMethod("getObject", _me), "FRAMECOUNTER", t_iFrame)
  callMethod("SetParam", callMethod("getObject", _me), "ANIMATIONSTATE", symbol("play"))
  }

}

