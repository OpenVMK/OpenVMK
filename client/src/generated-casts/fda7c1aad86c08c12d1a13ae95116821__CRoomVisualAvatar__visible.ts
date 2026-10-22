// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualAvatar / visible

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function visible(_me: LingoMe, _this: LingoValue, a_sBoolAvat: LingoValue, a_sBoolSdw: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", a_sBoolAvat)) ? 0 : 1)) {
  if (lingoBinary("gt", meProp(_me, "m_rCanvasSpr").spriteNum, 0)) {
  setThePropOf(meProp(_me, "m_rCanvasSpr"), "visible", a_sBoolAvat);
  }

  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rShadowSpr"))) ? 0 : 1)) {
  if (lingoBinary("gt", meProp(_me, "m_rShadowSpr").spriteNum, 0)) {
  setThePropOf(meProp(_me, "m_rShadowSpr"), "visible", a_sBoolSdw);
  }

  }

}

