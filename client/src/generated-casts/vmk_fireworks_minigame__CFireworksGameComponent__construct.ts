// vmk_fireworks_minigame.cct / CFireworksGameComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("put", "CFireworksGameComponent::construct - begin")
  setMeProp(_me, "m_ar_fwList", new LingoList([]));
  setMeProp(_me, "m_ar_level", new LingoList([]));
  setMeProp(_me, "m_ar_currentCombination", new LingoList([]));
  setMeProp(_me, "m_iCurrentLevel", 0);
  var m_fLevelTimer = float(0);
  setMeProp(_me, "m_iGameState", symbol("start"));
  setMeProp(_me, "m_ar_hitList", new LingoList([]));
  setMeProp(_me, "m_iScore", 0);
  setMeProp(_me, "m_iRank", 0);
  setMeProp(_me, "m_ar_scoreList", new LingoList([]));
  setMeProp(_me, "m_tutorialmode", 0);
  setMeProp(_me, "m_initialized", 0);
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
  setMeProp(_me, "m_fIconSize", float(1));
  setMeProp(_me, "m_fWarningFlashTime", 0.5);
  setMeProp(_me, "m_iBonus", float(1));
  setMeProp(_me, "m_iShotCount", 0);
  callNamed("executeMessage", symbol("SetMinigameHandler"), "CFireworksMinigameHandler")
  return 1;
}

