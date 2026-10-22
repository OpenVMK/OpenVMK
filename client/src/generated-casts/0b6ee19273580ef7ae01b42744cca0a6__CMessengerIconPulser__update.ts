// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerIconPulser / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (meProp(_me, "m_bActive")) {
  var t_error = 1;
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  if (lingoBinary("gt", callMethod("count", meProp(_me, "m_pElements")), 0)) {
  var tElem = callMethod("getElement", tWndObj, meProp(_me, "m_pElements")[1].element);
  if (lingoBinary("neq", tElem, 0)) {
  t_error = 0;
  }

  }

  }

  if ((lingoTruthy(t_error) ? 0 : 1)) {
  setMeProp(_me, "m_iCounter", lingoBinary("add", meProp(_me, "m_iCounter"), meProp(_me, "m_iSpeed")));
  callMethod("copyPixels", meProp(_me, "m_gComposite"), meProp(_me, "m_gNormal"), meProp(_me, "m_gNormal").rect, meProp(_me, "m_gNormal").rect)
  var t_blend = callNamed("sin", lingoBinary("div", lingoBinary("mul", meProp(_me, "m_iCounter"), callNamed("pi")), float(180)));
  callMethod("copyPixels", meProp(_me, "m_gComposite"), meProp(_me, "m_gPressed"), meProp(_me, "m_gPressed").rect, meProp(_me, "m_gPressed").rect, new LingoPropList([symbol("blendLevel"), lingoBinary("add", lingoBinary("mul", t_blend, 127), 127)]))
  setThePropOf(tElem, "pImage", meProp(_me, "m_gComposite"));
  callMethod("render", tElem)
  }

  }

}

