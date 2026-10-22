// vmk_monorail_mixer.cct / CMusicMixerInterface / ChangeImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ChangeImage(_me: LingoMe, a_iTrackNum: LingoValue, a_iSlot: LingoValue, a_Col: LingoValue, a_imgSample: LingoValue, a_imgSymbol: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  var t_ElemID = lingoBinary("join", lingoBinary("join", lingoBinary("join", "track_", a_iTrackNum), "_"), a_iSlot);
  if (callMethod("elementExists", tWndObj, t_ElemID)) {
  var t_Obj = callMethod("getElement", tWndObj, t_ElemID);
  var t_imgButton = a_imgSymbol;
  if ((lingoTruthy(callNamed("voidp", t_imgButton)) ? 0 : 1)) {
  var t_iWidth = t_imgButton.width;
  callMethod("feedImage", t_Obj, t_imgButton)
  callMethod("setProperty", t_Obj, symbol("width"), t_iWidth)
  callMethod("setProperty", t_Obj, symbol("blend"), 100)
  }

  if (lingoBinary("eq", callNamed("ilk", a_Col), symbol("color"))) {
  callMethod("setProperty", t_Obj, symbol("blend"), 100)
  } else {
  callMethod("setProperty", t_Obj, symbol("blend"), 0)
  }

  }

}

