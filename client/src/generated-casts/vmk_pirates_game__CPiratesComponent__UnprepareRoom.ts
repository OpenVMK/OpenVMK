// vmk_pirates_game.cct / CPiratesComponent / UnprepareRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UnprepareRoom(_me: LingoMe) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  callNamed("removeUpdate", callMethod("getID", _me))
  callMethod("UnprepareRoom", callMethod("getInterface", _me))
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rCloudField"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rCloudField")))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rSoundPlayer"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rSoundPlayer")))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_stage"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_stage")))
  }

  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rFloatFactory")))
  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("room_leave"), callMethod("getID", _me))
  setMeProp(_me, "m_stage", undefined);
  setMeProp(_me, "m_prepared", 0);
  var t_rAnimationManager = callNamed("getObject", "AnimationManager");
  if (callNamed("objectp", t_rAnimationManager)) {
  callMethod("ClearAll", t_rAnimationManager)
  }

  callNamed("executeMessage", symbol("MinigameState"), symbol("idle"))
  callNamed("put", lingoBinary("joinPad", callNamed("getSpriteManager").pTotalSprList.count, callNamed("getSpriteManager").pFreeSprList.count))
}

