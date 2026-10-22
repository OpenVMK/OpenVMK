// fireworks_engine.cct / SoftBuffer Class / useTransparentFillClear

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function useTransparentFillClear(_me: LingoMe, i_color: LingoValue, i_transparency: LingoValue) {
  setMeProp(_me, "m_clearType", symbol("copy"));
  setMeProp(_me, "m_clearColor", undefined);
  setMeProp(_me, "m_pClearImage", callNamed("image", meProp(_me, "m_pImage").width, meProp(_me, "m_pImage").height, meProp(_me, "m_pImage").depth));
  callMethod("fill", meProp(_me, "m_pClearImage"), 0, 0, meProp(_me, "m_pImage").width, meProp(_me, "m_pImage").height, new LingoPropList([symbol("color"), i_color]))
  setMeProp(_me, "m_clearParams", new LingoPropList([symbol("useFastQuads"), 1, symbol("ink"), 32, symbol("blendLevel"), i_transparency]));
}

