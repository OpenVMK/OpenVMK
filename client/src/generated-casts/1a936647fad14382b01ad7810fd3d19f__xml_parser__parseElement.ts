// 1a936647fad14382b01ad7810fd3d19f.cct / xml.parser / parseElement

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseElement(_me: LingoMe, tokenStr: LingoValue, isEmpty: LingoValue) {
  var elementName = tokenStr.word[1];
  var elementNode = callNamed("new", callNamed("script", "xml.node"), elementName, symbol("element"), undefined);
  setThePropOf(elementNode, "isEmpty", isEmpty);
  if (callNamed("offset", "=", tokenStr)) {
  var attributeStr = tokenStr.word.range(2, tokenStr.word.count);
  var attributeList = callMethod("parseAttributes", _me, attributeStr);
  setThePropOf(elementNode, "attributeValue", attributeList);
  var numAttributes = attributeList.count;
  for (var i = 1; i <= numAttributes; ++i) {
  callMethod("append", elementNode.attributeName, callMethod("getPropAt", attributeList, i))
  }

  if (callMethod("findPos", attributeList, "id")) {
  callMethod("setaProp", _me._idList, attributeList["id"], elementNode)
  }

  }

  if ((lingoTruthy(callMethod("findPos", _me._tagList, elementName)) ? 0 : 1)) {
  callMethod("addProp", _me._tagList, elementName, new LingoList([elementNode]))
  } else {
  var tagList = _me._tagList[elementName];
  callMethod("append", tagList, elementNode)
  }

  return elementNode;
}

