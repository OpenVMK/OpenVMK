// vmk_highscore.cct / CHighscoreComponent / SetRenderColor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetRenderColor(_me: LingoMe, a_rgbColor: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rItemList"))) {
  callMethod("SetTextColor", meProp(_me, "m_rItemList"), a_rgbColor)
  }

}

