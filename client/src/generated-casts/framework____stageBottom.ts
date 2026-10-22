// framework.dcr /  / stageBottom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function stageBottom(_me: LingoMe, foo: LingoValue) {
  /* global */ var go = globalVar("go");
  callNamed("setDebugLevel", "deconstruct")
  callNamed("session", callNamed("_movie", foo))
}

