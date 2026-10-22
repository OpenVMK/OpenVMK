// aca6270bdaa8e5cb4cb1dbde797fa88d.cct / CPhotoAlbumViewer / albumEmpty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function albumEmpty(_me: LingoMe, tdata: LingoValue, a_iID: LingoValue) {
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "AlbumEmpty", 1, 1);
  callMethod("show", t)
  callMethod("setText", t, callNamed("getText", "photo_album_empty"), "Photo Album", "OK")
  callNamed("removeWindow", meProp(_me, "m_sWindowTitle"))
}

