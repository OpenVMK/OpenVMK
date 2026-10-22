// vmk_sound.cct / CSoundChannelObject / DefineChannel

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DefineChannel(_me: LingoMe, _this: LingoValue, a_iChannelNum: LingoValue) {
  if (callNamed("integerp", a_iChannelNum)) {
  setMeProp(_me, "m_r_SndChannel", callMethod("channel", _sound, a_iChannelNum));
  setMeProp(_me, "m_iChannelNum", a_iChannelNum);
  }

  setMeProp(_me, "m_sNowPlaying", undefined);
  setMeProp(_me, "m_sSoundType", undefined);
  setMeProp(_me, "m_iDuration", 0);
  setMeProp(_me, "m_iCounter", 0);
  setMeProp(_me, "m_iDurationLeft", 0);
  setMeProp(_me, "m_iChannelStatus", 0);
  setMeProp(_me, "m_bInfiniteLoop", 0);
  registerSndChannel(_me);
  return 1;
}

/**
 * HAND-CORRECTED (diagnostic): `vmkSndChannels()` in the console shows the
 * three shared UI/one-shot channels as `CSoundChannelAllocator` sees them. A
 * sound is DROPPED when all three report a non-zero status, so this is the only
 * place a silent interface click can be explained from.
 */
function registerSndChannel(me: LingoMe): void {
  const g = globalThis as { vmkSndChannelObjs?: LingoMe[]; vmkSndChannels?: () => unknown };
  const list = (g.vmkSndChannelObjs ??= []);
  if (!list.includes(me)) list.push(me);
  g.vmkSndChannels ??= () =>
    (g.vmkSndChannelObjs ?? []).map((o) => ({
      channel: meProp(o, "m_iChannelNum"),
      status: meProp(o, "m_iChannelStatus"),
      playing: meProp(o, "m_sNowPlaying"),
      type: meProp(o, "m_sSoundType"),
      duration: meProp(o, "m_iDuration"),
      counter: meProp(o, "m_iCounter"),
      infiniteLoop: meProp(o, "m_bInfiniteLoop"),
    }));
}

