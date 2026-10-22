// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorPointer / GetTheTileStack

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetTheTileStack(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("neq", meProp(_me, "m_sLastTile"), "")) {
  return callMethod("GetObjByKey", callMethod("GetContext", callMethod("getObject", _this)), meProp(_me, "m_sLastTile"));
  } else {
  return undefined;
  }

}

