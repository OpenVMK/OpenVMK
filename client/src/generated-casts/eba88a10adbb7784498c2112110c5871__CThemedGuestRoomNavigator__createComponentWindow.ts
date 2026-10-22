// eba88a10adbb7784498c2112110c5871.cct / CThemedGuestRoomNavigator / createComponentWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createComponentWindow(_me: LingoMe, a_mpSpaceList: LingoValue) {
  var t_ar_componentsPage = new LingoPropList(["nav.roomlist", new LingoList(["component.guestroomnavi.roomlist.title.xml", "component.guestroomnavi.roomlist.xml"])]);
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (callNamed("windowExists", meProp(_me, "m_sWindowTitle"))) {
  for (var i = 1; i <= t_ar_componentsPage.count; ++i) {
  var t_sElemName = callMethod("getPropAt", t_ar_componentsPage, i);
  var t_ar_components = t_ar_componentsPage[i];
  var t_rClientElement = callMethod("getElement", tWndObj, t_sElemName);
  var t_rComponentsPage = callNamed("createObject", callNamed("getUniqueID"), "CUIComponentPage");
  callMethod("setSize", t_rComponentsPage, t_rClientElement.pOwnW, t_rClientElement.pOwnH)
  callMethod("setColor", t_rComponentsPage, callNamed("rgb", "#001F56"))
  var t_rComponent = callMethod("addComponent", t_rComponentsPage, t_ar_components[1]);
  callMethod("setClickable", t_rComponent, 0)
  for (var j = 1; j <= a_mpSpaceList.count; ++j) {
  t_rComponent = callMethod("addComponent", t_rComponentsPage, t_ar_components[2]);
  callMethod("setText", callMethod("GetLayout", t_rComponent, 1), a_mpSpaceList[j]["Name"])
  if (lingoBinary("or", lingoBinary("eq", a_mpSpaceList[j]["friendOnly"], 2), lingoBinary("eq", a_mpSpaceList[j]["friendOnly"], 3))) {
  callMethod("setIcon", callMethod("GetLayout", t_rComponent, 1), "icon.fastpass")
  }

  var t_iQueue = lingoBinary("sub", a_mpSpaceList[j]["UserCount"], a_mpSpaceList[j]["MaxUsers"]);
  if (lingoBinary("gt", t_iQueue, 0)) {
  callMethod("setText", callMethod("GetLayout", t_rComponent, 2), callNamed("string", a_mpSpaceList[j]["MaxUsers"]))
  callMethod("setText", callMethod("GetLayout", t_rComponent, 3), callNamed("string", t_iQueue))
  } else {
  callMethod("setText", callMethod("GetLayout", t_rComponent, 2), callNamed("string", a_mpSpaceList[j]["UserCount"]))
  callMethod("setText", callMethod("GetLayout", t_rComponent, 3), "-")
  }

  var t_clrText = callNamed("rgb", 250, 250, 250);
  if ((lingoTruthy(a_mpSpaceList[j]["AccesFromNavi"]) ? 0 : 1)) {
  t_clrText = callNamed("rgb", 250, 10, 50);
  } else {
  switch (a_mpSpaceList[j]["friendOnly"]) {
case 1:
  t_clrText = callNamed("rgb", "#99EE3C");
  break;
case 2:
  t_clrText = callNamed("rgb", "#FFFF25");
  break;
case 3:
  t_clrText = callNamed("rgb", "#FF6CFF");
  break;
  }

  }

  callMethod("setNode", callMethod("GetLayout", t_rComponent, 1), a_mpSpaceList[j])
  callMethod("setNode", callMethod("GetLayout", t_rComponent, 2), a_mpSpaceList[j])
  callMethod("setNode", callMethod("GetLayout", t_rComponent, 3), a_mpSpaceList[j])
  callMethod("SetTextColor", callMethod("GetLayout", t_rComponent, 1), t_clrText)
  callMethod("SetTextColor", callMethod("GetLayout", t_rComponent, 2), t_clrText)
  callMethod("SetTextColor", callMethod("GetLayout", t_rComponent, 3), t_clrText)
  }

  var t_rImg = callMethod("render", t_rComponentsPage);
  callMethod("feedImage", t_rClientElement, t_rImg)
  meProp(_me, "m_ar_components")[t_sElemName] = t_rComponentsPage;
  }

  }

}

