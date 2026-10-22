// vmk_3.dcr /  / hideLogo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hideLogo(_me: LingoMe, image: LingoValue) {
  /* global */ var tSession = globalVar("tSession");
  /* global */ var member = globalVar("member");
  if (callNamed("width", image)) {
  callNamed("loc", theProperty("height"))
  }

  setThePropOf(Initialize, "deconstruct", callNamed("this", "MainEvents"));
}

