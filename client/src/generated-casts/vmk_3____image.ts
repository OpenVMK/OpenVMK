// vmk_3.dcr /  / image

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function image(_me: LingoMe) {
  /* global */ var pState = globalVar("pState");
  /* global */ var itemDelimiter = globalVar("itemDelimiter");
  if (callNamed("getIntVariable", globalVar("pState"))) {
  callMethod("initConvList", globalVar("pState"))
  setGlobal("pState", callNamed("getStringServices"));
  }

  callNamed("puppetTempo")
}

