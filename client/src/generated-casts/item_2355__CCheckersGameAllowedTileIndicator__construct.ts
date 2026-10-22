// item_2355.cct / CCheckersGameAllowedTileIndicator / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  var m_bReady = 0;
  setMeProp(_me, "m_rSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _this))));
  setMeProp(_me, "m_rMember", callNamed("getMember", "CheckersAllowedTileMark"));
  setThePropOf(meProp(_me, "m_rSprite"), "member", meProp(_me, "m_rMember"));
  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  callNamed("setEventBroker", meProp(_me, "m_rSprite").spriteNum, callMethod("getID", _this))
  callMethod("registerProcedure", meProp(_me, "m_rSprite"), symbol("EventProc"), callMethod("getID", _this), symbol("mouseUp"))
  callNamed("registerMessage", "room_tile_selection", callMethod("getID", _this), symbol("_TileSelectedCbk"))
  return 1;
}

