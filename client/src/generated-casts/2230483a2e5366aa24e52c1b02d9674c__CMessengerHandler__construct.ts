// 2230483a2e5366aa24e52c1b02d9674c.cct / CMessengerHandler / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setThePropOf(_me, "m_bDebug", 0);
  callMethod("regMsgList", _me, 1)
  callNamed("registerMessage", "init_messenger", callMethod("getID", _me), symbol("InitMessengerOnce"))
  return 1;
}

