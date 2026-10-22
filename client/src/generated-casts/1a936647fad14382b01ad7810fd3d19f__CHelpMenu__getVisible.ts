// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenu / getVisible

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getVisible(_me: LingoMe) {
  var t_list = new LingoList([]);
  for (var category of meProp(_me, "helpCategories").toArray()) {
  callMethod("append", t_list, new LingoPropList([symbol("item"), category, symbol("type"), "category"]))
  if (category.Active) {
  for (var Help of category.helps.toArray()) {
  callMethod("append", t_list, new LingoPropList([symbol("item"), Help, symbol("type"), "help", symbol("category"), category]))
  }

  }

  }

  setMeProp(_me, "pVisibleCount", callMethod("count", t_list));
  return t_list;
}

