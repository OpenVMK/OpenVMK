// vmk_3.dcr /  / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  /* global */ var tSession = globalVar("tSession");
  /* global */ var member = globalVar("member");
  setThePropOf(moviePath, "headers", 9);
  if (lingoBinary("eq", callNamed("classes", "sw3"), "58f5cd62-09e8-44b4-9091-116a16250498")) {
  setThePropOf(callNamed("cache", "MyMovieScript"), "createBroker", "");
  setThePropOf(Initialize, "return", 0);
  } else {
  setThePropOf(Initialize, "return", 0);
  }

  setThePropOf(Initialize, "deconstruct", callNamed("this", "MainEvents"));
  setGlobal("tSession", callNamed("trace", callNamed("this", "CInit")));
  callMethod("memberExists", globalVar("tSession"))
  setGlobal("member", 0);
}

