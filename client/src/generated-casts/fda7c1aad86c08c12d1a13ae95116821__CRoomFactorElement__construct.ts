// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorElement / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rTile", undefined);
  setMeProp(_me, "m_iStack", 0);
  setMeProp(_me, "m_ar_sKey", new LingoList([]));
  setMeProp(_me, "m_bteleport", 0);
  setMeProp(_me, "m_sDelegate", undefined);
  return 1;
}

