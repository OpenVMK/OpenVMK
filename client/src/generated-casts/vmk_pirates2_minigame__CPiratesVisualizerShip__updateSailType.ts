// vmk_pirates2_minigame.cct / CPiratesVisualizerShip / updateSailType

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateSailType(_me: LingoMe, tTeam: LingoValue) {
  /* global */ var g_profShipVisualizerAcc = globalVar("g_profShipVisualizerAcc");
  switch (tTeam) {
case 1:
  var t_sColor = "#FFEFBE";
  break;
case 2:
  t_sColor = "#564b70";
  break;
  default:
  t_sColor = "#FFEFBE";
  }

  setThePropOf(meProp(_me, "m_rSprites")[2], "bgColor", callNamed("rgb", t_sColor));
}

