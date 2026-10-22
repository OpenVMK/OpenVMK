// vmk_hm_minigame.cct / CCollisionEngineBoundingTile / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_bVisualizeBoundary", 1);
  setMeProp(_me, "m_rSprite", undefined);
  setMeProp(_me, "m_iTileSize", 16);
  setMeProp(_me, "m_vLocation", callNamed("vector", 0, 0, 0));
  setMeProp(_me, "m_vVelocity", callNamed("vector", 0, 0, 0));
  setMeProp(_me, "m_vDirection", callNamed("vector", 0, 0, 0));
  setMeProp(_me, "m_ar_directions", new LingoList([]));
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", -float(1), -float(1), 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", 0, -float(1), 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", 1, -float(1), 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", 1, 0, 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", 1, 1, 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", 0, 1, 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", -float(1), 1, 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", -float(1), 0, 0))
  setMeProp(_me, "m_rClient", undefined);
  setMeProp(_me, "m_iDirection", -float(1));
  callNamed("executeMessage", symbol("AddTileCollisionObject"), _me)
  return 1;
}

