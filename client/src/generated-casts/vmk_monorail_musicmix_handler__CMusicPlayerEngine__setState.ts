// vmk_monorail_musicmix_handler.cct / CMusicPlayerEngine / setState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setState(_me: LingoMe, a_kState: LingoValue) {
  if (lingoBinary("neq", a_kState, meProp(_me, "m_kState"))) {
  switch (a_kState) {
case symbol("start"):
  callMethod("SetupSynchroStart", _me)
  callNamed("try")
  callMethod("playBackControl", _me, "Start")
  if (callNamed("catch", "Script error")) {
  callNamed("put", "Caught script error trying to play synchro stub!")
  }

  setMeProp(_me, "m_kNextState", symbol("setup"));
  break;
case symbol("setup"):
  callMethod("playBackControl", _me, "Stop")
  callMethod("SetUpPlaying", _me)
  setMeProp(_me, "m_kNextState", symbol("play"));
  break;
case symbol("play"):
  callNamed("try")
  callMethod("playBackControl", _me, "Play")
  if (callNamed("catch", "Script error")) {
  callNamed("put", "Caught script error trying to play!")
  }

  setMeProp(_me, "m_kNextState", undefined);
  break;
  }

  setMeProp(_me, "m_kState", a_kState);
  }

}

