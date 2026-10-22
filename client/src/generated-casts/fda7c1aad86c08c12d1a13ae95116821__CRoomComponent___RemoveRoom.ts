// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomComponent / _RemoveRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RemoveRoom(_me: LingoMe, _this: LingoValue) {
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_rContext"))) ? 0 : 1)) {
  return callNamed("error", _this, "Context already removed!", symbol("_RemoveRoom"));
  } else {
  callNamed("executeMessage", "room_leave")
  }

  if (callMethod("Remove", meProp(_me, "m_rFactory"), callMethod("GetKey", meProp(_me, "m_rContext")))) {
  setMeProp(_me, "m_rRoomXML", callNamed("CreateXML"));
  setMeProp(_me, "m_rContext", undefined);
  callMethod("_UnloadRoom", _this, meProp(_me, "m_sActive"))
  }

  callNamed("removeUpdate", callMethod("getID", _this))
  callMethod("_ResetProcess", _this)
  setMeProp(_me, "m_sActive", "");
  setMeProp(_me, "m_fPercent", float(0));
  callMethod("hideLoadBar", callMethod("getInterface", _this))
}

