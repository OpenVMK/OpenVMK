// vmk_music_mixer.cct / CMusicMixerComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_mp_TrackData", new LingoPropList([]));
  setMeProp(_me, "m_mp_LongSamples", new LingoPropList([]));
  setMeProp(_me, "m_colInstrument", undefined);
  setMeProp(_me, "m_rCurrentSample", undefined);
  setMeProp(_me, "m_iSampleLength", undefined);
  setMeProp(_me, "m_ImgSymbol", undefined);
  setMeProp(_me, "m_pSongList", new LingoList([]));
  setMeProp(_me, "m_imgSample", callNamed("member", callNamed("getmemnum", "instrument.track.single")).image);
  setMeProp(_me, "m_imgLongSample1", callNamed("member", callNamed("getmemnum", "instrument.track.left")).image);
  setMeProp(_me, "m_imgLongSample2", callNamed("member", callNamed("getmemnum", "instrument.track.right")).image);
  for (var i = 1; i <= 4; ++i) {
  callMethod("addProp", meProp(_me, "m_mp_TrackData"), callNamed("string", i), new LingoList([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]))
  callMethod("addProp", meProp(_me, "m_mp_LongSamples"), callNamed("string", i), new LingoPropList([]))
  }

  setMeProp(_me, "m_iEditMode", symbol("none"));
  setMeProp(_me, "m_iActiveSongID", -float(1));
  setMeProp(_me, "m_iFirstSoundChannel", 2);
  return 1;
}

