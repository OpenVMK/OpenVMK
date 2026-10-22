// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraComponent / binaryDataStored

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function binaryDataStored(_me: LingoMe, tContent: LingoValue) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Picture stored succesfully", "ID:"), tContent.word[1]), "Checksum:"), tContent.word[2]))
  callMethod("setFilmAmount", _me, lingoBinary("sub", meProp(_me, "m_filmAmount"), 1))
  setMeProp(_me, "m_photoid", callNamed("integer", tContent.word[1]));
}

