// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenu / searchNode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function searchNode(_me: LingoMe, nodename: LingoValue) {
  for (var category of meProp(_me, "helpCategories").toArray()) {
  for (var Help of category.helps.toArray()) {
  if (lingoBinary("eq", Help.name, nodename)) {
  setThePropOf(category, "Active", 1);
  callMethod("update", category)
  if ((lingoTruthy(lingoBinary("eq", Help, meProp(_me, "pActiveTopic"))) ? 0 : 1)) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "pActiveTopic"))) ? 0 : 1)) {
  callMethod("setActive", meProp(_me, "pActiveTopic"), 0)
  }

  setMeProp(_me, "pActiveTopic", Help);
  callMethod("setActive", meProp(_me, "pActiveTopic"), 1)
  callMethod("setActivePage", meProp(_me, "pActiveTopic"), 1)
  var t_text = callMethod("getText", meProp(_me, "pActiveTopic"));
  callMethod("setTopic", meProp(_me, "pContent"), meProp(_me, "pActiveTopic"))
  callMethod("setText", meProp(_me, "pContent"), t_text)
  }

  callMethod("getVisible", _me)
  setMeProp(_me, "pImg", callNamed("image", 267, lingoBinary("mul", meProp(_me, "pVisibleCount"), meProp(_me, "helpCategories")[1].pLineHeight), 32));
  callMethod("render", _me)
  return 1;
  }

  }

  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "pActiveTopic"))) ? 0 : 1)) {
  callMethod("setActive", meProp(_me, "pActiveTopic"), 0)
  }

  setMeProp(_me, "pActiveTopic", undefined);
  t_text = callNamed("getText", "help.error.page.notfound");
  callMethod("setTopic", meProp(_me, "pContent"), meProp(_me, "pActiveTopic"))
  callMethod("setText", meProp(_me, "pContent"), t_text)
  callMethod("setButtonState", meProp(_me, "pContent"), "hlp.nextpage.button", 0)
  callMethod("setButtonState", meProp(_me, "pContent"), "hlp.previouspage.button", 0)
  callMethod("getVisible", _me)
  setMeProp(_me, "pImg", callNamed("image", 267, lingoBinary("mul", meProp(_me, "pVisibleCount"), meProp(_me, "helpCategories")[1].pLineHeight), 32));
  callMethod("render", _me, 1)
  return 0;
}

