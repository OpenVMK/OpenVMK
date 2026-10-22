// vmk_checkers_handler.cct / CVMKCheckersSpaceInterface / Initialize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Initialize(_me: LingoMe, _this: LingoValue, a_sNodeName: LingoValue) {
  var t_sNodeName = "cg_1";
  var t_rRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var t_rNode = callMethod("Search", t_rRoomContext, "NAME", t_sNodeName);
  if (lingoBinary("neq", t_rNode, 0)) {
  var t_rSprite = callMethod("getSprite", callMethod("GetVisual", t_rNode));
  callMethod("append", meProp(_me, "m_ar_rSprites"), t_rSprite)
  callNamed("setEventBroker", t_rSprite.spriteNum, t_sNodeName)
  callMethod("registerProcedure", t_rSprite, symbol("eventProcRoom"), callMethod("getID", _this), symbol("mouseUp"))
  setThePropOf(t_rSprite, "cursor", new LingoList([callNamed("getMember", "cursor.finger"), callNamed("getMember", "cursor.finger.mask")]));
  }

}

