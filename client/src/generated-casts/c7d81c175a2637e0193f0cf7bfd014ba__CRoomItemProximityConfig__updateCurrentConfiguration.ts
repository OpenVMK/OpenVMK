// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemProximityConfig / updateCurrentConfiguration

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateCurrentConfiguration(_me: LingoMe, a_ar_Configuration: LingoValue) {
  for (var i = 1; i <= a_ar_Configuration.count; ++i) {
  var t_sProp = callMethod("getPropAt", a_ar_Configuration, i);
  var t_iValue = callNamed("value", a_ar_Configuration[i]);
  meProp(_me, "m_ar_configuration")[t_sProp] = t_iValue;
  }

}

