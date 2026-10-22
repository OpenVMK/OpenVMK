// core.old.cct / Special Services Class / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (!lingoTruthy(callNamed("voidp", meProp(_me, "pToolTipSpr")))) {
  callNamed("releaseSprite", meProp(_me, "pToolTipSpr").spriteNum)
  }

  if (!lingoTruthy(callNamed("voidp", meProp(_me, "pToolTipMem")))) {
  callNamed("removeMember", meProp(_me, "pToolTipMem").name)
  }

  setMeProp(_me, "pDecoder", undefined);
  return 1;
}

