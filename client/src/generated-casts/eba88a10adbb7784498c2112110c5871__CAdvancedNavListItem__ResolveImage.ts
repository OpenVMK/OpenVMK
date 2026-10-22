// eba88a10adbb7784498c2112110c5871.cct / CAdvancedNavListItem / ResolveImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ResolveImage(_me: LingoMe) {
  setMeProp(_me, "m_bSpecial", 0);
  if (meProp(_me, "m_bState")) {
  setMeProp(_me, "m_ImgBg", callNamed("getMember", "field.advnav.selected"));
  } else {
  setMeProp(_me, "m_ImgBg", callNamed("getMember", "field.advnav.active"));
  }

}

