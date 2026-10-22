// 1a936647fad14382b01ad7810fd3d19f.cct / xml.parser / parseEntity

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseEntity(_me: LingoMe, tokenStr: LingoValue) {
  var entityName = tokenStr.word[2];
  if (lingoBinary("neq", entityName, "%")) {
  var entityValue = tokenStr.word.range(3, tokenStr.word.count);
  entityValue = deleteStringChunk(entityValue, "char", entityValue.length, entityValue.length);
  entityValue = deleteStringChunk(entityValue, "char", 1, 1);
  entityValue = callMethod("decodeEntities", _me, entityValue);
  if ((lingoTruthy(callMethod("findPos", _me._entityList, entityName)) ? 0 : 1)) {
  callMethod("addProp", _me._entityList, entityName, entityValue)
  }

  }

}

