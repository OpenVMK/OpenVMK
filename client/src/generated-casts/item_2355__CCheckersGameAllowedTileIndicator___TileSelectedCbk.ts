// item_2355.cct / CCheckersGameAllowedTileIndicator / _TileSelectedCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TileSelectedCbk(_me: LingoMe, _this: LingoValue, a_rTile: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rTile"))) {
  if (lingoBinary("eq", callMethod("GetParam", a_rTile, "REF"), callMethod("GetParam", meProp(_me, "m_rTile"), "REF"))) {
  callMethod("MovePiece", meProp(_me, "m_rGameEngine"), meProp(_me, "m_rPiece"), meProp(_me, "m_rTile"))
  }

  }

}

