// fireworks_engine.cct / SoftSprite Class / setImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setImage(_me: LingoMe, i_image: LingoValue) {
  if ((lingoTruthy(callNamed("ilk", i_image, symbol("image"))) ? 0 : 1)) {
  callNamed("put", "SoftSprite Class : setImage() : not a valid input image")
  return 0;
  }

  setMeProp(_me, "m_image", i_image);
  setMeProp(_me, "m_width", meProp(_me, "m_image").width);
  setMeProp(_me, "m_height", meProp(_me, "m_image").height);
  return 1;
}

