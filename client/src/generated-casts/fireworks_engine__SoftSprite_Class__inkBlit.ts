// fireworks_engine.cct / SoftSprite Class / inkBlit

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function inkBlit(_me: LingoMe, i_rect: LingoValue, i_ink: LingoValue, o_buffer: LingoValue) {
  callMethod("copyPixels", o_buffer, meProp(_me, "m_image"), i_rect, meProp(_me, "m_image").rect, i_ink)
}

