// vmk_tutorial.cct / CJungleCruiseInterface / UnprepareRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UnprepareRoom(_me: LingoMe) {
  callNamed("put", "CJungleCruiseInterface::UnprepareRoom - begin")
  if (meProp(_me, "m_prepared")) {
  callNamed("removeTimeout", "jc_camera_hittest")
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_scoreSprite"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_scoreSprite").spriteNum)
  }

  if (lingoBinary("neq", meProp(_me, "m_exitButton").count, 0)) {
  callNamed("releaseSprite", meProp(_me, "m_exitButton").sprite.spriteNum)
  }

  callNamed("removeMember", "ScoreFloat")
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_camera"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_camera")))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_feedback"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_feedback")))
  }

  callNamed("removeUpdate", callMethod("getID", _me))
  }

  if (lingoBinary("neq", callNamed("getWindow", meProp(_me, "m_sWindowTitle")), 0)) {
  callNamed("removeWindow", meProp(_me, "m_sWindowTitle"))
  }

  setMeProp(_me, "m_prepared", 0);
  callNamed("put", "CJungleCruiseInterface::UnprepareRoom - end")
}

