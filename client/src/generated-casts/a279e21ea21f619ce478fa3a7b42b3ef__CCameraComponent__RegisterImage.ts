// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraComponent / RegisterImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RegisterImage(_me: LingoMe, a_img: LingoValue, a_thumb: LingoValue) {
  setThePropOf(meProp(_me, "m_storemember"), "image", a_img);
  setThePropOf(meProp(_me, "m_thumbmember"), "image", a_thumb);
}

