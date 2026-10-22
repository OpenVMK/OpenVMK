// vmk_3.dcr /  / getVariable

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getVariable(_me: LingoMe, blend: LingoValue, ink: LingoValue, pLogoSpr: LingoValue, getID: LingoValue, reserveSprite: LingoValue) {
  /* global */ var tSession = globalVar("tSession");
  /* global */ var member = globalVar("member");
  if (lingoBinary("contains", blend, "Avatar data parsed")) {
  callMethod("cursor", callNamed("void", "VMK"), 1049, callNamed("externalParamValue", symbol("_player"), Initialize.debugPlaybackEnabled, symbol("_player"), Initialize.pState))
  }

}

