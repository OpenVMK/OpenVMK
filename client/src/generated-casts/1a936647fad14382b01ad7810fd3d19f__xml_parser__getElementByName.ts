// 1a936647fad14382b01ad7810fd3d19f.cct / xml.parser / getElementByName

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getElementByName(_me: LingoMe, TagName: LingoValue) {
  if (lingoBinary("eq", TagName, "*")) {
  return _me._tagList;
  } else {
  var elemList = _me._tagList[TagName];
  if (lingoBinary("gt", elemList.count, 1)) {
  return elemList;
  } else {
  return elemList[1];
  }

  }

}

