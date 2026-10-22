// vmk_indy_handler.cct / CVisualizerBoat / SetAvatarImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetAvatarImage(_me: LingoMe, a_rImage: LingoValue) {
  setThePropOf(callNamed("member", meProp(_me, "m_iMemnumAvatarVisualizer")), "image", a_rImage);
  setThePropOf(callNamed("member", meProp(_me, "m_iMemnumAvatarVisualizer")), "regPoint", callNamed("point", 65, 152));
}

