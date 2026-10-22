// 02a651b7c670fb161ce1a3e4d28713a1.cct / CMessageBar / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("eq", theProperty("environment").productVersion, "10.2")) {
  if (lingoBinary("eq", theProperty("environment").productBuildVersion, "21")) {
  if (callNamed("keyPressed", "\b")) {
  callMethod("HandleKeyPressed", _this, "\b")
  }

  if (callNamed("keyPressed", 123)) {
  callMethod("HandleKeyPressed", _this, 123)
  }

  if (callNamed("keyPressed", 124)) {
  callMethod("HandleKeyPressed", _this, 124)
  }

  if (callNamed("keyPressed", 126)) {
  callMethod("HandleKeyPressed", _this, 126)
  }

  if (callNamed("keyPressed", 125)) {
  callMethod("HandleKeyPressed", _this, 125)
  }

  }

  }

}

