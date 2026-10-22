// vmk_npc_gatorwaiter.cct / CGatorWaiterInterface / ControlGator

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ControlGator(_me: LingoMe, a_iNpcDir: LingoValue, a_iNpcAction: LingoValue) {
  if ((lingoTruthy(meProp(_me, "m_bInitialized")) ? 0 : 1)) {
  callMethod("InitAnimation", _me, a_iNpcDir, a_iNpcAction)
  }

  var t_sAnimName = "vmk_gator_waiter_anim";
  setMeProp(_me, "m_bWalking", 0);
  switch (a_iNpcAction) {
case 0:
  var t_sMarkerName = lingoBinary("joinPad", "Default", a_iNpcDir);
  if (lingoBinary("neq", meProp(_me, "m_sMarkerName"), t_sMarkerName)) {
  callNamed("executeMessage", symbol("changeAnimationState"), t_sAnimName, symbol("goto"), t_sMarkerName)
  setMeProp(_me, "m_sMarkerName", t_sMarkerName);
  }

  break;
case 1:
  t_sMarkerName = lingoBinary("joinPad", "Walk", a_iNpcDir);
  if (lingoBinary("neq", meProp(_me, "m_sMarkerName"), t_sMarkerName)) {
  setMeProp(_me, "m_bWalking", 1);
  callNamed("executeMessage", symbol("changeAnimationState"), t_sAnimName, symbol("goto"), t_sMarkerName)
  setMeProp(_me, "m_sMarkerName", t_sMarkerName);
  }

  break;
case 2:
  t_sMarkerName = lingoBinary("joinPad", "Talk", a_iNpcDir);
  if (lingoBinary("neq", meProp(_me, "m_sMarkerName"), t_sMarkerName)) {
  callNamed("executeMessage", symbol("changeAnimationState"), t_sAnimName, symbol("goto"), t_sMarkerName)
  setMeProp(_me, "m_sMarkerName", t_sMarkerName);
  }

  break;
case 3:
  t_sMarkerName = lingoBinary("joinPad", "Serve", a_iNpcDir);
  if (lingoBinary("neq", meProp(_me, "m_sMarkerName"), t_sMarkerName)) {
  callNamed("executeMessage", symbol("changeAnimationState"), t_sAnimName, symbol("goto"), t_sMarkerName)
  setMeProp(_me, "m_sMarkerName", t_sMarkerName);
  }

  break;
case 4:
  t_sMarkerName = lingoBinary("joinPad", "Idle", a_iNpcDir);
  if (lingoBinary("neq", meProp(_me, "m_sMarkerName"), t_sMarkerName)) {
  callNamed("executeMessage", symbol("changeAnimationState"), t_sAnimName, symbol("goto"), t_sMarkerName)
  setMeProp(_me, "m_sMarkerName", t_sMarkerName);
  }

  break;
  }

}

