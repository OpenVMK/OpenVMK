// vmk_dock_handler.cct / CJCPSInterface / ChangePage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ChangePage(_me: LingoMe, a_direction: LingoValue) {
  switch (a_direction) {
case symbol("next"):
  setMeProp(_me, "m_iCurPage", lingoBinary("add", meProp(_me, "m_iCurPage"), 1));
  break;
case symbol("previous"):
  setMeProp(_me, "m_iCurPage", lingoBinary("sub", meProp(_me, "m_iCurPage"), 1));
  break;
  }

  if (lingoBinary("gte", meProp(_me, "m_iCurPage"), meProp(_me, "m_ar_sPages").count)) {
  callMethod("hide", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sSignupWndTitle")), "button.arrownext.active"))
  setMeProp(_me, "m_iCurPage", meProp(_me, "m_ar_sPages").count);
  } else {
  callMethod("show", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sSignupWndTitle")), "button.arrownext.active"))
  }

  if (lingoBinary("lte", meProp(_me, "m_iCurPage"), 1)) {
  callMethod("hide", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sSignupWndTitle")), "button.arrowprev.active"))
  setMeProp(_me, "m_iCurPage", 1);
  } else {
  callMethod("show", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sSignupWndTitle")), "button.arrowprev.active"))
  }

  callMethod("setText", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sSignupWndTitle")), "jc.instructions.text"), callNamed("getText", meProp(_me, "m_ar_sPages")[meProp(_me, "m_iCurPage")]))
  callMethod("feedImage", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sSignupWndTitle")), "jc.instructions.image"), meProp(_me, "m_ar_rImages")[meProp(_me, "m_iCurPage")])
}

