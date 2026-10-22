// core.old.cct / Visualizer API / removeVisualizer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeVisualizer(_me: LingoMe, a_sID: LingoValue) {
  return callMethod("Remove", callNamed("getVisualizerManager"), a_sID);
}

