// vmk_fireworks.cct / CFireworksGameComponent / UnprepareRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UnprepareRoom(_me: LingoMe) {
  callNamed("removeUpdate", callMethod("getID", _me))
  callMethod("HideStageEnd", callMethod("getInterface", _me))
  if (lingoBinary("neq", callNamed("getThread", "minigame"), 0)) {
  callMethod("StopMinigameEngine", callMethod("getComponent", callNamed("getThread", "minigame")))
  }

  callMethod("UnprepareRoom", callMethod("getInterface", _me))
  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _me))
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_particleSystem"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_particleSystem")))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rFireworksEngine"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rFireworksEngine")))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_softBuffer"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_softBuffer")))
  }

  for (var tSpark of meProp(_me, "m_mp_sparkList").toArray()) {
  if ((lingoTruthy(callNamed("voidp", tSpark)) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", tSpark))
  }

  }

  callNamed("removeWriter", meProp(_me, "m_sWriterName"))
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_stage"))) ? 0 : 1)) {
  if (lingoBinary("neq", meProp(_me, "m_stage"), 0)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_stage")))
  }

  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_maskSprite"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_maskSprite").spriteNum)
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_flashSprite"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_flashSprite").spriteNum)
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_selectorSprite"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_selectorSprite").spriteNum)
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_viewImgSprite"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_viewImgSprite").spriteNum)
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rWriterSprite"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_rWriterSprite").spriteNum)
  }

  callNamed("removeObject", "spark4")
  if (lingoBinary("neq", meProp(_me, "m_rSoundPlayer"), 0)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rSoundPlayer")))
  }

  callNamed("executeMessage", symbol("play_Music"))
  setMeProp(_me, "m_prepared", 0);
  setMeProp(_me, "m_initialized", 0);
  setMeProp(_me, "m_ar_fwList", new LingoList([]));
  setMeProp(_me, "m_ar_level", new LingoList([]));
  setMeProp(_me, "m_iCurrentLevel", 0);
  var m_fLevelTimer = float(0);
  setMeProp(_me, "m_iGameState", symbol("start"));
  setMeProp(_me, "m_ar_hitList", new LingoList([]));
  setMeProp(_me, "m_iScore", 0);
  setMeProp(_me, "m_iRank", 0);
  setMeProp(_me, "m_ar_scoreList", new LingoList([]));
  setMeProp(_me, "m_initialized", 0);
  setMeProp(_me, "m_mp_sparkList", new LingoPropList([]));
  setMeProp(_me, "m_sWriterName", "");
  setMeProp(_me, "m_bScoreSent", 0);
  setMeProp(_me, "m_viewImgSprite", undefined);
  setMeProp(_me, "m_particleSystem", undefined);
  setMeProp(_me, "m_rFireworksEngine", undefined);
  setMeProp(_me, "m_softBuffer", undefined);
  setMeProp(_me, "m_maskSprite", undefined);
  setMeProp(_me, "m_flashSprite", undefined);
  setMeProp(_me, "m_selectorSprite", undefined);
  setMeProp(_me, "m_rWriterSprite", undefined);
  setMeProp(_me, "m_stage", undefined);
  setMeProp(_me, "m_prepared", 0);
  var m_iCrowdSatisfaction = 1;
  setMeProp(_me, "m_rSoundPlayer", 0);
  callNamed("puppetTempo", callNamed("getIntVariable", "system.tempo", 30))
  callNamed("executeMessage", symbol("MinigameState"), symbol("idle"))
}

