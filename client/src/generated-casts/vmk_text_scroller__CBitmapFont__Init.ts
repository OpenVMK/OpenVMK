// vmk_text_scroller.cct / CBitmapFont / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, t_sFontName: LingoValue) {
  setMeProp(_me, "m_fontConfig", callNamed("getVariableValue", lingoBinary("join", t_sFontName, ".config")));
  setMeProp(_me, "m_BitmapFont", callMethod("createFontFromBitmap", _me, t_sFontName));
  setMeProp(_me, "m_Blank", callNamed("image", meProp(_me, "m_fontConfig").width, meProp(_me, "m_fontConfig").height, 32));
  callMethod("fill", meProp(_me, "m_Blank"), meProp(_me, "m_Blank").rect, new LingoPropList([symbol("color"), callNamed("rgb", "#000000")]))
}

