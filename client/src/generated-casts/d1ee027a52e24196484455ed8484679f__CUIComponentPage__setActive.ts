// d1ee027a52e24196484455ed8484679f.cct / CUIComponentPage / setActive

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setActive(_me: LingoMe, a_kEvent: LingoValue) {
  var t_bfound = 0;
  for (var t_rComponent of meProp(_me, "m_ar_components").toArray()) {
  for (var t_rLayout of callMethod("GetLayouts", t_rComponent).toArray()) {
  if (lingoBinary("eq", callMethod("getEvent", t_rLayout), callNamed("string", a_kEvent))) {
  t_bfound = 1;
  break;
  }

  }

  if (t_bfound) {
  break;
  }

  }

  if ((lingoTruthy(t_bfound) ? 0 : 1)) {
  return 0;
  }

  if (callNamed("objectp", meProp(_me, "m_rActiveComponent"))) {
  callMethod("showAsActive", meProp(_me, "m_rActiveComponent"), 0)
  callMethod("render", meProp(_me, "m_rActiveComponent"), meProp(_me, "m_rWriter"))
  }

  setMeProp(_me, "m_rActiveComponent", t_rComponent);
  callMethod("showAsActive", meProp(_me, "m_rActiveComponent"), 1)
  if (callNamed("objectp", meProp(_me, "m_rActive"))) {
  callMethod("inActivate", meProp(_me, "m_rActive"))
  callMethod("render", meProp(_me, "m_rActive"), meProp(_me, "m_rWriter"))
  }

  callMethod("Activate", t_rLayout)
  setMeProp(_me, "m_rActive", t_rLayout);
  return 1;
}

