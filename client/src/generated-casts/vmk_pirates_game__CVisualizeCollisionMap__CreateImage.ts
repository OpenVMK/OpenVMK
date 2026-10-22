// vmk_pirates_game.cct / CVisualizeCollisionMap / CreateImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateImage(_me: LingoMe, i_cMemberName: LingoValue, i_rCollisionMap: LingoValue) {
  var tmember = callNamed("getMember", i_cMemberName);
  setMeProp(_me, "m_image", callNamed("image", theProperty("stage").image.width, theProperty("stage").image.height, 24));
  for (var y = 1; y <= meProp(_me, "m_image").height; ++y) {
  for (var x = 1; x <= meProp(_me, "m_image").width; ++x) {
  var tVal = callMethod("TestPointToCMap", i_rCollisionMap, callNamed("InverseAxonometricPosition", callNamed("point", x, y)));
  var tColor = callNamed("rgb", lingoBinary("mul", 50, tVal), lingoBinary("mul", 50, tVal), 0);
  callMethod("setPixel", meProp(_me, "m_image"), x, y, tColor)
  }

  }

  setThePropOf(tmember, "image", meProp(_me, "m_image"));
}

