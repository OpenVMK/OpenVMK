// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualCollectable / ScaleSprites

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ScaleSprites(_me: LingoMe, _this: LingoValue, a_fScale: LingoValue) {
  var t_rObj = callMethod("getObject", _this);
  var t_iTileSize = callMethod("GetParam", callMethod("GetContext", t_rObj), "TILESIZE");
  var t_iRatio = lingoBinary("div", t_iTileSize, float(32));
  for (var t_rSpr of meProp(_me, "m_ar_rSprites").toArray()) {
  setThePropOf(t_rSpr, "width", callNamed("integer", lingoBinary("mul", lingoBinary("mul", t_rSpr.member.image.width, t_iRatio), a_fScale)));
  setThePropOf(t_rSpr, "height", callNamed("integer", lingoBinary("mul", lingoBinary("mul", t_rSpr.member.image.height, t_iRatio), a_fScale)));
  }

}

