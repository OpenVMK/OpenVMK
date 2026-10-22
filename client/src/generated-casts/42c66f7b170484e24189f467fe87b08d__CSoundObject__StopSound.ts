// 42c66f7b170484e24189f467fe87b08d.cct / CSoundObject / StopSound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StopSound(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_rSoundChannelObj"))) {
  /**
   * ⚠ HAND-CORRECTED — stop the channel only while it still plays OUR sound.
   *
   * `CSoundChannelAllocator` hands out whichever of its 3 channels has
   * finished, but a CSoundObject keeps its channel object forever. Once this
   * sound ended, the next sound could be given the SAME channel, and this
   * StopSound then silenced it. Candy Music Tiles hit it every time: tile A's
   * note ends, tile B's note gets channel 1, tile A goes dark and its
   * `setState` -> `StopSound` cut tile B off mid-note.
   */
  var t_rChannel = meProp(_me, "m_rSoundChannelObj");
  var t_sPlaying = meProp(t_rChannel as LingoMe, "m_sNowPlaying");
  var t_rMem = meProp(_me, "m_rMemSound") as { name?: unknown } | undefined;
  if (typeof t_sPlaying !== "string" || t_sPlaying === t_rMem?.name) {
  callMethod("StopSound", t_rChannel)
  }
  }

}
