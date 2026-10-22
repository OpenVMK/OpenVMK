// vmk_fireworks.cct / CFireworksGameComponent / shootOne

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function shootOne(_me: LingoMe, i_sStyle: LingoValue, i_vPos: LingoValue, i_iId: LingoValue) {
  var tDirectionVector = callNamed("vector", 1000, lingoBinary("sub", callNamed("random", lingoBinary("mul", callMethod("GetLaunchSidewaysRandom", meProp(_me, "m_stage")), 2)), callMethod("GetLaunchSidewaysRandom", meProp(_me, "m_stage"))), lingoBinary("sub", -float(callMethod("GetLaunchZTilt", meProp(_me, "m_stage"))), callNamed("random", callMethod("GetLaunchZRandom", meProp(_me, "m_stage")))));
  callMethod("normalize", tDirectionVector)
  var tBomb = callMethod("ShootAFirework", meProp(_me, "m_rFireworksEngine"), i_sStyle, i_vPos, tDirectionVector);
  var tmember = undefined;
  for (var tIcon of callMethod("GetSelectorContent", meProp(_me, "m_stage")).toArray()) {
  if (lingoBinary("eq", tIcon.name, i_sStyle)) {
  tmember = callNamed("member", lingoBinary("join", lingoBinary("join", "fw.type", tIcon._type), ".aim"));
  }

  }

  callMethod("append", meProp(_me, "m_ar_fwList"), new LingoPropList([symbol("ref"), tBomb, symbol("icon"), tmember, symbol("style"), i_sStyle, symbol("id"), i_iId]))
  setMeProp(_me, "m_iShotCount", lingoBinary("add", meProp(_me, "m_iShotCount"), 1));
  callMethod("remainingFireWorkCount", callMethod("getInterface", _me), lingoBinary("sub", callMethod("GetLevel", meProp(_me, "m_stage")).count, meProp(_me, "m_iShotCount")))
}

