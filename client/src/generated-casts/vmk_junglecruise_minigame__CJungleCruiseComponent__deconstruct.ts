// vmk_junglecruise_minigame.cct / CJungleCruiseComponent / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("put", "CJungleCruiseComponent::Deconstruct - begin")
  if (meProp(_me, "m_prepared")) {
  callMethod("UnprepareRoom", _me)
  }

  callNamed("put", "Show room ui")
  callNamed("executeMessage", symbol("ui_show"))
  var t_Img = callNamed("image", 80, 160, 32);
  var t_rAlpha = callNamed("image", 80, 160, 8, symbol("grayscale"));
  callMethod("setAlpha", t_Img, t_rAlpha)
  setThePropOf(t_Img, "useAlpha", 1);
  setThePropOf(callNamed("getMember", "tempAvatarImage"), "image", t_Img);
  callNamed("put", "Re-enable messenger")
  callNamed("executeMessage", symbol("MinigameState"), symbol("idle"))
  callNamed("put", "Unregister listeners")
  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("room_leave"), callMethod("getID", _me))
  if (callNamed("objectp", meProp(_me, "m_objAnimator"))) {
  callMethod("deconstruct", meProp(_me, "m_objAnimator"))
  }

  callNamed("put", "CJungleCruiseComponent::Deconstruct - end")
  return 1;
}

