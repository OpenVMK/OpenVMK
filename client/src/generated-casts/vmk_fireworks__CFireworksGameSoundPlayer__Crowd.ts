// vmk_fireworks.cct / CFireworksGameSoundPlayer / Crowd

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Crowd(_me: LingoMe, a_posneg: LingoValue) {
  var t_bOn = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  if (t_bOn) {
  var tSound = "";
  switch (a_posneg) {
case symbol("positive"):
  setMeProp(_me, "m_iCrowdSatisfaction", lingoBinary("add", meProp(_me, "m_iCrowdSatisfaction"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iCrowdSatisfaction"), 8)) {
  tSound = meProp(_me, "m_mp_rCrowdReactions")[symbol("positive")][3];
  } else {
  if (lingoBinary("gt", meProp(_me, "m_iCrowdSatisfaction"), 4)) {
  tSound = meProp(_me, "m_mp_rCrowdReactions")[symbol("positive")][2];
  } else {
  if (lingoBinary("gt", meProp(_me, "m_iCrowdSatisfaction"), 0)) {
  tSound = meProp(_me, "m_mp_rCrowdReactions")[symbol("positive")][1];
  }

  }

  }

  break;
case symbol("negative"):
  setMeProp(_me, "m_iCrowdSatisfaction", lingoBinary("sub", meProp(_me, "m_iCrowdSatisfaction"), 1));
  if (lingoBinary("lte", meProp(_me, "m_iCrowdSatisfaction"), 0)) {
  tSound = meProp(_me, "m_mp_rCrowdReactions")[symbol("negative")][1];
  }

  break;
  }

  callMethod("PlayIfNotBusy", _me, meProp(_me, "m_rCrowdChannel"), tSound, undefined)
  if (lingoBinary("gt", meProp(_me, "m_iCrowdSatisfaction"), 10)) {
  setMeProp(_me, "m_iCrowdSatisfaction", 10);
  }

  if (lingoBinary("lt", meProp(_me, "m_iCrowdSatisfaction"), -float(5))) {
  setMeProp(_me, "m_iCrowdSatisfaction", -float(5));
  }

  }

}

