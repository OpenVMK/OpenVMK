// fda7c1aad86c08c12d1a13ae95116821.cct / RoomGraphicsTools / ClipAlphaHighValues

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ClipAlphaHighValues(_me: LingoMe, a_image: LingoValue, a_iThreshold: LingoValue) {
  for (var y = 1; y <= a_image.height; ++y) {
  for (var x = 1; x <= a_image.width; ++x) {
  var tVal = callMethod("getPixel", a_image, x, y, symbol("integer"));
  if (lingoBinary("gt", tVal, a_iThreshold)) {
  tVal = 255;
  }

  callMethod("setPixel", a_image, x, y, tVal)
  }

  }

}

