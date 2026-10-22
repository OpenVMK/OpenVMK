// c7d81c175a2637e0193f0cf7bfd014ba.cct / CFurniSoundSettingsListener / checkSoundSettings

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function checkSoundSettings(_me: LingoMe, _this: LingoValue) {
  var passEvent = 1;
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_rOwner"))) ? 0 : 1)) {
  passEvent = 0;
  } else {
  if (lingoBinary("eq", callMethod("getOne", callMethod("handlers", meProp(_me, "m_rOwner")), meProp(_me, "m_kHandler")), 0)) {
  callNamed("put", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "[CFurniSoundSettingsListener Notice] ", meProp(_me, "m_rOwner")), " Missing "), meProp(_me, "m_kHandler")), "-handler"))
  passEvent = 0;
  }

  }

  if (passEvent) {
  callNamed("call", meProp(_me, "m_kHandler"), meProp(_me, "m_rOwner"))
  }

}

