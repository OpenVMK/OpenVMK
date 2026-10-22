// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogInterface / showHidePhotoCatalog

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showHidePhotoCatalog(_me: LingoMe, a_visibility: LingoValue) {
  setMeProp(_me, "m_visible", (lingoTruthy(meProp(_me, "m_visible")) ? 0 : 1));
  if ((lingoTruthy(callNamed("voidp", a_visibility)) ? 0 : 1)) {
  setMeProp(_me, "m_visible", a_visibility);
  }

  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (meProp(_me, "m_visible")) {
  if (lingoBinary("eq", tWndObj, 0)) {
  if ((lingoTruthy(callNamed("createWindow", meProp(_me, "m_sWindowTitle"), "vmk_basic.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Could not create photo catalog window", symbol("showHidePhotoCatalog"));
  }

  tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  var t_Elem = callMethod("getElement", tWndObj, "basic.window.title");
  if (lingoBinary("neq", t_Elem, 0)) {
  callMethod("setText", t_Elem, callNamed("getText", "fto.catalog.title"))
  }

  callMethod("mergeClientRect", _me, tWndObj)
  }

  callMethod("center", tWndObj)
  callMethod("show", tWndObj)
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcPhotoCatalog"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcPhotoCatalog"), callMethod("getID", _me), symbol("keyDown"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcPhotoCatalog"), callMethod("getID", _me), symbol("keyUp"))
  callMethod("RequestPhotoIndex", callMethod("getHandler", _me))
  callMethod("TestAlbumState", callMethod("getHandler", _me))
  callMethod("reDraw", _me)
  callNamed("updateStage")
  } else {
  if (lingoBinary("neq", tWndObj, 0)) {
  callNamed("removeWindow", meProp(_me, "m_sWindowTitle"))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rThumblist"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rThumblist")))
  setMeProp(_me, "m_rThumblist", undefined);
  }

  }

}

