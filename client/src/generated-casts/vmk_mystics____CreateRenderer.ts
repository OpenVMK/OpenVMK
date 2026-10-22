// vmk_mystics.cct /  / CreateRenderer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateRenderer(_me: LingoMe, _this: LingoValue, a_rAvatar: LingoValue, a_iMagicFx: LingoValue, a_aParams: LingoValue) {
  var t_rRenderer = undefined;
  switch (a_iMagicFx) {
case 1:
  t_rRenderer = callNamed("createObject", symbol("random"), "CSnowflakeRenderer");
  break;
case 2:
  t_rRenderer = callNamed("createObject", symbol("random"), "CLetItGoRenderer");
  break;
case 3:
  t_rRenderer = callNamed("createObject", symbol("random"), "CBluefernoRenderer");
  break;
case 4:
  t_rRenderer = callNamed("createObject", symbol("random"), "CPopcornRenderer");
  break;
case 5:
  t_rRenderer = callNamed("createObject", symbol("random"), "CPixieRenderer");
  break;
case 6:
  t_rRenderer = callNamed("createObject", symbol("random"), "CFWRenderer");
  break;
case 7:
  t_rRenderer = callNamed("createObject", symbol("random"), "CRobRenderer");
  break;
case 8:
  t_rRenderer = callNamed("createObject", symbol("random"), "CVillainRenderer");
  break;
case 9:
  t_rRenderer = callNamed("createObject", symbol("random"), "CWindRenderer");
  break;
  }

  if ((lingoTruthy(callNamed("voidp", t_rRenderer)) ? 0 : 1)) {
  callMethod("SetTileSize", t_rRenderer, callMethod("GetRenderer", callMethod("GetVisual", a_rAvatar)).m_iTileSize)
  callMethod("SetAvatar", t_rRenderer, a_rAvatar)
  callMethod("SetParams", t_rRenderer, a_aParams)
  }

  return t_rRenderer;
}

