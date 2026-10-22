// vmk_jungle_cruise.cct / CJungleCruiseComponent / UnprepareRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UnprepareRoom(_me: LingoMe) {
  callNamed("put", "CJungleCruiseComponent::UnprepareRoom - begin")
  callMethod("UnprepareRoom", callMethod("getInterface", _me))
  callNamed("put", "stop sounds")
  callMethod("StopSound", meProp(_me, "m_rMotorSound"))
  callNamed("put", "release objects")
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rMotorSound"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rMotorSound")))
  }

  if (lingoBinary("neq", meProp(_me, "m_rSoundPlayer"), 0)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rSoundPlayer")))
  }

  if (lingoBinary("neq", meProp(_me, "m_stage"), 0)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_stage")))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_animalMgr"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_animalMgr")))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_powerupMgr"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_powerupMgr")))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_hazardMgr"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_hazardMgr")))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_hostCharacter"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_hostCharacter")))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_filmstrip"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_filmstrip")))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_tutorial"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_tutorial")))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_spriteHider"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_spriteHider")))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_avatarOnDock"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_avatarOnDock").spriteNum)
  }

  setMeProp(_me, "m_prepared", 0);
  callNamed("executeMessage", "PlayRoomSound")
  callNamed("put", "Return variable state")
  setMeProp(_me, "m_stage", 0);
  setMeProp(_me, "m_initialized", 0);
  setMeProp(_me, "m_prepared", 0);
  setMeProp(_me, "m_hostCharacter", undefined);
  setMeProp(_me, "m_filmstrip", undefined);
  setMeProp(_me, "m_tutorial", undefined);
  setMeProp(_me, "m_spriteHider", undefined);
  setMeProp(_me, "m_ar_avatarFigure", new LingoList([-float(1), -float(1), -float(1), -float(1), -float(1), -float(1), -float(1), -float(1), -float(1), -float(1), -float(1), -float(1)]));
  setMeProp(_me, "m_soundUpdateFreq", 10);
  setMeProp(_me, "m_sdacc", 0);
  callNamed("put", "CJungleCruiseComponent::UnprepareRoom - end")
}

