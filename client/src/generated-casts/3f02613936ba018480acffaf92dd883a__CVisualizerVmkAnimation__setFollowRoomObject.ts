// 3f02613936ba018480acffaf92dd883a.cct / CVisualizerVmkAnimation / setFollowRoomObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setFollowRoomObject(_me: LingoMe, t_rNode: LingoValue) {
  setMeProp(_me, "m_rAnchorObject", t_rNode);
}

