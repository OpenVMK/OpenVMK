// vmk_hm_minigame.cct / CHMWindowNotice / showNotification

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showNotification(_me: LingoMe, i_sName: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_rNotification"))) {
  callMethod("createNotification", _me)
  }

  var t_bChange = 0;
  switch (i_sName) {
case "door race":
  setThePropOf(meProp(_me, "m_rNotification"), "member", callNamed("member", "hm.door_race"));
  t_bChange = 1;
  break;
case "sudden death":
  setThePropOf(meProp(_me, "m_rNotification"), "member", callNamed("member", "hm.suddendeath"));
  t_bChange = 1;
  break;
case "correct exit":
  setThePropOf(meProp(_me, "m_rNotification"), "member", callNamed("member", "hm.correct_door"));
  t_bChange = 1;
  break;
case "fight":
  setThePropOf(meProp(_me, "m_rNotification"), "member", callNamed("member", "hm.catch"));
  t_bChange = 1;
  break;
case "hurry up":
  setThePropOf(meProp(_me, "m_rNotification"), "member", callNamed("member", "hm.hurry_up"));
  t_bChange = 1;
  break;
  }

  if (t_bChange) {
  var tW = meProp(_me, "m_rNotification").member.width;
  var tH = meProp(_me, "m_rNotification").member.height;
  setThePropOf(meProp(_me, "m_rNotification"), "width", tW);
  setThePropOf(meProp(_me, "m_rNotification"), "height", tH);
  setThePropOf(meProp(_me, "m_rNotification"), "visible", 1);
  setThePropOf(meProp(_me, "m_rNotification"), "blend", 100);
  setThePropOf(meProp(_me, "m_rNotification"), "locH", 400);
  setThePropOf(meProp(_me, "m_rNotification"), "locV", 300);
  }

}

