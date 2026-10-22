// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemGhostPlacer / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_iUpdateType"))) {
  var t_iType = callNamed("value", callMethod("GetParam", callMethod("getObject", _this), "TYPE"));
  switch (t_iType) {
case 4006:
  setMeProp(_me, "m_iUpdateType", symbol("ghost_1_update"));
  break;
case 4007:
  setMeProp(_me, "m_iUpdateType", symbol("ghost_2_update"));
  break;
case 4008:
  setMeProp(_me, "m_iUpdateType", symbol("ghost_3_update"));
  break;
  }

  } else {
  callNamed("executeMessage", meProp(_me, "m_iUpdateType"), callMethod("getObject", _this))
  }

}

