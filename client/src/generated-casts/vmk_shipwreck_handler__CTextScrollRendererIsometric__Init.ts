// vmk_shipwreck_handler.cct / CTextScrollRendererIsometric / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, t_sClientID: LingoValue, t_sFontName: LingoValue, t_iWidth: LingoValue, t_iHeight: LingoValue) {
  setMeProp(_me, "m_sClientID", t_sClientID);
  setMeProp(_me, "m_pImage", callNamed("image", t_iWidth, t_iHeight, 32));
  setMeProp(_me, "m_BitmapFont", callNamed("createObject", lingoBinary("join", callMethod("getID", _me), ".bitmapfont"), "CBitmapFont"));
  callMethod("Init", meProp(_me, "m_BitmapFont"), t_sFontName)
  callMethod("clearArea", _me)
}

