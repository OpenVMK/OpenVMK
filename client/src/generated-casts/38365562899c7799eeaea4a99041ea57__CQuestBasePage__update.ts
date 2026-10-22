// 38365562899c7799eeaea4a99041ea57.cct / CQuestBasePage / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, a_mp_kType_mp_iRef_rItem: LingoValue, a_kAlteredCategory: LingoValue) {
  setMeProp(_me, "m_mp_kType_mp_iRef_rItem", a_mp_kType_mp_iRef_rItem);
  if ((lingoTruthy(meProp(_me, "m_bReady")) ? 0 : 1)) {
  var t_sID = callNamed("getUniqueID");
  switch (meProp(_me, "m_sType")) {
case "dialog":
case "maker":
  var t_bSuccess = callNamed("createWindow", t_sID, undefined, 0, 0, symbol("modal"));
  break;
case "floating":
  t_bSuccess = callNamed("createWindow", t_sID, undefined);
  break;
case "steps":
  t_bSuccess = callNamed("createWindow", t_sID, undefined);
  break;
  default:
  t_bSuccess = callNamed("createWindow", t_sID, undefined);
  break;
  }

  if (t_bSuccess) {
  setMeProp(_me, "m_rWindow", callNamed("getWindow", t_sID));
  callMethod("registerClient", meProp(_me, "m_rWindow"), callMethod("getID", _me))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _me), symbol("mouseDown"))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _me), symbol("keyDown"))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _me), symbol("keyUp"))
  switch (meProp(_me, "m_sType")) {
case "dialog":
  t_bSuccess = callMethod("merge", meProp(_me, "m_rWindow"), "vmk_quest_dialog.window");
  break;
case "maker":
  t_bSuccess = callMethod("merge", meProp(_me, "m_rWindow"), "vmk_quest_maker.window");
  break;
case "floating":
  t_bSuccess = callMethod("merge", meProp(_me, "m_rWindow"), "vmk_quest_dialog.window");
  break;
case "steps":
  t_bSuccess = callMethod("merge", meProp(_me, "m_rWindow"), "vmk_quest_steps.window");
  break;
  default:
  t_bSuccess = callMethod("merge", meProp(_me, "m_rWindow"), "vmk_quest_main.window");
  }

  if (t_bSuccess) {
  callMethod("center", meProp(_me, "m_rWindow"))
  setMeProp(_me, "m_bReady", 1);
  callMethod("_ChangePage", _me, a_kAlteredCategory)
  callMethod("close", _me)
  } else {
  return callNamed("error", _me, "Failed to open Quest Engine Subtask!", symbol("update"));
  }

  }

  }

  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  callMethod("update", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_mp_kType_mp_iRef_rItem"), a_kAlteredCategory)
  }

}

