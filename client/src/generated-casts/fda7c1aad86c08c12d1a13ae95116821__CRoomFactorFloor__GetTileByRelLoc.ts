// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorFloor / GetTileByRelLoc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetTileByRelLoc(_me: LingoMe, _this: LingoValue, a_iX: LingoValue, a_iY: LingoValue) {
  var t_rObj = callMethod("getObject", _this);
  var t_iCnt = callMethod("GetCount", t_rObj);
  for (var i = 1; i <= t_iCnt; ++i) {
  var t_rTile = t_rObj[i];
  var t_vePos = callMethod("GetRelPos", t_rTile);
  if (lingoBinary("eq", t_vePos.x, a_iX)) {
  if (lingoBinary("eq", t_vePos.y, a_iY)) {
  return t_rTile;
  }

  }

  }

  return undefined;
}

