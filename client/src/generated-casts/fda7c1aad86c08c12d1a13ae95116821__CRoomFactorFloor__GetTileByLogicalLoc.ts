// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorFloor / GetTileByLogicalLoc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetTileByLogicalLoc(_me: LingoMe, _this: LingoValue, a_xTile: LingoValue, a_yTile: LingoValue) {
  var t_rObj = callMethod("getObject", _this);
  var t_iSiz = callNamed("integer", callMethod("GetParam", callMethod("GetContext", t_rObj), "TILESIZE"));
  var t_iCnt = callMethod("GetCount", t_rObj);
  var t_iX = lingoBinary("sub", lingoBinary("mul", a_xTile, t_iSiz), t_iSiz);
  var t_iY = lingoBinary("sub", lingoBinary("mul", a_yTile, t_iSiz), t_iSiz);
  for (var i = 1; i <= t_iCnt; ++i) {
  var t_rTile = t_rObj[i];
  var t_vePos = callMethod("GetRelPos", t_rTile);
  if (lingoBinary("eq", t_vePos.x, t_iX)) {
  if (lingoBinary("eq", t_vePos.y, t_iY)) {
  return t_rTile;
  }

  }

  }

  return undefined;
}

