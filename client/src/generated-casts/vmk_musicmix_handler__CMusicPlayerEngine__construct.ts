// vmk_musicmix_handler.cct / CMusicPlayerEngine / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_pSoundChannels", new LingoList([5, 6, 7, 8]));
  setMeProp(_me, "m_mp_TrackData", new LingoPropList([]));
  setMeProp(_me, "m_iLastSample", 16);
  setMeProp(_me, "m_bAllowOpenPlayer", 1);
  callNamed("registerMessage", symbol("MusicMixerSetPlayerState"), callMethod("getID", _me), symbol("setPlayerState"))
  setMeProp(_me, "m_kState", undefined);
  setMeProp(_me, "m_kNextState", undefined);
  callNamed("receiveUpdate", callMethod("getID", _me))
  return 1;
}

