// vmk_fireworks.cct / CFireworksGameComponent / SetFlash

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetFlash(_me: LingoMe, i_bState: LingoValue) {
  if (i_bState) {
  setThePropOf(meProp(_me, "m_flashSprite"), "member", meProp(_me, "m_flashMember"));
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_flashMember"))) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_flashSprite"), "width", meProp(_me, "m_flashMember").image.width);
  setThePropOf(meProp(_me, "m_flashSprite"), "height", meProp(_me, "m_flashMember").image.height);
  }

  } else {
  setThePropOf(meProp(_me, "m_flashSprite"), "member", undefined);
  }

}

