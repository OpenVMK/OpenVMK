// vmk_npc_gatorwaiter.cct / CGatorWaiterInterface / InitAnimation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InitAnimation(_me: LingoMe, a_iNpcDir: LingoValue, a_iNpcAction: LingoValue) {
  var t_sAnimName = "vmk_gator_waiter_anim";
  var t_sMemName = "npc_gatorwaiter_anim.ani";
  var t_rObjRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var t_rObjAnimationManager = callNamed("getObject", "AnimationManager");
  if (callNamed("objectp", t_rObjRoomContext)) {
  var t_rNode = callMethod("Search", t_rObjRoomContext, "TYPE", "4009");
  if (callNamed("objectp", t_rNode)) {
  var t_PntWorldPos = callMethod("GetAbsPos", callMethod("getObject", t_rNode));
  callMethod("NewAnimation", t_rObjAnimationManager, t_PntWorldPos, t_sAnimName, t_sMemName)
  callNamed("executeMessage", symbol("changeAnimationState"), t_sAnimName, symbol("followObject"), t_rNode)
  var t_Obj = callNamed("getObject", "AnimationManager");
  if (callNamed("objectp", t_Obj)) {
  var t_arList = callMethod("GetChannels", callMethod("GetVisual", callMethod("getAnimation", t_Obj, t_sAnimName)));
  if (callNamed("listp", t_arList)) {
  var tSprite = callMethod("getSprite", t_arList[1]);
  }

  }

  if (lingoBinary("neq", tSprite, 0)) {
  if (lingoBinary("neq", tSprite.spriteNum, 0)) {
  setMeProp(_me, "m_npcSprite", callNamed("sprite", tSprite));
  callNamed("setEventBroker", meProp(_me, "m_npcSprite").spriteNum, "NPCGatorWaiter")
  callMethod("registerProcedure", meProp(_me, "m_npcSprite"), symbol("eventProcNPC"), callMethod("getID", _me), symbol("mouseUp"))
  setThePropOf(meProp(_me, "m_npcSprite"), "cursor", new LingoList([callNamed("getMember", "cursor.finger"), callNamed("getMember", "cursor.finger.mask")]));
  var m_npcMoveStartPos = callNamed("vector", meProp(_me, "m_npcSprite").loc.locH, meProp(_me, "m_npcSprite").loc.locV, meProp(_me, "m_npcSprite").locZ);
  }

  }

  setMeProp(_me, "m_bInitialized", 1);
  callMethod("ControlGator", _me, a_iNpcDir, a_iNpcAction)
  }

  }

}

