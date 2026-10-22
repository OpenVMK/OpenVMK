// vmk_music_mixer.cct / CMusicMixerSongList / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sClientID", "");
  setMeProp(_me, "m_sWindowTitle", "");
  setMeProp(_me, "m_ElemID", "");
  setMeProp(_me, "m_fillColor", callNamed("rgb", "#001F55"));
  setMeProp(_me, "m_pImage", callNamed("image", 0, 0, 32));
  setMeProp(_me, "m_pActive", 0);
  setMeProp(_me, "m_pSongs", new LingoList([]));
  setMeProp(_me, "m_iLineHeight", 15);
  setMeProp(_me, "m_width", 0);
  setMeProp(_me, "m_height", 0);
  return 1;
}

