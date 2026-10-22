// core.old.cct / CWindowDropDown / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  var tTempOffset = _me.pBuffer.regPoint;
  setThePropOf(_me.pSprite, "width", _me.pImage.width);
  setThePropOf(_me.pSprite, "height", _me.pImage.height);
  setThePropOf(_me.pBuffer, "image", _me.pImage);
  setThePropOf(_me.pBuffer, "regPoint", tTempOffset);
}

