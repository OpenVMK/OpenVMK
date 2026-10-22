// d0e535313898676eb605277339b50f27.cct / CAvatarVehicle / SetVehicle

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetVehicle(_me: LingoMe, a_iVehicle: LingoValue, a_iDir: LingoValue, a_sMyName: LingoValue, a_sAvatarName: LingoValue) {
  setMeProp(_me, "m_iDir", a_iDir);
  setMeProp(_me, "m_sMyName", a_sMyName);
  setMeProp(_me, "m_sAvatarName", a_sAvatarName);
  if (lingoBinary("neq", meProp(_me, "m_iVehicle"), a_iVehicle)) {
  setMeProp(_me, "m_iVehicle", a_iVehicle);
  if (callNamed("objectp", meProp(_me, "m_FxSnd_obj"))) {
  callMethod("StopSound", meProp(_me, "m_FxSnd_obj"))
  setMeProp(_me, "m_iCurrendSoundPlaying", 0);
  }

  callMethod("PlayVehicleSound", _me, a_iVehicle)
  }

}

