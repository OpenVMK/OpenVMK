// vmk_npc_shrunken_neds_shop.cct / CSNSComponent / WiggleAbout

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function WiggleAbout(_me: LingoMe, i_age: LingoValue) {
  if (callNamed("threadExists", symbol("animation"))) {
  if ((lingoTruthy(callNamed("voidp", i_age)) ? 0 : 1)) {
  var tFrameIndex = lingoBinary("div", lingoBinary("mul", i_age, 24), float(1000));
  } else {
  tFrameIndex = 0;
  }

  var tAnimEngine = callMethod("getComponent", callNamed("getThread", symbol("animation")));
  callMethod("StopAnim", tAnimEngine, meProp(_me, "m_animIDs")[1])
  callMethod("StopAnim", tAnimEngine, meProp(_me, "m_animIDs")[2])
  callMethod("StopAnim", tAnimEngine, meProp(_me, "m_animIDs")[4])
  callMethod("PlayAnim", tAnimEngine, meProp(_me, "m_animIDs")[3], tFrameIndex)
  callNamed("executeMessage", symbol("play_SingleSound"), "SNS-rope-loop-long")
  }

}

