// vmk_text_scroller.cct / CBitmapFont / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_BitmapFont", new LingoPropList([]));
  setMeProp(_me, "m_fontConfig", new LingoPropList([symbol("width"), 10, symbol("height"), 10, symbol("stepV"), 4, symbol("stepH"), 2]));
  setMeProp(_me, "m_pImage", callNamed("image", 0, 0, 32));
  setMeProp(_me, "m_Blank", callNamed("image", 0, 0, 32));
  return 1;
}

