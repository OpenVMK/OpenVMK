// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomAvatarProfile / ShowPinInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowPinInfo(_me: LingoMe, _this: LingoValue, a_vParam: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", a_vParam)) ? 0 : 1)) {
  callMethod("MouseSelection", meProp(_me, "m_rPinGrid"), a_vParam)
  var t_iPin = callMethod("GetParam", meProp(_me, "m_rSelected"), lingoBinary("join", "pin.type.", callMethod("GetSelected", meProp(_me, "m_rPinGrid"))));
  if (callNamed("voidp", t_iPin)) {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rControls"), "avatarinfo.userspin"), "")
  } else {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rControls"), "avatarinfo.userspin"), callNamed("getText", lingoBinary("join", "item.", t_iPin)))
  if (theProperty("doubleClick")) {
  if (callNamed("objectp", meProp(_me, "m_rSelected"))) {
  var t_iPinIndex = lingoBinary("sub", callMethod("GetSelected", meProp(_me, "m_rPinGrid")), 1);
  callMethod("send", callNamed("getConnection", "VMK"), "RequestItemDetails", new LingoPropList([symbol("int"), callNamed("integer", callMethod("GetParam", meProp(_me, "m_rSelected"), "REF")), symbol("int"), 1, symbol("int"), t_iPinIndex]))
  }

  }

  }

  }

}

