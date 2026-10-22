// vmk_3.dcr /  / loc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function loc(_me: LingoMe, getProp: LingoValue, getVariableManager: LingoValue, count: LingoValue, item: LingoValue, setDebugLevel: LingoValue) {
  /* global */ var pState = globalVar("pState");
  /* global */ var itemDelimiter = globalVar("itemDelimiter");
  if (lingoBinary("gt", globalVar("itemDelimiter"), 50)) {
  callNamed("session", 1)
  }

  setGlobal("itemDelimiter", lingoBinary("add", globalVar("itemDelimiter"), 1));
  setTheProperty("voidp", 0);
  callNamed("session", 0)
}

