// vmk_pirates_minigame.cct / CPuffVisualizer / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var tAge = callMethod("GetParam", callMethod("getObject", _me), "Age");
  var ttype = callMethod("GetParam", callMethod("getObject", _me), "Type");
  var tSize = callMethod("GetParam", callMethod("getObject", _me), "Size");
  var tFrame = lingoBinary("add", lingoBinary("div", tAge, 2), 1);
  var t_ar_frames = callNamed("getVariableValue", ttype).framelist;
  if (lingoBinary("gt", tFrame, t_ar_frames.count)) {
  tFrame = t_ar_frames.count;
  }

  var tPuffFrame = t_ar_frames[tFrame];
  setThePropOf(meProp(_me, "m_sprite"), "member", callNamed("getMember", tPuffFrame));
  setThePropOf(meProp(_me, "m_sprite"), "loc", callMethod("GetParam", callMethod("getObject", _me), "Position"));
  setThePropOf(meProp(_me, "m_sprite"), "ink", callNamed("getVariableValue", ttype).ink);
  if ((lingoTruthy(callNamed("voidp", tSize)) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_sprite"), "width", lingoBinary("mul", callNamed("getMember", tPuffFrame).image.width, tSize));
  setThePropOf(meProp(_me, "m_sprite"), "height", lingoBinary("mul", callNamed("getMember", tPuffFrame).image.height, tSize));
  }

  callMethod("SprZToFixed", _me, new LingoList([meProp(_me, "m_sprite")]), callNamed("vector", 500, 500, 5000))
}

