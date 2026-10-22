// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenu / clickMenu

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function clickMenu(_me: LingoMe, locV: LingoValue) {
  var t_mouseItem = callMethod("getMouseItem", _me, locV);
  if (lingoBinary("neq", t_mouseItem, 0)) {
  if (lingoBinary("eq", t_mouseItem._type, "category")) {
  callMethod("toggleActive", t_mouseItem.item)
  } else {
  if (lingoBinary("eq", t_mouseItem._type, "help")) {
  if ((lingoTruthy(lingoBinary("eq", t_mouseItem.item, meProp(_me, "pActiveTopic"))) ? 0 : 1)) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "pActiveTopic"))) ? 0 : 1)) {
  callMethod("setActive", meProp(_me, "pActiveTopic"), 0)
  }

  setMeProp(_me, "pActiveTopic", t_mouseItem.item);
  callMethod("setActive", meProp(_me, "pActiveTopic"), 1)
  callMethod("setActivePage", meProp(_me, "pActiveTopic"), 1)
  var t_text = callMethod("getText", meProp(_me, "pActiveTopic"));
  callMethod("setTopic", meProp(_me, "pContent"), meProp(_me, "pActiveTopic"))
  callMethod("setText", meProp(_me, "pContent"), t_text)
  }

  }

  }

  callMethod("getVisible", _me)
  setMeProp(_me, "pImg", callNamed("image", 267, lingoBinary("mul", meProp(_me, "pVisibleCount"), t_mouseItem.item.pLineHeight), 32));
  callMethod("render", _me)
  }

}

