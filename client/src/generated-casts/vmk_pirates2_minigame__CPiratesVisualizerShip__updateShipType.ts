// vmk_pirates2_minigame.cct / CPiratesVisualizerShip / updateShipType

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateShipType(_me: LingoMe) {
  /* global */ var g_profShipVisualizerAcc = globalVar("g_profShipVisualizerAcc");
  setMeProp(_me, "m_ar_shipMembers", new LingoList([]));
  setMeProp(_me, "m_ar_sailMembers", new LingoList([new LingoList([]), new LingoList([]), new LingoList([]), new LingoList([])]));
  for (var i = 0; i <= 35; ++i) {
  var n = lingoBinary("mul", i, 10);
  var tsNumber = "";
  if (lingoBinary("lt", n, 100)) {
  tsNumber = lingoBinary("join", tsNumber, "0");
  }

  if (lingoBinary("lt", n, 10)) {
  tsNumber = lingoBinary("join", tsNumber, "0");
  }

  tsNumber = lingoBinary("join", tsNumber, n);
  var t_sName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "ship", "_"), meProp(_me, "m_iType")), "_"), tsNumber);
  var t_rMember = callNamed("getMember", t_sName);
  callMethod("append", meProp(_me, "m_ar_shipMembers"), t_rMember)
  callMethod("append", meProp(_me, "m_ar_sailMembers")[1], callNamed("getMember", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "sail", "_"), meProp(_me, "m_iType")), "_"), tsNumber)))
  callMethod("append", meProp(_me, "m_ar_sailMembers")[2], callNamed("getMember", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "sail", "_"), meProp(_me, "m_iType")), "_"), tsNumber)))
  }

}

