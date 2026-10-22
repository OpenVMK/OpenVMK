// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorElement / _TestComposition

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TestComposition(_me: LingoMe, _this: LingoValue, a_rTile: LingoValue, a_iStack: LingoValue) {
  var t_rContext = callMethod("GetContext", callMethod("getObject", _this));
  var t_rObj = callMethod("getObject", _this);
  var t_rStruct = callMethod("GetParam", t_rObj, "STRUCT");
  var t_iDir = callNamed("integer", callMethod("GetParam", t_rObj, "DIR"));
  for (var t_rDir of t_rStruct.child.toArray()) {
  if (lingoBinary("eq", callNamed("integer", t_rDir.param["NUM"]), t_iDir)) {
  var t_rBlocks = t_rDir.child;
  break;
  }

  }

  if (callNamed("voidp", t_rBlocks)) {
  return 1;
  }

  var t_iTileSize = callNamed("integer", callMethod("GetParam", callMethod("GetContext", callMethod("getObject", _this)), "TILESIZE"));
  if (callNamed("voidp", a_rTile)) {
  return 0;
  }

  var t_rFloor = a_rTile;
  var t_iLoopBreaker = 1;
  while (1) {
  if (lingoBinary("eq", callMethod("GetParam", t_rFloor, "CLASS"), "floor")) {
  break;
  } else {
  t_rFloor = callMethod("GetOwner", t_rFloor);
  }

  t_iLoopBreaker = lingoBinary("add", t_iLoopBreaker, 1);
  if (lingoBinary("gt", t_iLoopBreaker, 100)) {
  callNamed("error", _this, "ROOM DATABASE CORRUPTED: Infinite loop in find floor object!", symbol("_TestComposition"))
  return 0;
  }

  }

  for (var t_rBlock of t_rBlocks.toArray()) {
  var t_iX = lingoBinary("add", callMethod("GetRelPos", a_rTile).x, lingoBinary("mul", callNamed("integer", t_rBlock.param["X"]), t_iTileSize));
  var t_iY = lingoBinary("add", callMethod("GetRelPos", a_rTile).y, lingoBinary("mul", callNamed("integer", t_rBlock.param["Y"]), t_iTileSize));
  var t_rTile = callMethod("GetTileByRelLoc", callMethod("GetFactor", t_rFloor), t_iX, t_iY);
  if (callNamed("voidp", t_rTile)) {
  return 0;
  }

  }

  return 1;
}

