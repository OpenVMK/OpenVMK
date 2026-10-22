// vmk_monorail_train_handler.cct / CMonorailTrainInterface / TrainStop

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TrainStop(_me: LingoMe) {
  var t_bOn = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  if (lingoBinary("and", t_bOn, meProp(_me, "m_bAllowMusic"))) {
  callNamed("executeMessage", "PlayInterfaceSound", "MR-doors-open")
  }

  callMethod("showExits", _me)
  if (meProp(_me, "m_bInited")) {
  if (callNamed("threadExists", symbol("animation"))) {
  callMethod("stopAnimations", _me)
  var tAnimEngine = callMethod("getComponent", callNamed("getThread", symbol("animation")));
  callMethod("PlayAnim", tAnimEngine, meProp(_me, "m_animIDs")[1])
  }

  } else {
  setMeProp(_me, "m_bInited", 1);
  }

  if (lingoBinary("and", meProp(_me, "m_bAllowMusic"), callNamed("objectp", meProp(_me, "m_pTrainMusic")))) {
  callMethod("SetFadeOut", meProp(_me, "m_pTrainMusic"), 3)
  }

  callMethod("setState", meProp(_me, "m_pStarField"), symbol("stopped"))
}

