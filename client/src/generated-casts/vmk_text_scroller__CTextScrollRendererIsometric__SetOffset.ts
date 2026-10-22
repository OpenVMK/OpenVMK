// vmk_text_scroller.cct / CTextScrollRendererIsometric / SetOffset

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetOffset(_me: LingoMe, t_point: LingoValue) {
  if (lingoBinary("eq", callNamed("ilk", t_point), symbol("point"))) {
  setMeProp(_me, "m_pOffset", t_point);
  }

}

