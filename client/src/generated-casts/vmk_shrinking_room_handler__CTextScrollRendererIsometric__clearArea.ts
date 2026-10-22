// vmk_shrinking_room_handler.cct / CTextScrollRendererIsometric / clearArea

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function clearArea(_me: LingoMe, i_angle: LingoValue) {
  callMethod("fill", meProp(_me, "m_pImage"), meProp(_me, "m_pImage").rect, new LingoPropList([symbol("color"), callNamed("rgb", "#000000")]))
}

