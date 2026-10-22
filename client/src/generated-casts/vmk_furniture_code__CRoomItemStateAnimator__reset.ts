// vmk_furniture_code.cct / CRoomItemStateAnimator / reset

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function reset(_me: LingoMe) {
  var t_ar_rBlocks = callMethod("GetBlocks", callMethod("GetFactor", callMethod("getObject", _me)));
  for (var t_rBlk of t_ar_rBlocks.toArray()) {
  callMethod("SetSprites", callMethod("GetVisual", t_rBlk))
  }

  for (var t_rBlk of meProp(_me, "m_ar_frames").toArray()) {
  for (var t_rSpr of t_rBlk[symbol("sprites")].toArray()) {
  t_rSpr[symbol("mode")] = symbol("playing");
  t_rSpr[symbol("index")] = 1;
  }

  }

  setMeProp(_me, "m_sCondition", "");
  setMeProp(_me, "m_sSound", "");
  setMeProp(_me, "m_iLoop", 0);
  if (callNamed("objectp", meProp(_me, "m_LoopSnd_obj"))) {
  callMethod("StopSound", meProp(_me, "m_LoopSnd_obj"))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_LoopSnd_obj")))
  setMeProp(_me, "m_LoopSnd_obj", undefined);
  }

}

