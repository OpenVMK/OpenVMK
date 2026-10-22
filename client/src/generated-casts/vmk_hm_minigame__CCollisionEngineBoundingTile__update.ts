// vmk_hm_minigame.cct / CCollisionEngineBoundingTile / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_rClient"))) {
  callMethod("move", meProp(_me, "m_rClient"), meProp(_me, "m_iDirection"))
  }

  if (meProp(_me, "m_bVisualizeBoundary")) {
  var t_rContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
  var t_veOff = callMethod("GetScrPos", t_rContext);
  var t_vScrPos = lingoBinary("add", t_veOff, callNamed("AbsToScr", callMethod("getLocation", _me)));
  setThePropOf(meProp(_me, "m_rSprite"), "loc", callNamed("point", t_vScrPos.x, t_vScrPos.y));
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", t_vScrPos.z);
  }

}

