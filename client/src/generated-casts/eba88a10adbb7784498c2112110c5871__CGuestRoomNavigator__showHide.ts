// eba88a10adbb7784498c2112110c5871.cct / CGuestRoomNavigator / showHide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showHide(_me: LingoMe) {
  if (callNamed("windowExists", meProp(_me, "m_sWindowTitle"))) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (callMethod("getProperty", tWndObj, symbol("visible"))) {
  callMethod("hide", tWndObj)
  } else {
  callMethod("show", tWndObj)
  callMethod("SetTabs", _me)
  callMethod("GetContent", _me)
  }

  } else {
  callNamed("createWindow", meProp(_me, "m_sWindowTitle"), meProp(_me, "m_sWindowResource"), 0, 0, symbol("modal"))
  tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcGuestRooms"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("SetTabs", _me)
  callMethod("SetVisibleElements", _me)
  callMethod("GetContent", _me)
  }

}

