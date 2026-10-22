// vmk_casual_checkers.cct / CCheckersGameEngine / setup

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setup(_me: LingoMe, _this: LingoValue, a_iGameID: LingoValue, a_rRoomContext: LingoValue) {
  setMeProp(_me, "m_iGameID", a_iGameID);
  setMeProp(_me, "m_rRoomContext", a_rRoomContext);
  var t_iRef = 0;
  while (1) {
  var t_rTileSet = callMethod("_AccessIndexed", a_rRoomContext, t_iRef, "floor");
  if (callNamed("voidp", t_rTileSet)) {
  break;
  }

  if (lingoBinary("eq", callMethod("GetParam", t_rTileSet, "NAME"), "board")) {
  setMeProp(_me, "m_rTileSetBoard", t_rTileSet);
  break;
  }

  t_iRef = lingoBinary("add", t_iRef, 1);
  }

  if (callNamed("voidp", meProp(_me, "m_rTileSetBoard"))) {
  return callNamed("error", _this, "Checkers board tileset not found!", symbol("setup"));
  }

  setMeProp(_me, "m_mp_iRef_rPiece", new LingoPropList([]));
  var t_rIterator = callMethod("GetIterator", a_rRoomContext, "element");
  while (1) {
  var t_rPiece = callMethod("getToken", t_rIterator);
  if (callNamed("voidp", t_rPiece)) {
  break;
  }

  if (callMethod("GetParam", t_rPiece, "CHECKERS_GAME_PIECE")) {
  t_iRef = callNamed("integer", callMethod("GetParam", t_rPiece, "REF"));
  callMethod("setaProp", meProp(_me, "m_mp_iRef_rPiece"), t_iRef, t_rPiece)
  callMethod("SetGameEngine", callMethod("GetFactor", t_rPiece), _this)
  callMethod("SetAllowedTiles", callMethod("GetFactor", t_rPiece), new LingoList([]))
  }

  if ((lingoTruthy(callMethod("NextToken", t_rIterator)) ? 0 : 1)) {
  break;
  }

  }

  callMethod("clear", t_rIterator)
  t_rIterator = undefined;
  if (callNamed("objectp", meProp(_me, "m_rInterface"))) {
  callNamed("error", _this, "Checkers game interface already running!", symbol("setup"))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rInterface")))
  }

  setMeProp(_me, "m_rInterface", callNamed("createObject", callNamed("getUniqueID"), "CCheckersGameInterface"));
  callMethod("SetGameEngine", meProp(_me, "m_rInterface"), _this)
}

