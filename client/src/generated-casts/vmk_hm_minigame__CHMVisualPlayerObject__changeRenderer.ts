// vmk_hm_minigame.cct / CHMVisualPlayerObject / changeRenderer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changeRenderer(_me: LingoMe, i_status: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rOwner"))) ? 0 : 1)) {
  if (lingoBinary("eq", i_status, symbol("possessed"))) {
  if (callNamed("voidp", meProp(_me, "m_rHMRenderer"))) {
  setMeProp(_me, "m_rHMRenderer", callNamed("createObject", symbol("random"), "CHMAvatarClassPossessed"));
  callMethod("Init", meProp(_me, "m_rHMRenderer"), callMethod("GetParam", callMethod("getObject", _me), "Team"))
  }

  callMethod("ReleaseBeam", meProp(_me, "m_rAvatarRenderer"))
  if (callNamed("objectp", callMethod("GetVisual", meProp(_me, "m_rOwner")))) {
  callMethod("SetRenderer", callMethod("GetVisual", meProp(_me, "m_rOwner")), meProp(_me, "m_rHMRenderer"))
  }

  } else {
  callMethod("Release", meProp(_me, "m_rHMRenderer"))
  if (callNamed("objectp", callMethod("GetVisual", meProp(_me, "m_rOwner")))) {
  callMethod("SetRenderer", callMethod("GetVisual", meProp(_me, "m_rOwner")), meProp(_me, "m_rAvatarRenderer"))
  }

  }

  }

}

