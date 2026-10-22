// fda7c1aad86c08c12d1a13ae95116821.cct / RoomMath / GetTileAtScrPos

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetTileAtScrPos(_me: LingoMe, t_vPos: LingoValue) {
  var a_rContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
  if ((lingoTruthy(callNamed("voidp", t_vPos)) ? 0 : 1)) {
  var t_rIterator = callMethod("GetIterator", a_rContext, "floor");
  if (callMethod("FirstToken", t_rIterator)) {
  while (1) {
  var t_rFloor = callMethod("getToken", t_rIterator);
  if (callNamed("voidp", t_rFloor)) {
  break;
  }

  var t_rTile = callMethod("GetTileByScrLoc", callMethod("GetVisual", t_rFloor), callNamed("integer", t_vPos.x), callNamed("integer", t_vPos.y));
  if (callNamed("objectp", t_rTile)) {
  return t_rTile;
  break;
  }

  if ((lingoTruthy(callMethod("NextToken", t_rIterator)) ? 0 : 1)) {
  break;
  }

  }

  } else {
  }

  } else {
  }

  return undefined;
}

