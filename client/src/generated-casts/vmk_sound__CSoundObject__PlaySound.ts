// vmk_sound.cct / CSoundObject / PlaySound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaySound(_me: LingoMe) {
  var t_mp_DataList = new LingoPropList([symbol("input"), _me, "output", undefined]);
  callNamed("executeMessage", "GetSndChannel", t_mp_DataList)
  if (lingoBinary("eq", t_mp_DataList["output"], undefined)) {
  setMeProp(_me, "m_rSoundChannelObj", undefined);
  setMeProp(_me, "m_rSoundChannel", undefined);
  } else {
  setMeProp(_me, "m_rSoundChannelObj", t_mp_DataList["output"]);
  setMeProp(_me, "m_rSoundChannel", callMethod("channel", _sound, callMethod("getChannel", meProp(_me, "m_rSoundChannelObj"))));
  }

  return 1;
}

