// fireworks_engine.cct / SoftSprite Class / setCoordinates

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setCoordinates(_me: LingoMe, i_vector: LingoValue) {
  setMeProp(_me, "m_pos", i_vector);
}

