// c7d81c175a2637e0193f0cf7bfd014ba.cct / CFurniSoundSettingsListener / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_kHandler", symbol("checkSoundSettings"));
  callNamed("registerMessage", "close_Settings", callMethod("getID", _this), symbol("checkSoundSettings"))
  return 1;
}

