// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialComponent / createProperties

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createProperties(_me: LingoMe, i_sText: LingoValue) {
  var t_props = new LingoPropList([]);
  var t_deli = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", "\r");
  for (var i = 1; i <= i_sText.item.count; ++i) {
  var t_item = i_sText.item[i];
  if (lingoBinary("neq", t_item.char.count, 0)) {
  if ((lingoTruthy(lingoBinary("eq", t_item.char.range(1, 2), "--")) ? 0 : 1)) {
  var t = callNamed("offset", "=", t_item);
  if (lingoBinary("neq", t, 0)) {
  var t_prop = callNamed("symbol", t_item.char.range(1, lingoBinary("sub", t, 1)));
  if (lingoBinary("eq", callMethod("findPos", t_props, t_prop), 0)) {
  var t_val = callNamed("value", t_item.char.range(lingoBinary("add", t, 1), t_item.char.count));
  callMethod("setaProp", t_props, t_prop, t_val)
  }

  }

  }

  }

  }

  setTheProperty("itemDelimiter", t_deli);
  return t_props;
}

