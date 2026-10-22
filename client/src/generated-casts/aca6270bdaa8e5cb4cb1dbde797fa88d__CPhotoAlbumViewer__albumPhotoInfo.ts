// aca6270bdaa8e5cb4cb1dbde797fa88d.cct / CPhotoAlbumViewer / albumPhotoInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function albumPhotoInfo(_me: LingoMe, tdata: LingoValue, a_iID: LingoValue) {
  setMeProp(_me, "m_iCurrentID", callNamed("value", tdata.content.word[1]));
  var tCaption = tdata.content.word.range(3, tdata.content.word.count);
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  callMethod("setText", callMethod("getElement", tWndObj, "fto.view.caption"), tCaption)
  }

}

