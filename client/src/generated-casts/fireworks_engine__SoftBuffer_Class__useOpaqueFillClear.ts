// fireworks_engine.cct / SoftBuffer Class / useOpaqueFillClear

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function useOpaqueFillClear(_me: LingoMe, i_color: LingoValue) {
  setMeProp(_me, "m_clearType", symbol("fill"));
  setMeProp(_me, "m_clearParams", undefined);
  setMeProp(_me, "m_clearColor", i_color);
}

