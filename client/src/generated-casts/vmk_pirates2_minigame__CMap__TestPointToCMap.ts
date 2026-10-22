// vmk_pirates2_minigame.cct / CMap / TestPointToCMap

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TestPointToCMap(_me: LingoMe, i_pPoint: LingoValue) {
  var heightMapTileSize = meProp(_me, "m_tilesize");
  var heightMapOffsetX = meProp(_me, "m_offset").locH;
  var heightMapOffsetY = meProp(_me, "m_offset").locV;
  var tPos = i_pPoint;
  var heightMapX = lingoBinary("div", lingoBinary("add", lingoBinary("sub", callNamed("integer", tPos.locH), heightMapOffsetX), heightMapTileSize), heightMapTileSize);
  var heightMapY = lingoBinary("div", lingoBinary("add", lingoBinary("sub", callNamed("integer", tPos.locV), heightMapOffsetY), heightMapTileSize), heightMapTileSize);
  return callMethod("GetMapAt", _me, heightMapX, heightMapY);
}

