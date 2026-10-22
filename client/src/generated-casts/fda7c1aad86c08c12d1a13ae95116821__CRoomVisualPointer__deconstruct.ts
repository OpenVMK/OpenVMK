// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualPointer / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_bReady", 0);
  if (callNamed("objectExists", "RoomEventProcessor")) {
  var t_rSprMgr = callNamed("getObject", "RoomEventProcessor");
  } else {
  t_rSprMgr = callNamed("createObject", "RoomEventProcessor", "CRoomMouseEventProcessor");
  }

  if (lingoBinary("eq", callNamed("ilk", meProp(_me, "m_rSprite")), symbol("sprite"))) {
  if (lingoBinary("gt", meProp(_me, "m_rSprite").spriteNum, 0)) {
  callMethod("RemoveSprite", t_rSprMgr, meProp(_me, "m_rSprite"))
  setMeProp(_me, "m_rSprite", undefined);
  }

  }

  setMeProp(_me, "m_rMember", undefined);
  return 1;
}

