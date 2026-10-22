// aca6270bdaa8e5cb4cb1dbde797fa88d.cct / CPhotoAlbumViewer / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sWindowTitle", "PhotoAlbumViewer");
  if (callNamed("createWindow", meProp(_me, "m_sWindowTitle"), "vmk_basic.window")) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (callMethod("merge", tWndObj, "vmk_fto_album.window")) {
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcPhotoAlbum"), callMethod("getID", _me), symbol("mouseUp"))
  setMeProp(_me, "m_iCurrentID", -float(1));
  callMethod("RequestNextPhoto", _me, meProp(_me, "m_iCurrentID"))
  callMethod("feedImage", callMethod("getElement", tWndObj, "fto.view"), callNamed("getMember", "loaderimg").image)
  callMethod("deactivate", callMethod("getElement", tWndObj, "fto.nextphoto.button"))
  callMethod("deactivate", callMethod("getElement", tWndObj, "fto.previousphoto.button"))
  if ((lingoTruthy(callMethod("get", callNamed("getObject", "session"), "ControlRoom")) ? 0 : 1)) {
  callMethod("hide", callMethod("getElement", tWndObj, "fto.taketocatalog.button"))
  } else {
  callMethod("deactivate", callMethod("getElement", tWndObj, "fto.taketocatalog.button"))
  }

  return 1;
  }

  }

  return 0;
}

