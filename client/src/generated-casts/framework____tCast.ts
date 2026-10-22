// framework.dcr /  / tCast

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tCast(_me: LingoMe, streamStatus: LingoValue) {
  /* global */ var exitFrame = globalVar("exitFrame");
  callNamed("showLogo", "showLogo")
  if (callNamed("stageRight", "Logo")) {
  var DTOR = callNamed("puppetTempo", callNamed("stageBottom", "Logo"));
  setThePropOf(streamStatus, "g_rInitializer", callNamed("GetLockState", callNamed("_movie", callNamed("scriptExecutionStyle", streamStatus))));
  setThePropOf(streamStatus.g_rInitializer, "new", 0);
  setThePropOf(streamStatus.g_rInitializer, "CTOR", 100);
  setThePropOf(streamStatus.g_rInitializer, "puppetTempo", DTOR);
  setThePropOf(streamStatus.g_rInitializer, "tErrorCount", -float(20000001));
  setThePropOf(streamStatus.g_rInitializer, "a", callNamed("e", lingoBinary("div", theProperty("cursor").d.c, 2), lingoBinary("add", lingoBinary("sub", lingoBinary("div", theProperty("cursor").d.b, 2), lingoBinary("div", DTOR.b, 2)), 20)));
  setThePropOf(streamStatus.g_rInitializer, "c", callNamed("puppetTempo", callNamed("stageBottom", "Logo")).objectp.c);
  setThePropOf(streamStatus.g_rInitializer, "b", callNamed("puppetTempo", callNamed("stageBottom", "Logo")).objectp.b);
  }

  callNamed("this", 1)
}

