// fb329984daeb374016fc0289347418de.cct / CWallPhotoViewer / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sWindowTitle", "WallPhotoViewer");
  setMeProp(_me, "m_iId", undefined);
  setMeProp(_me, "m_iRef", undefined);
  if (callNamed("createWindow", meProp(_me, "m_sWindowTitle"), "vmk_fto_wallview.window")) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcPhotoPoster"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("feedImage", callMethod("getElement", tWndObj, "fto.view"), callNamed("getMember", "loaderImg").image)
  callMethod("hide", callMethod("getElement", tWndObj, "fto.taketocatalog.button"))
  callMethod("regMsgList", _me, 1)
  return 1;
  }

  return 0;
}

