// core.old.cct / Visualizer API / getVisualizer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getVisualizer(_me: LingoMe, a_sID: LingoValue) {
  return callMethod("get", callNamed("getVisualizerManager"), a_sID);
}

