// vmk_music_mixer.cct / CMusicMixerSongList / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe, updateAll: LingoValue) {
  callMethod("fill", meProp(_me, "m_pImage"), meProp(_me, "m_pImage").rect, new LingoPropList([symbol("color"), meProp(_me, "m_fillColor")]))
  var tImg = callMethod("duplicate", callNamed("getMember", "field.i.active").image);
  for (var i = 1; i <= 4; ++i) {
  var tY = lingoBinary("mul", meProp(_me, "m_iLineHeight"), lingoBinary("sub", i, 1));
  callMethod("copyPixels", meProp(_me, "m_pImage"), tImg, lingoBinary("add", tImg.rect, callNamed("rect", 0, tY, 0, tY)), tImg.rect, new LingoPropList([symbol("blend"), 50]))
  }

  for (var song of meProp(_me, "m_pSongs").toArray()) {
  if (updateAll) {
  setThePropOf(song, "m_bUpdate", 1);
  }

  callMethod("render", song)
  }

  for (var i = 1; i <= meProp(_me, "m_pSongs").count; ++i) {
  tY = lingoBinary("mul", meProp(_me, "m_iLineHeight"), lingoBinary("sub", i, 1));
  tImg = callMethod("getImage", meProp(_me, "m_pSongs")[i]);
  callMethod("copyPixels", meProp(_me, "m_pImage"), tImg, lingoBinary("add", tImg.rect, callNamed("rect", 0, tY, 0, tY)), tImg.rect)
  }

  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  var tElem = callMethod("getElement", tWndObj, meProp(_me, "m_ElemID"));
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("feedImage", tElem, meProp(_me, "m_pImage"))
  }

  }

}

