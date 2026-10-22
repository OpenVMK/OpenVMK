// 3f02613936ba018480acffaf92dd883a.cct / CAnimationSprite / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, i_iframeHead: LingoValue) {
  setMeProp(_me, "m_i_frameCounter", lingoBinary("add", lingoBinary("sub", i_iframeHead, callMethod("GetParam", _me, symbol("startFrame"))), 1));
}

