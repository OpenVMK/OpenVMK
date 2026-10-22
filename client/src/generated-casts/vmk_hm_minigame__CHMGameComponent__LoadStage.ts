// vmk_hm_minigame.cct / CHMGameComponent / LoadStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadStage(_me: LingoMe, i_sName: LingoValue, i_iVersion: LingoValue) {
  callMethod("set", callNamed("getObject", symbol("session")), "tileSelectMode", symbol("old"))
  var t_sTimer = theProperty("milliSeconds");
  callMethod("removeTileMover", _me)
  setMeProp(_me, "m_iRound", lingoBinary("add", meProp(_me, "m_iRound"), 1));
  if (callNamed("voidp", meProp(_me, "m_rStage"))) {
  setMeProp(_me, "m_rStage", callNamed("createObject", symbol("random"), "CHMStage"));
  }

  t_sTimer = theProperty("milliSeconds");
  callMethod("load", meProp(_me, "m_rStage"), i_sName, i_iVersion)
  t_sTimer = theProperty("milliSeconds");
  callMethod("SwitchToRoom", meProp(_me, "m_rStage"))
  t_sTimer = theProperty("milliSeconds");
  callMethod("DumpFurni", meProp(_me, "m_rStage"), callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room"))))
  if (lingoBinary("eq", meProp(_me, "m_iRound"), 1)) {
  callMethod("ShowWindow", callMethod("getInterface", _me), "UI")
  }

  callMethod("ShowWindow", callMethod("getInterface", _me), "Waiting")
  var t_rPointer = callMethod("Search", callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room"))), "CLASS", "pointer");
  var t_rSprite = callMethod("GetVisual", t_rPointer).m_rSprite;
  if (lingoBinary("neq", t_rSprite, callNamed("sprite", 0))) {
  setThePropOf(t_rSprite, "blend", 0);
  }

  setThePropOf(t_rPointer, "m_bRunning", 0);
}

