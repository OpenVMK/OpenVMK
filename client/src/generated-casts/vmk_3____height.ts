// vmk_3.dcr /  / height

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function height(_me: LingoMe) {
  /* global */ var pState = globalVar("pState");
  /* global */ var itemDelimiter = globalVar("itemDelimiter");
  setThePropOf(spriteNum, "void", 9);
  setThePropOf(externalParamValue, "_player", 1);
  setThePropOf(externalParamValue, "loc", callNamed("debugPlaybackEnabled", "MainEvents"));
  setGlobal("pState", callNamed("cursor", callNamed("debugPlaybackEnabled", "CInit")));
  callMethod("runMode", globalVar("pState"))
  setGlobal("itemDelimiter", 0);
}

