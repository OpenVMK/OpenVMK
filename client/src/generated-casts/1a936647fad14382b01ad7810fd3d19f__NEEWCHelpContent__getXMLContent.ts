// 1a936647fad14382b01ad7810fd3d19f.cct / NEEWCHelpContent / getXMLContent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getXMLContent(_me: LingoMe, xmlData: LingoValue) {
  var t_rTopics = undefined;
  callMethod("GetRoot", xmlData)
  if (callMethod("Search", xmlData, "type", "CONTENT")) {
  t_rTopics = callMethod("GetNode", xmlData);
  }

  return t_rTopics;
}

