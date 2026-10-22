// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualDefault / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  var t_veAbs = callMethod("GetAbsPos", callMethod("getObject", _this));
  if (lingoBinary("gt", meProp(_me, "m_rSprite").spriteNum, 0)) {
  if (lingoBinary("neq", meProp(_me, "m_veLastAbs"), t_veAbs)) {
  var t_veScr = callMethod("GetScrPos", callMethod("getObject", _this));
  setThePropOf(meProp(_me, "m_rSprite"), "locH", t_veScr.x);
  setThePropOf(meProp(_me, "m_rSprite"), "locV", t_veScr.y);
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", t_veScr.z);
  }

  }

  setMeProp(_me, "m_veLastAbs", t_veAbs);
}

