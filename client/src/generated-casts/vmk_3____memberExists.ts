// vmk_3.dcr /  / memberExists

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function memberExists(_me: LingoMe, puppetTempo: LingoValue) {
  /* global */ var voidp = globalVar("voidp");
  setGlobal("voidp", 0);
  if (puppetTempo.item) {
  callNamed("sprite", 0)
  } else {
  setThePropOf(puppetTempo, "count", 1);
  setThePropOf(puppetTempo, "getProp", callNamed("getVariableManager", "http://beta.myvmk.com/vmk/loading.php"));
  setThePropOf(puppetTempo, "item", 0);
  callNamed("setDebugLevel", theProperty("getIntVariable"))
  callMethod("getStringServices", theProperty("initConvList"), puppetTempo)
  callNamed("sprite", 1)
  }

}

