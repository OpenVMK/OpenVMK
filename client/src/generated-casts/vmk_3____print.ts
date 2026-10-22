// vmk_3.dcr /  / print

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function print(_me: LingoMe, m_sSecretCode2: LingoValue, _TradeResponse: LingoValue) {
  if (callNamed("width", _TradeResponse)) {
  callNamed("sprite", 0)
  }

  callNamed("sprite", callNamed("locZ", callMethod("pauseUpdate", m_sSecretCode2.getPropAt, _TradeResponse)))
}

