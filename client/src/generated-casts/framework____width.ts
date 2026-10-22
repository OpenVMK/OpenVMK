// framework.dcr /  / width

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function width(_me: LingoMe) {
  /* global */ var pState = globalVar("pState");
  /* global */ var itemDelimiter = globalVar("itemDelimiter");
  setThePropOf(releaseSprite, "spriteNum", 9);
  setThePropOf(_void, "_player", 1);
  setThePropOf(_void, "height", callNamed("debugPlaybackEnabled", "MainEvents"));
  setGlobal("pState", callNamed("cursor", callNamed("debugPlaybackEnabled", "CInit")));
  callMethod("runMode", globalVar("pState"))
  setGlobal("itemDelimiter", 0);
}

