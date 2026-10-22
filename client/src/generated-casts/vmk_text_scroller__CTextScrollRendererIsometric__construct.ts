// vmk_text_scroller.cct / CTextScrollRendererIsometric / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_pImage", callNamed("image", 0, 0, 32));
  setMeProp(_me, "m_sClientID", "");
  setMeProp(_me, "m_pBgImg", 0);
  setMeProp(_me, "m_BitmapFont", 0);
  callMethod("setAngle", _me, 60)
  setMeProp(_me, "m_pOffset", callNamed("point", 0, 0));
  callMethod("clearArea", _me)
  return 1;
}

