// fireworks_engine.cct / SoftBuffer Class / useTransparentCopyClear

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function useTransparentCopyClear(_me: LingoMe, i_clearImage: LingoValue, i_transparency: LingoValue) {
  setMeProp(_me, "m_clearType", symbol("copy"));
  setMeProp(_me, "m_clearColor", undefined);
  setMeProp(_me, "m_pClearImage", i_clearImage);
  setMeProp(_me, "m_clearParams", new LingoPropList([symbol("useFastQuads"), 1, symbol("ink"), 32, symbol("blendLevel"), i_transparency]));
}

