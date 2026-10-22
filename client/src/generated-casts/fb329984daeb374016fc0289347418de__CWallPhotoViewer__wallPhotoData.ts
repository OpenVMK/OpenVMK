// fb329984daeb374016fc0289347418de.cct / CWallPhotoViewer / wallPhotoData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function wallPhotoData(_me: LingoMe, tdata: LingoValue, a_iID: LingoValue) {
  setThePropOf(callNamed("getMember", "PosterStore"), "media", tdata.image);
  setThePropOf(callNamed("getMember", "PosterStore"), "palette", callNamed("getMember", "sepia_palette_poster"));
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  callMethod("feedImage", callMethod("getElement", tWndObj, "fto.view"), callNamed("getMember", "PosterStore").image)
  }

}

