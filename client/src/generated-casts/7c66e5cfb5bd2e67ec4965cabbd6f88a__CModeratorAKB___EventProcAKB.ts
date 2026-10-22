// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorAKB / _EventProcAKB

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProcAKB(_me: LingoMe, _this: LingoValue, tEvent: LingoValue, tElemID: LingoValue, tParam: LingoValue) {
  switch (tElemID) {
case "mods.kick":
  callMethod("_Kick", _this)
  break;
case "mods.alert":
  callMethod("_Alert", _this)
  break;
case "mods.ban":
  callMethod("_Ban", _this)
  break;
case "mods.alertqueue":
  callMethod("_AlertQueue", _this)
  break;
case "close":
  callMethod("_Remove", _this)
  break;
case "mods.bantime1.button":
  callMethod("_HandleRadioButtons", _this, 1)
  break;
case "mods.bantime2.button":
  callMethod("_HandleRadioButtons", _this, 2)
  break;
case "mods.bantime3.button":
  callMethod("_HandleRadioButtons", _this, 3)
  break;
case "mods.bantime4.button":
  callMethod("_HandleRadioButtons", _this, 4)
  break;
case "mods.bantime5.button":
  callMethod("_HandleRadioButtons", _this, 5)
  break;
case "mods.logmessage.list":
  var t_mpEvent = new LingoPropList([symbol("found"), 0, symbol("event"), "", symbol("client"), undefined, symbol("route"), new LingoPropList([])]);
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("EventProc", meProp(_me, "m_rComponentsPage"), tParam, t_mpEvent)
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWnd"), tElemID);
  var t_rImg = callMethod("render", meProp(_me, "m_rComponentsPage"));
  callMethod("feedImage", t_rClientElement, t_rImg)
  break;
  }

}

