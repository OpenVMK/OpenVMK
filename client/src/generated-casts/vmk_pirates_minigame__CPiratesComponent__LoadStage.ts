// vmk_pirates_minigame.cct / CPiratesComponent / LoadStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadStage(_me: LingoMe, i_sStageName: LingoValue) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  callMethod("setEditable", callMethod("getInterface", _me).m_piratesBar, 0)
  callMethod("HideTimerDisplay", callMethod("getInterface", _me))
  callMethod("HideNavigationTarget", callMethod("getInterface", _me))
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_stage"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_stage")))
  }

  setMeProp(_me, "m_stage", callNamed("createObject", lingoBinary("join", "stage_", i_sStageName), "CStage"));
  callMethod("LoadXML", meProp(_me, "m_stage"), lingoBinary("join", lingoBinary("join", "stage.", i_sStageName), ".xml"))
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rCloudField"))) ? 0 : 1)) {
  callNamed("removeObject", "PiratesCloudField")
  }

  setMeProp(_me, "m_rCloudField", undefined);
  callMethod("ClearAll", callMethod("GetObjectPool", callMethod("getComponent", callNamed("getThread", "minigame"))))
  callNamed("executeMessage", symbol("room_switch"), i_sStageName)
  callMethod("SetMyShip", callMethod("getInterface", _me), undefined)
  callMethod("PlaySea", meProp(_me, "m_rSoundPlayer"))
  callMethod("playMusic", meProp(_me, "m_rSoundPlayer"), callMethod("GetMusic", meProp(_me, "m_stage")))
  if ((lingoTruthy(callMethod("GetMoonlightUserTriggered", meProp(_me, "m_stage"))) ? 0 : 1)) {
  callMethod("disableInvincibility", callMethod("getInterface", _me).m_piratesBar)
  }

}

