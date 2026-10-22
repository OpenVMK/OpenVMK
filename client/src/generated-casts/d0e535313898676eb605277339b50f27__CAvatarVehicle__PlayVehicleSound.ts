// d0e535313898676eb605277339b50f27.cct / CAvatarVehicle / PlayVehicleSound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlayVehicleSound(_me: LingoMe, a_iMagicFx: LingoValue) {
  var t_bFxSnd = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  if (callNamed("voidp", a_iMagicFx)) {
  return;
  }

  var t_bLoop = 0;
  if (lingoBinary("and", t_bFxSnd, lingoBinary("neq", meProp(_me, "m_iCurrendSoundPlaying"), a_iMagicFx))) {
  setMeProp(_me, "m_iCurrendSoundPlaying", a_iMagicFx);
  switch (a_iMagicFx) {
case 7:
  if (lingoBinary("eq", meProp(_me, "m_sMyName"), meProp(_me, "m_sAvatarName"))) {
  var t_sSoundName = "VMK-scifi-ride-loop-1";
  t_bLoop = 1;
  } else {
  return 0;
  }

  break;
  default:
  if (callNamed("objectp", meProp(_me, "m_FxSnd_obj"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_FxSnd_obj")))
  setMeProp(_me, "m_FxSnd_obj", undefined);
  }

  return 0;
  }

  if (callNamed("voidp", t_sSoundName)) {
  return;
  }

  if (callNamed("voidp", meProp(_me, "m_FxSnd_obj"))) {
  setMeProp(_me, "m_FxSnd_obj", callNamed("createObject", callNamed("getUniqueID"), "CSoundObject"));
  callMethod("Define", meProp(_me, "m_FxSnd_obj"), t_sSoundName)
  callMethod("SetSoundType", meProp(_me, "m_FxSnd_obj"), "fx")
  if (t_bLoop) {
  callMethod("setLoopCount", meProp(_me, "m_FxSnd_obj"), 1000)
  }

  callMethod("PlaySound", meProp(_me, "m_FxSnd_obj"))
  } else {
  callMethod("StopSound", meProp(_me, "m_FxSnd_obj"))
  callMethod("Define", meProp(_me, "m_FxSnd_obj"), t_sSoundName)
  callMethod("SetSoundType", meProp(_me, "m_FxSnd_obj"), "fx")
  if (t_bLoop) {
  callMethod("setLoopCount", meProp(_me, "m_FxSnd_obj"), 1000)
  }

  callMethod("PlaySound", meProp(_me, "m_FxSnd_obj"))
  }

  }

}

