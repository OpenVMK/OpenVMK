// fireworks_engine.cct / SoftSprite Class / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_pos", callNamed("vector", 0, 0, 0));
  setMeProp(_me, "m_image", undefined);
  setMeProp(_me, "m_width", 0);
  setMeProp(_me, "m_height", 0);
}

