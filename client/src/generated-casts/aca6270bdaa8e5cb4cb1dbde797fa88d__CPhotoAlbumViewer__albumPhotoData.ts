// aca6270bdaa8e5cb4cb1dbde797fa88d.cct / CPhotoAlbumViewer / albumPhotoData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function albumPhotoData(_me: LingoMe, tdata: LingoValue, a_iID: LingoValue) {
  setThePropOf(callNamed("getMember", "AlbumStore"), "media", tdata.image);
  setThePropOf(callNamed("getMember", "AlbumStore"), "palette", callNamed("getMember", "sepia_palette_album"));
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  callMethod("feedImage", callMethod("getElement", tWndObj, "fto.view"), callNamed("getMember", "AlbumStore").image)
  callMethod("Activate", callMethod("getElement", tWndObj, "fto.nextphoto.button"))
  callMethod("Activate", callMethod("getElement", tWndObj, "fto.previousphoto.button"))
  callMethod("Activate", callMethod("getElement", tWndObj, "fto.taketocatalog.button"))
  }

}

