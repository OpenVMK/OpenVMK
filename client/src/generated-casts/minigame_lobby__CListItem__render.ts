// minigame_lobby.cct / CListItem / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  var tWriter = callNamed("getWriter", meProp(_me, "m_sWriterID"));
  setMeProp(_me, "m_pImage", callMethod("render", tWriter, meProp(_me, "m_tText")));
  if (meProp(_me, "m_bSelected")) {
  var tFillImage = callNamed("image", meProp(_me, "m_pImage").width, meProp(_me, "m_pImage").height, meProp(_me, "m_pImage").depth);
  callMethod("fill", tFillImage, tFillImage.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), callNamed("rgb", "#000050")]))
  callMethod("copyPixels", meProp(_me, "m_pImage"), tFillImage, meProp(_me, "m_pImage").rect, tFillImage.rect, new LingoPropList([symbol("ink"), 1, symbol("blendLevel"), 50]))
  }

}

