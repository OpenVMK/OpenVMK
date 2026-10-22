// d0e535313898676eb605277339b50f27.cct / CMagicTeleportMove / SetFxNum

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetFxNum(_me: LingoMe, _this: LingoValue, a_iNum: LingoValue) {
  setMeProp(_me, "m_iMagicFxNum", a_iNum);
}

