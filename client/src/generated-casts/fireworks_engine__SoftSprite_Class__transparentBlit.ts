// fireworks_engine.cct / SoftSprite Class / transparentBlit

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function transparentBlit(_me: LingoMe, i_posX: LingoValue, i_posY: LingoValue, i_transparency: LingoValue, o_buffer: LingoValue) {
  callMethod("copyPixels", o_buffer, meProp(_me, "m_image"), callNamed("rect", i_posX, i_posY, lingoBinary("add", i_posX, meProp(_me, "m_width")), lingoBinary("add", i_posY, meProp(_me, "m_height"))), meProp(_me, "m_image").rect, new LingoPropList([symbol("ink"), 32, symbol("blendLevel"), i_transparency]))
}

