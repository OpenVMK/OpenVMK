// vmk_monorail_train_handler.cct / CMonorailTrainInterface / TrainBetweenStations

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TrainBetweenStations(_me: LingoMe) {
  callMethod("hideExits", _me)
  if (callNamed("threadExists", symbol("animation"))) {
  callMethod("stopAnimations", _me)
  var tAnimEngine = callMethod("getComponent", callNamed("getThread", symbol("animation")));
  if (meProp(_me, "m_bAllowMusic")) {
  callMethod("PlayAnim", tAnimEngine, meProp(_me, "m_animIDs")[3])
  }

  callMethod("PlayAnim", tAnimEngine, meProp(_me, "m_animIDs")[4])
  }

  callMethod("CloseDoors", _me)
  callMethod("setState", meProp(_me, "m_pStarField"), symbol("accelerate"))
}

