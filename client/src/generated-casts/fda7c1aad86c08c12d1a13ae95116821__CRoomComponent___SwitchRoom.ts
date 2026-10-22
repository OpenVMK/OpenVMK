// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomComponent / _SwitchRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SwitchRoom(_me: LingoMe, _this: LingoValue, a_sActive: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rContext"))) {
  setMeProp(_me, "m_rRoomXML", callNamed("CreateXML"));
  callMethod("Remove", meProp(_me, "m_rFactory"), callMethod("GetKey", meProp(_me, "m_rContext")))
  setMeProp(_me, "m_rContext", undefined);
  }

  callNamed("removeUpdate", callMethod("getID", _this))
  callNamed("executeMessage", "room_leave")
  setMeProp(_me, "m_iVersion", 0);
  callMethod("setaProp", meProp(_me, "m_rCache"), a_sActive, callMethod("getaProp", meProp(_me, "m_rCache"), meProp(_me, "m_sActive")))
  callMethod("_PrepareRoom", _this, a_sActive, symbol("localswitch"))
}

