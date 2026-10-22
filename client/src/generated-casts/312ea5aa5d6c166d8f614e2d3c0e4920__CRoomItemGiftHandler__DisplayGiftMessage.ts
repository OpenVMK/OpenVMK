// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemGiftHandler / DisplayGiftMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DisplayGiftMessage(_me: LingoMe, tMsg: LingoValue) {
  var t_mp_GiftData = new LingoPropList([]);
  callMethod("addProp", t_mp_GiftData, symbol("invId"), callMethod("GetIntFrom", tMsg.connection))
  var t_iRef = callMethod("GetIntFrom", tMsg.connection);
  callMethod("addProp", t_mp_GiftData, symbol("editable"), callMethod("GetIntFrom", tMsg.connection))
  callMethod("addProp", t_mp_GiftData, symbol("backgroundCode"), callMethod("GetIntFrom", tMsg.connection))
  callMethod("addProp", t_mp_GiftData, symbol("headline"), callMethod("GetStrFrom", tMsg.connection))
  callMethod("addProp", t_mp_GiftData, symbol("GiftText"), callMethod("GetStrFrom", tMsg.connection))
  callMethod("addProp", t_mp_GiftData, symbol("Sender"), callMethod("GetStrFrom", tMsg.connection))
  callMethod("addProp", t_mp_GiftData, symbol("date"), callMethod("GetStrFrom", tMsg.connection))
  var t_iPos = callMethod("findPos", meProp(_me, "m_mp_GiftObjects"), callNamed("string", t_iRef));
  if (lingoBinary("gt", t_iPos, 0)) {
  var t_Obj = meProp(_me, "m_mp_GiftObjects")[t_iPos];
  }

  if (callNamed("objectExists", lingoBinary("join", "Gift", t_iRef))) {
  callNamed("removeObject", lingoBinary("join", "Gift", t_iRef))
  t_Obj = callNamed("createObject", lingoBinary("join", "Gift", t_iRef), "CGiftInterface");
  } else {
  t_Obj = callNamed("createObject", lingoBinary("join", "Gift", t_iRef), "CGiftInterface");
  }

  if (callNamed("objectp", t_Obj)) {
  callMethod("createGiftDialog", t_Obj, t_iRef, t_mp_GiftData, meProp(_me, "m_bSetmodal"))
  }

}

