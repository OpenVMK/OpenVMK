// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualAvatar / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rRenderer"))) {
  callMethod("deconstruct", meProp(_me, "m_rRenderer"))
  setMeProp(_me, "m_rRenderer", undefined);
  }

  if (lingoBinary("eq", callNamed("ilk", meProp(_me, "m_rMember")), symbol("member"))) {
  callNamed("removeMember", meProp(_me, "m_rMember").name)
  setMeProp(_me, "m_rMember", undefined);
  }

  if (callNamed("objectExists", "RoomEventProcessor")) {
  var t_rSprMgr = callNamed("getObject", "RoomEventProcessor");
  } else {
  t_rSprMgr = callNamed("createObject", "RoomEventProcessor", "CRoomMouseEventProcessor");
  }

  if (lingoBinary("eq", callNamed("ilk", meProp(_me, "m_rCanvasSpr")), symbol("sprite"))) {
  callMethod("RemoveSprite", t_rSprMgr, meProp(_me, "m_rCanvasSpr"))
  setMeProp(_me, "m_rCanvasSpr", undefined);
  }

  if (lingoBinary("eq", callNamed("ilk", meProp(_me, "m_rShadowSpr")), symbol("sprite"))) {
  callMethod("RemoveSprite", t_rSprMgr, meProp(_me, "m_rShadowSpr"))
  setMeProp(_me, "m_rShadowSpr", undefined);
  }

  return 1;
}

