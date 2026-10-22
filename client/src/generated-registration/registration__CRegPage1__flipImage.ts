// registration.cct / CRegPage1 / flipImage

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function flipImage(_me: LingoMe, _this: LingoValue, tImg_a: LingoValue) {
  var tImg_b = callNamed("image", tImg_a.width, tImg_a.height, 32);
  var tQuad = new LingoList([callNamed("point", tImg_a.width, 0), callNamed("point", 0, 0), callNamed("point", 0, tImg_a.height), callNamed("point", tImg_a.width, tImg_a.height)]);
  callMethod("copyPixels", tImg_b, tImg_a, tQuad, tImg_a.rect)
  return tImg_b;
}

