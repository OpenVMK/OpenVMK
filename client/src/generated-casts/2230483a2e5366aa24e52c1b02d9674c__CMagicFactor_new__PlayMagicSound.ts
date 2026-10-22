// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / PlayMagicSound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlayMagicSound(_me: LingoMe, a_iMagicFx: LingoValue) {
  /* global */ var pTemp = globalVar("pTemp");
  var t_bFxSnd = callNamed("GET", callNamed("getObject", symbol("session")), "fx");
  if (callNamed("voidp", a_iMagicFx)) {
  return;
  var t_bLoop = 0;
  }

  if (lingoBinary("and", lingoBinary("neq", _me.m_iCurrendSoundPlaying, a_iMagicFx), t_bFxSnd)) {
  setThePropOf(_me, "m_iCurrendSoundPlaying", a_iMagicFx);
  if (lingoBinary("eq", a_iMagicFx, 1)) {
  var t_sSoundName = "MFX-pirate-parrot-curse";
  } else {
  if (lingoBinary("eq", a_iMagicFx, 2)) {
  t_sSoundName = "MFX-discoinferno";
  } else {
  if (lingoBinary("eq", a_iMagicFx, 3)) {
  t_sSoundName = "MFX-firework";
  } else {
  if (lingoBinary("eq", a_iMagicFx, 4)) {
  t_sSoundName = "MFX-teleportation";
  } else {
  if (lingoBinary("eq", a_iMagicFx, 5)) {
  t_sSoundName = "MFX-ghost";
  } else {
  if (lingoBinary("eq", a_iMagicFx, 6)) {
  if (lingoBinary("eq", _me.m_sMyName, _me.m_sAvatarName)) {
  t_sSoundName = "teleport-2";
  }

  return 0;
  } else {
  if (lingoBinary("eq", a_iMagicFx, 7)) {
  if (lingoBinary("eq", _me.m_sMyName, _me.m_sAvatarName)) {
  t_sSoundName = "teleport-4";
  }

  return 0;
  } else {
  if (lingoBinary("eq", a_iMagicFx, 8)) {
  t_sSoundName = "MFX-moneyrain";
  } else {
  if (lingoBinary("eq", a_iMagicFx, 9)) {
  t_sSoundName = "MFX-curse-storm";
  } else {
  if (lingoBinary("eq", a_iMagicFx, 10)) {
  t_sSoundName = "MFX-levitate";
  } else {
  if (lingoBinary("neq", a_iMagicFx, 11)) {
  if (lingoBinary("eq", a_iMagicFx, 15)) {
  t_sSoundName = "MFX-bat-1";
  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  if (lingoBinary("eq", a_iMagicFx, 11.5)) {
  t_sSoundName = "MFX-bat-2";
  t_bLoop = 1;
  } else {
  if (lingoBinary("eq", a_iMagicFx, 12)) {
  t_sSoundName = "MFX-snowman";
  } else {
  if (lingoBinary("eq", a_iMagicFx, 14)) {
  t_sSoundName = "MFX-treasure";
  } else {
  if (lingoBinary("neq", a_iMagicFx, 100)) {
  if (lingoBinary("neq", a_iMagicFx, 101)) {
  if (lingoBinary("neq", a_iMagicFx, 102)) {
  if (lingoBinary("neq", a_iMagicFx, 103)) {
  if (lingoBinary("neq", a_iMagicFx, 104)) {
  if (lingoBinary("neq", a_iMagicFx, 105)) {
  if (lingoBinary("neq", a_iMagicFx, 106)) {
  if (lingoBinary("neq", a_iMagicFx, 107)) {
  if (lingoBinary("neq", a_iMagicFx, 108)) {
  if (lingoBinary("neq", a_iMagicFx, 109)) {
  if (lingoBinary("neq", a_iMagicFx, 110)) {
  if (lingoBinary("neq", a_iMagicFx, 112)) {
  if (lingoBinary("neq", a_iMagicFx, 113)) {
  if (lingoBinary("eq", a_iMagicFx, 114)) {
  t_sSoundName = "MFX-car-loop-1";
  t_bLoop = 1;
  }

  }

  }

  if (lingoBinary("neq", a_iMagicFx, 111)) {
  if (lingoBinary("eq", a_iMagicFx, 115)) {
  t_sSoundName = "MFX-stitch_space_ship";
  }

  }

  }

  if (lingoBinary("eq", a_iMagicFx, 17)) {
  if (lingoBinary("eq", _me.m_sMyName, _me.m_sAvatarName)) {
  t_sSoundName = "SPS-scuba-breath";
  t_bLoop = 1;
  }

  }

  }

  }

  if (lingoBinary("eq", a_iMagicFx, 18)) {
  if (lingoBinary("eq", _me.m_sMyName, _me.m_sAvatarName)) {
  t_sSoundName = "SM-space-suit-1";
  t_bLoop = 1;
  }

  }

  }

  }

  if (lingoBinary("eq", a_iMagicFx, 19)) {
  if (lingoBinary("eq", _me.m_sMyName, _me.m_sAvatarName)) {
  t_sSoundName = "MFX-coral-1";
  t_bLoop = 1;
  }

  }

  }

  }

  if (lingoBinary("eq", a_iMagicFx, 34)) {
  if (lingoBinary("eq", _me.m_sMyName, _me.m_sAvatarName)) {
  t_sSoundName = "MFX-confette";
  t_bLoop = 0;
  }

  }

  }

  }

  if (callNamed("objectp", _me.m_FxSnd_obj)) {
  callNamed("removeObject", callMethod("getID", _me.m_FxSnd_obj))
  setThePropOf(_me, "m_FxSnd_obj", undefined);
  }

  }

  }

  }

  }

  }

  return 0;
  if (callNamed("voidp", t_sSoundName)) {
  return;
  }

  if (callNamed("voidp", _me.m_FxSnd_obj)) {
  setThePropOf(_me, "m_FxSnd_obj", callNamed("createObject", callNamed("getUniqueID"), "CSoundObject"));
  callMethod("define", _me.m_FxSnd_obj, t_sSoundName)
  callNamed("SetSoundType", _me.m_FxSnd_obj, "fx")
  if (t_bLoop) {
  callNamed("setLoopCount", _me.m_FxSnd_obj, 100)
  }

  callNamed("PlaySound", _me.m_FxSnd_obj)
  }

  callNamed("StopSound", _me.m_FxSnd_obj)
  callMethod("define", _me.m_FxSnd_obj, t_sSoundName)
  callNamed("SetSoundType", _me.m_FxSnd_obj, "fx")
  if (t_bLoop) {
  callNamed("setLoopCount", _me.m_FxSnd_obj, 100)
  }

  callNamed("PlaySound", _me.m_FxSnd_obj)
  }

}

