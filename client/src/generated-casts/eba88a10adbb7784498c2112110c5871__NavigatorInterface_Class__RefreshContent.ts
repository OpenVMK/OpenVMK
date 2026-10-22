// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / RefreshContent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RefreshContent(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  if (meProp(_me, "m_merged")) {
  callMethod("unmerge", tWndObj)
  }

  setMeProp(_me, "m_merged", 0);
  switch (meProp(_me, "m_page")) {
case symbol("parkmap"):
case symbol("whatsnew"):
  callMethod("merge", tWndObj, "vmk_nav_parkmap.window")
  setMeProp(_me, "m_merged", 1);
  break;
case symbol("adventureland"):
  callMethod("merge", tWndObj, "vmk_nav_adventureland.window")
  setMeProp(_me, "m_merged", 1);
  break;
case symbol("frontierland"):
  callMethod("merge", tWndObj, "vmk_nav_frontierland.window")
  setMeProp(_me, "m_merged", 1);
  break;
case symbol("fantasyland"):
  callMethod("merge", tWndObj, "vmk_nav_fantasyland.window")
  setMeProp(_me, "m_merged", 1);
  break;
case symbol("tomorrowland"):
  callMethod("merge", tWndObj, "vmk_nav_tomorrowland.window")
  setMeProp(_me, "m_merged", 1);
  break;
case symbol("mainstreet"):
  callMethod("merge", tWndObj, "vmk_nav_mainstreet.window")
  setMeProp(_me, "m_merged", 1);
  break;
case symbol("neworleans"):
  callMethod("merge", tWndObj, "vmk_nav_neworleans.window")
  setMeProp(_me, "m_merged", 1);
  break;
  break;
  }

  if (lingoBinary("neq", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_windowTitle")), "nav.advancedmode.off"), 0)) {
  if (callMethod("get", callNamed("getObject", symbol("session")), "AdvNavigation")) {
  callMethod("feedImage", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_windowTitle")), "nav.advancedmode.off"), callNamed("getMember", "button.checkbox.1").image)
  } else {
  callMethod("feedImage", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_windowTitle")), "nav.advancedmode.off"), callNamed("getMember", "button.checkbox.0").image)
  }

  }

  for (var tElemName of callMethod("getaProp", meProp(_me, "m_mp_ar_sHighlighters"), meProp(_me, "m_page")).toArray()) {
  if (callNamed("objectp", callMethod("getElement", tWndObj, tElemName))) {
  callMethod("hide", callMethod("getElement", tWndObj, tElemName))
  }

  }

}

