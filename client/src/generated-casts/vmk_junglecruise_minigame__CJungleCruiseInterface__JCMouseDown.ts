// vmk_junglecruise_minigame.cct / CJungleCruiseInterface / JCMouseDown

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function JCMouseDown(_me: LingoMe) {
  if ((lingoTruthy(callMethod("GetGameEnd", callMethod("getComponent", _me))) ? 0 : 1)) {
  if (lingoBinary("neq", meProp(_me, "m_exitButton").count, 0)) {
  if (callMethod("inside", theProperty("mouseLoc"), meProp(_me, "m_exitButton").sprite.rect)) {
  setThePropOf(meProp(_me, "m_exitButton").sprite, "member", meProp(_me, "m_exitButton").pressed);
  if ((lingoTruthy(callNamed("DialogWindowExists", "junglecruise_exit")) ? 0 : 1)) {
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "junglecruise_exit", 2, 0);
  callMethod("show", t)
  callMethod("setText", t, "Do you want to exit?", "Jungle Cruise", "No", "Yes")
  }

  callMethod("disableCamera", _me)
  } else {
  if (lingoBinary("and", callMethod("gameOn", callMethod("getComponent", _me)), callNamed("objectp", meProp(_me, "m_camera")))) {
  if (callMethod("GetActive", meProp(_me, "m_camera"))) {
  if (lingoBinary("and", callMethod("GetAvatarInBoat", callMethod("getComponent", _me)), (lingoTruthy(callMethod("GetGameEnd", callMethod("getComponent", _me))) ? 0 : 1))) {
  callMethod("TakePhoto", callMethod("getComponent", _me), meProp(_me, "m_camera"))
  }

  }

  }

  }

  }

  }

}

