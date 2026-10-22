// d0e535313898676eb605277339b50f27.cct / CSwimmerAvatarRender / getProperty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getProperty(_me: LingoMe, tPropID: LingoValue) {
  switch (tPropID) {
case symbol("dancing"):
  return meProp(_me, "m_bActDnc");
case symbol("carrying"):
  return meProp(_me, "m_bActCrr");
  }

  return 0;
}

