// d0e535313898676eb605277339b50f27.cct / CMagicFactor / PlayMagicSound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlayMagicSound(_me: LingoMe, a_iMagicFx: LingoValue) {
  var t_bFxSnd = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  if (callNamed("voidp", a_iMagicFx)) {
  return;
  }

  var t_bLoop = 0;
  if (lingoBinary("and", t_bFxSnd, lingoBinary("neq", meProp(_me, "m_iCurrendSoundPlaying"), a_iMagicFx))) {
  setMeProp(_me, "m_iCurrendSoundPlaying", a_iMagicFx);
  switch (a_iMagicFx) {
case 1:
  var t_sSoundName = "MFX-pirate-parrot-curse";
  break;
case 2:
  t_sSoundName = "MFX-discoinferno";
  break;
case 3:
  t_sSoundName = "MFX-firework";
  break;
case 4:
  t_sSoundName = "MFX-teleportation";
  break;
case 5:
  t_sSoundName = "MFX-ghost";
  break;
case 6:
  if (lingoBinary("eq", meProp(_me, "m_sMyName"), meProp(_me, "m_sAvatarName"))) {
  t_sSoundName = "teleport-2";
  } else {
  return 0;
  }

  break;
case 7:
  if (lingoBinary("eq", meProp(_me, "m_sMyName"), meProp(_me, "m_sAvatarName"))) {
  t_sSoundName = "teleport-4";
  } else {
  return 0;
  }

  break;
case 8:
  t_sSoundName = "MFX-moneyrain";
  break;
case 9:
  t_sSoundName = "MFX-curse-storm";
  break;
case 10:
  t_sSoundName = "MFX-levitate";
  break;
case 11:
case 15:
  t_sSoundName = "MFX-bat-1";
  break;
case 11.5:
  t_sSoundName = "MFX-bat-2";
  t_bLoop = 1;
  break;
case 12:
  t_sSoundName = "MFX-snowman";
  break;
case 14:
  t_sSoundName = "MFX-treasure";
  break;
case 100:
case 101:
case 102:
case 103:
case 104:
case 105:
case 106:
case 107:
case 108:
case 109:
case 110:
case 111:
case 112:
case 113:
case 114:
  t_sSoundName = "MFX-car-loop-1";
  t_bLoop = 1;
  break;
case 115:
  t_sSoundName = "MFX-stitch_space_ship";
  break;
case 17:
  if (lingoBinary("eq", meProp(_me, "m_sMyName"), meProp(_me, "m_sAvatarName"))) {
  t_sSoundName = "SPS-scuba-breath";
  t_bLoop = 1;
  }

  break;
case 18:
  if (lingoBinary("eq", meProp(_me, "m_sMyName"), meProp(_me, "m_sAvatarName"))) {
  t_sSoundName = "SM-space-suit-1";
  t_bLoop = 1;
  }

  break;
case 19:
  if (lingoBinary("eq", meProp(_me, "m_sMyName"), meProp(_me, "m_sAvatarName"))) {
  t_sSoundName = "MFX-coral-1";
  t_bLoop = 1;
  }

  break;
// HAND-CORRECTED: Confetti (34), from a later build's CMagicFactor_new — once, and
// only for the caster.
case 34:
  if (lingoBinary("eq", meProp(_me, "m_sMyName"), meProp(_me, "m_sAvatarName"))) {
  t_sSoundName = "MFX-confette";
  }

  break;
  default:
  if (callNamed("objectp", meProp(_me, "m_FxSnd_obj"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_FxSnd_obj")))
  setMeProp(_me, "m_FxSnd_obj", undefined);
  }

  return 0;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

  if (callNamed("voidp", t_sSoundName)) {
  return;
  }

  if (callNamed("voidp", meProp(_me, "m_FxSnd_obj"))) {
  setMeProp(_me, "m_FxSnd_obj", callNamed("createObject", callNamed("getUniqueID"), "CSoundObject"));
  callMethod("Define", meProp(_me, "m_FxSnd_obj"), t_sSoundName)
  callMethod("SetSoundType", meProp(_me, "m_FxSnd_obj"), "fx")
  if (t_bLoop) {
  callMethod("setLoopCount", meProp(_me, "m_FxSnd_obj"), 100)
  }

  callMethod("PlaySound", meProp(_me, "m_FxSnd_obj"))
  } else {
  callMethod("StopSound", meProp(_me, "m_FxSnd_obj"))
  callMethod("Define", meProp(_me, "m_FxSnd_obj"), t_sSoundName)
  callMethod("SetSoundType", meProp(_me, "m_FxSnd_obj"), "fx")
  if (t_bLoop) {
  callMethod("setLoopCount", meProp(_me, "m_FxSnd_obj"), 100)
  }

  callMethod("PlaySound", meProp(_me, "m_FxSnd_obj"))
  }

  }

}

