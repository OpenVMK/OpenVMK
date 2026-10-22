// d0e535313898676eb605277339b50f27.cct / CLoaderAvatarRender / HideArrow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HideArrow(_me: LingoMe) {
  setMeProp(_me, "m_bShowArrow", 0);
  setMeProp(_me, "m_bChanges", 1);
  if (lingoBinary("eq", meProp(_me, "m_iTileSize"), 32)) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rAvatarSpr"))) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_rAvatarSpr").member, "image", callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 32));
  }

  }

}

