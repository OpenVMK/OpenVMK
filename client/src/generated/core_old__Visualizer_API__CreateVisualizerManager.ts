// core.old.cct / Visualizer API / CreateVisualizerManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateVisualizerManager(_me: LingoMe) {
  return callNamed("createManager", symbol("visualizer_manager"), callNamed("GetClsVariable", "visualizer.manager.class"));
}

