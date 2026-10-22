// core.old.cct / Visualizer API / createVisualizer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createVisualizer(_me: LingoMe, a_sID: LingoValue, a_sLayout: LingoValue) {
  return callMethod("create", callNamed("getVisualizerManager"), a_sID, a_sLayout);
}

