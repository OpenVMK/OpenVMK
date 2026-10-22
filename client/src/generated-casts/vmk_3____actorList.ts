// vmk_3.dcr /  / actorList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function actorList(_me: LingoMe, m_sSecretCode2: LingoValue) {
  callNamed("getmemnum", "deconstruct")
  callNamed("sprite", callNamed("me", m_sSecretCode2))
}

