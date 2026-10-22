// aca6270bdaa8e5cb4cb1dbde797fa88d.cct / CPhotoAlbumViewer / eventProcPhotoAlbum

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcPhotoAlbum(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "fto.nextphoto.button":
  callMethod("RequestNextPhoto", _me, meProp(_me, "m_iCurrentID"))
  break;
case "fto.previousphoto.button":
  callMethod("RequestPrevPhoto", _me, meProp(_me, "m_iCurrentID"))
  break;
case "fto.taketocatalog.button":
  callMethod("PublishPhoto", _me, meProp(_me, "m_iCurrentID"), 0)
  callNamed("executeMessage", "refresh_catalog")
  if (callNamed("windowExists", meProp(_me, "m_sWindowTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sWindowTitle"))
  }

  break;
case "close":
  if (callNamed("windowExists", meProp(_me, "m_sWindowTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sWindowTitle"))
  }

  break;
case "help":
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.camera")
  break;
  }

  }

}

