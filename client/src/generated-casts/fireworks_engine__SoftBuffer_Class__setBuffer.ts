// fireworks_engine.cct / SoftBuffer Class / setBuffer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setBuffer(_me: LingoMe, i_image: LingoValue) {
  if ((lingoTruthy(callNamed("ilk", i_image, symbol("image"))) ? 0 : 1)) {
  callNamed("put", "SoftBuffer Class : setBuffer() : not a valid input image")
  return 0;
  }

  setMeProp(_me, "m_pImage", i_image);
  return 1;
}

