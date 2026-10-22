// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomAvatarProfile / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("unregisterMessage", "ask_friendship", callMethod("getID", _this))
  callNamed("unregisterMessage", "RemoveAvatar", callMethod("getID", _this))
  callNamed("unregisterMessage", "CreateAvatar", callMethod("getID", _this))
  setMeProp(_me, "m_rSelected", undefined);
  if (callNamed("objectp", meProp(_me, "m_rControls"))) {
  callNamed("removeWindow", callMethod("getID", meProp(_me, "m_rControls")))
  setMeProp(_me, "m_rControls", undefined);
  }

  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rPinGrid")))
  setMeProp(_me, "m_rPinGrid", undefined);
  setMeProp(_me, "m_ar_rPinData", undefined);
  return 1;
}

