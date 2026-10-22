// vmk_pirates2_minigame.cct / CPiratesComponent / LoadStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadStage(_me: LingoMe, i_sStageName: LingoValue, i_iVersion: LingoValue, i_ar_params: LingoValue) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  callMethod("showStoryLine", callMethod("getInterface", _me), i_sStageName)
  callMethod("setEditable", callMethod("getInterface", _me).m_piratesBar, 0)
  callNamed("put", lingoBinary("joinPad", "CPiratesComponent::LoadStage - begin", new LingoList([i_sStageName, i_iVersion, i_ar_params])))
  setMeProp(_me, "m_iGameMode", callNamed("integer", i_ar_params["m"]));
  callMethod("showMessageBar", callMethod("getInterface", _me))
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
  callNamed("executeMessage", "StopRoomSound")
  callMethod("PlaySea", meProp(_me, "m_rSoundPlayer"))
  callMethod("playMusic", meProp(_me, "m_rSoundPlayer"), callMethod("GetMusic", meProp(_me, "m_stage")))
  if ((lingoTruthy(callMethod("GetMoonlightUserTriggered", meProp(_me, "m_stage"))) ? 0 : 1)) {
  callMethod("disableInvincibility", callMethod("getInterface", _me).m_piratesBar)
  }

  var t_rAnimationManager = callNamed("getObject", "AnimationManager");
  if (callNamed("objectp", t_rAnimationManager)) {
  callMethod("ClearAll", t_rAnimationManager)
  }

  switch (i_sStageName) {
case "pirates_level1_stage1":
  callMethod("attachAnimation", _me, "p2_l1s1_flag", "POTC2_lvl1_stage1.ani")
  break;
case "pirates_level1_stage2":
  callMethod("attachAnimation", _me, "p2_l1s2_sgull", "POTC2_lvl1_stage2.ani")
  break;
case "pirates_level1_stage3":
  callMethod("attachAnimation", _me, "p2_l1s3_candle", "POTC2_lvl1_stage3_1.ani")
  callMethod("attachAnimation", _me, "p2_l1s3_gold", "POTC2_lvl1_stage3_2.ani")
  break;
case "pirates_level2_stage1":
  callMethod("attachAnimation", _me, "p2_l2s1_men", "POTC2_lvl2_stage1.ani")
  break;
case "pirates_level2_stage2":
  callMethod("attachAnimation", _me, "p2_l2s2_women", "POTC2_lvl2_stage2.ani")
  break;
case "pirates_level2_stage3":
  callMethod("attachAnimation", _me, "p2_l2s3_well", "POTC2_lvl2_stage3.ani")
  break;
case "pirates_level3_stage1":
  callMethod("attachAnimation", _me, "p2_l3s1_shoot", "POTC2_lvl3_stage1.ani")
  break;
case "pirates_level3_stage2":
  callMethod("attachAnimation", _me, "p2_l3s2_prison", "POTC2_lvl3_stage2.ani")
  break;
case "pirates_level3_stage3":
  callMethod("attachAnimation", _me, "p2_l3s3_looter", "POTC2_lvl3_stage3_1.ani")
  callMethod("attachAnimation", _me, "p2_l3s3_drunks", "POTC2_lvl3_stage3_2.ani")
  break;
  }

  callMethod("HideIdleKickWarning", callMethod("getInterface", _me))
}

