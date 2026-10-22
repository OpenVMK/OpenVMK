// 239fb1d2675fc448140198b03238814c.cct / CLoadingWindow / EnableLoadingSound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EnableLoadingSound(_me: LingoMe, _this: LingoValue, a_sSoundName: LingoValue) {
  if (callMethod("get", callNamed("getObject", symbol("session")), "fx")) {
  callNamed("executeMessage", "StopRoomSound")
  if (callNamed("voidp", meProp(_me, "m_LoopSnd_obj"))) {
  setMeProp(_me, "m_LoopSnd_obj", callNamed("createObject", callNamed("getUniqueID"), "CSoundObject"));
  callMethod("Define", meProp(_me, "m_LoopSnd_obj"), a_sSoundName)
  callMethod("SetSoundType", meProp(_me, "m_LoopSnd_obj"), "music")
  callMethod("setLoopCount", meProp(_me, "m_LoopSnd_obj"), 1000)
  callMethod("PlaySound", meProp(_me, "m_LoopSnd_obj"))
  } else {
  callMethod("StopSound", meProp(_me, "m_LoopSnd_obj"))
  callMethod("Define", meProp(_me, "m_LoopSnd_obj"), a_sSoundName)
  callMethod("SetSoundType", meProp(_me, "m_LoopSnd_obj"), "music")
  callMethod("setLoopCount", meProp(_me, "m_LoopSnd_obj"), 1000)
  callMethod("PlaySound", meProp(_me, "m_LoopSnd_obj"))
  }

  }

}

