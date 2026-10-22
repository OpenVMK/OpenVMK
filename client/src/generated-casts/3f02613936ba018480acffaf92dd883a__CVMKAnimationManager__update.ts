// 3f02613936ba018480acffaf92dd883a.cct / CVMKAnimationManager / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (lingoBinary("and", meProp(_me, "m_bCheckState"), meProp(_me, "m_bRoomReady"))) {
  var t_iChecks = 0;
  for (var t_rAnimation of meProp(_me, "m_ar_rAnimations").toArray()) {
  if (lingoBinary("and", callNamed("objectp", callMethod("GetVisual", t_rAnimation)), callNamed("objectp", callMethod("GetFactor", t_rAnimation)))) {
  t_iChecks = lingoBinary("add", t_iChecks, 1);
  }

  }

  if (lingoBinary("eq", t_iChecks, meProp(_me, "m_ar_rAnimations").count)) {
  callNamed("executeMessage", symbol("room_animations_ready"))
  setMeProp(_me, "m_bCheckState", 0);
  }

  }

}

