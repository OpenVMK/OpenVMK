// vmk_monorail_train_handler.cct / CMonorailTrainInterface / TrainLeave

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TrainLeave(_me: LingoMe) {
  callMethod("hideExits", _me)
  var t_bOn = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  if (lingoBinary("and", t_bOn, meProp(_me, "m_bAllowMusic"))) {
  callNamed("executeMessage", "PlayInterfaceSound", "MR-doors-close")
  }

  if (callNamed("threadExists", symbol("animation"))) {
  callMethod("stopAnimations", _me)
  var tAnimEngine = callMethod("getComponent", callNamed("getThread", symbol("animation")));
  callMethod("PlayAnim", tAnimEngine, meProp(_me, "m_animIDs")[2])
  if (meProp(_me, "m_bAllowMusic")) {
  callMethod("PlayAnim", tAnimEngine, meProp(_me, "m_animIDs")[3])
  }

  callMethod("PlayAnim", tAnimEngine, meProp(_me, "m_animIDs")[4])
  }

  callMethod("setState", meProp(_me, "m_pStarField"), symbol("accelerate"))
}

