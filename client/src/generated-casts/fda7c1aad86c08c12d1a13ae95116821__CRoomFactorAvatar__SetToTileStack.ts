// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorAvatar / SetToTileStack

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetToTileStack(_me: LingoMe, _this: LingoValue, a_rTile: LingoValue, a_iStack: LingoValue) {
  var t_rObj = callMethod("getObject", _this);
  var t_rActual = a_rTile;
  for (var i = 1; i <= a_iStack; ++i) {
  if (lingoBinary("gt", callMethod("GetCount", t_rActual), 0)) {
  t_rActual = t_rActual[1];
  continue;
  }

  break;
  }

  callMethod("SetAbsPos", t_rObj, lingoBinary("add", callMethod("GetAbsPos", t_rActual), callNamed("vector", 0, 0, callNamed("integer", callMethod("GetParam", t_rActual, "HGT")))))
  setMeProp(_me, "m_veDistance", callNamed("vector"));
  setMeProp(_me, "m_bWalking", 0);
  setMeProp(_me, "m_rOldTarget", meProp(_me, "m_rTarget"));
  setMeProp(_me, "m_iOldStack", meProp(_me, "m_iTarget"));
  setMeProp(_me, "m_rTarget", undefined);
  setMeProp(_me, "m_iTarget", 0);
  setMeProp(_me, "m_veSource", callMethod("GetAbsPos", t_rObj));
  setMeProp(_me, "m_veTarget", meProp(_me, "m_veSource"));
  return 1;
}

