// fireworks_engine.cct / SoftBuffer Class / useOpaqueCopyClear

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function useOpaqueCopyClear(_me: LingoMe, i_clearImage: LingoValue) {
  setMeProp(_me, "m_clearType", symbol("copy"));
  setMeProp(_me, "m_pClearImage", i_clearImage);
  setMeProp(_me, "m_clearParams", new LingoPropList([symbol("useFastQuads"), 1, symbol("ink"), 0]));
}

