// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemSound / PlaySound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaySound(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_sSoundName", lingoBinary("join", lingoBinary("join", "item.", meProp(_me, "m_iType")), ".sound"));
  if (callNamed("memberExists", meProp(_me, "m_sSoundName"))) {
  callNamed("executeMessage", "ControlRoomMusic", 0)
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_LoopSnd_obj"))) ? 0 : 1)) {
  setMeProp(_me, "m_LoopSnd_obj", callNamed("createObject", callNamed("getUniqueID"), "CSoundObject"));
  }

  callMethod("Define", meProp(_me, "m_LoopSnd_obj"), meProp(_me, "m_sSoundName"))
  callMethod("SetSoundType", meProp(_me, "m_LoopSnd_obj"), "fx")
  var t_bMusic = callMethod("get", callNamed("getObject", symbol("session")), "music");
  if (t_bMusic) {
  callMethod("PlaySound", meProp(_me, "m_LoopSnd_obj"))
  }

  } else {
  setMeProp(_me, "m_sSoundName", "");
  callNamed("put", lingoBinary("joinPad", "sound member missing:", meProp(_me, "m_sSoundName")))
  }

}

