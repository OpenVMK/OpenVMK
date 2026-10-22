// vmk_tutorial.cct / CJungleCruiseComponent / EndGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EndGame(_me: LingoMe) {
  setMeProp(_me, "m_gameend", 1);
  callMethod("LoadStage", _me, "dock.endstage")
  callMethod("DisableCollision", callMethod("GetFactor", meProp(_me, "m_boat")))
  callMethod("RemoveCamera", callMethod("getInterface", _me))
  callMethod("SaySomething", meProp(_me, "m_hostCharacter"), "", lingoBinary("join", lingoBinary("join", "Well Done! You finished with ", meProp(_me, "m_score")), "points. See you again soon!"))
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_filmstrip"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_filmstrip")))
  }

  setMeProp(_me, "m_filmstrip", undefined);
  setThePropOf(callMethod("getInterface", _me).m_exitButton.sprite, "visible", 0);
}

