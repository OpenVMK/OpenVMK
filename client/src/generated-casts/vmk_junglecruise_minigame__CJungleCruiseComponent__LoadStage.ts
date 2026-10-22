// vmk_junglecruise_minigame.cct / CJungleCruiseComponent / LoadStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadStage(_me: LingoMe, i_sStageName: LingoValue) {
  callNamed("put", "CJungleCruiseComponent::LoadStage - begin")
  callMethod("ClearAll", meProp(_me, "m_animalMgr"))
  callMethod("ClearAll", meProp(_me, "m_powerupMgr"))
  callMethod("ClearAll", meProp(_me, "m_hazardMgr"))
  if (lingoBinary("neq", meProp(_me, "m_stage"), 0)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_stage")))
  }

  setMeProp(_me, "m_stage", callNamed("createObject", lingoBinary("join", "stage_", i_sStageName), "CStage"));
  callMethod("LoadXML", meProp(_me, "m_stage"), lingoBinary("join", i_sStageName, ".xml"))
  callNamed("executeMessage", symbol("room_switch"), callMethod("getRoomName", meProp(_me, "m_stage")))
  callMethod("initializeWindow", _me)
  callMethod("enableCamera", callMethod("getInterface", _me))
  if ((lingoTruthy(lingoBinary("eq", callMethod("GetName", meProp(_me, "m_stage")), "dock.stage1")) ? 0 : 1)) {
  callMethod("_SendStageLoaded", callMethod("getHandler", callNamed("getThread", "minigame")))
  }

  callNamed("put", "CJungleCruiseComponent::LoadStage - end")
}

