// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoInterface / changeView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changeView(_me: LingoMe, tView: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  var tLastView = meProp(_me, "m_currentView");
  if ((lingoTruthy(callMethod("getaProp", callMethod("getRoomDesc", callMethod("getComponent", _me)), symbol("control"))) ? 0 : 1)) {
  setMeProp(_me, "m_currentView", "vmk_popup_roominfo_visitor.window");
  if (lingoBinary("eq", tView, "vmk_popup_roominfog.window")) {
  tView = "vmk_popup_roominfo_visitor.window";
  }

  }

  if (lingoBinary("eq", tWndObj, 0)) {
  if ((lingoTruthy(callNamed("createWindow", meProp(_me, "m_windowTitle"), "vmk_popup.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Failed to open Room Info dialog!!!", symbol("changeView"));
  } else {
  tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("EventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("merge", tWndObj, meProp(_me, "m_currentView"))
  callMethod("center", tWndObj)
  }

  }

  callMethod("moveTo", tWndObj, 0, lingoBinary("sub", 575, callMethod("getProperty", tWndObj, symbol("height"))))
  callMethod("unmerge", tWndObj)
  callMethod("merge", tWndObj, tView)
  setMeProp(_me, "m_currentView", tView);
  switch (meProp(_me, "m_currentView")) {
case "vmk_popup_roominfo_visitor.window":
  var t_desc = callMethod("getRoomDesc", callMethod("getComponent", _me));
  callMethod("setText", callMethod("getElement", tWndObj, "popup.hd"), t_desc.name)
  callMethod("setText", callMethod("getElement", tWndObj, "roominfog.owner"), callMethod("getaProp", t_desc, symbol("owner")))
  callMethod("setText", callMethod("getElement", tWndObj, "roominfog.info"), t_desc.desc)
  setMeProp(_me, "m_sRoomName", t_desc.name);
  setMeProp(_me, "m_sRoomDesc", t_desc.desc);
  if (lingoBinary("eq", callMethod("getaProp", t_desc, symbol("owner")), callMethod("get", callNamed("getObject", symbol("session")), "name"))) {
  var t_iBlend = 0;
  callMethod("setButtonState", _me, "roominfo.report.button", 0)
  } else {
  t_iBlend = 100;
  callMethod("setButtonState", _me, "roominfo.report.button", 1)
  }

  break;
case "vmk_popup_roominfop.window":
  t_desc = callMethod("getRoomDesc", callMethod("getComponent", _me));
  callMethod("setText", callMethod("getElement", tWndObj, "popup.hd"), t_desc.name)
  callMethod("setText", callMethod("getElement", tWndObj, "roominfop.instance"), t_desc.instance)
  callMethod("setText", callMethod("getElement", tWndObj, "roominfop.info"), t_desc.desc)
  break;
case "vmk_popup_roominfog.window":
  t_desc = callMethod("getRoomDesc", callMethod("getComponent", _me));
  callMethod("setText", callMethod("getElement", tWndObj, "popup.hd"), t_desc.name)
  callMethod("setText", callMethod("getElement", tWndObj, "roominfog.owner"), callMethod("getaProp", t_desc, symbol("owner")))
  callMethod("setText", callMethod("getElement", tWndObj, "roominfog.info"), t_desc.desc)
  setMeProp(_me, "m_sRoomName", t_desc.name);
  setMeProp(_me, "m_sRoomDesc", t_desc.desc);
  if (lingoBinary("eq", callMethod("getaProp", t_desc, symbol("owner")), callMethod("get", callNamed("getObject", symbol("session")), "name"))) {
  t_iBlend = 0;
  callMethod("setButtonState", _me, "roominfo.report.button", 0)
  } else {
  t_iBlend = 100;
  callMethod("setButtonState", _me, "roominfo.report.button", 1)
  }

  var tElem = callMethod("getElement", tWndObj, "roominfo.report.button");
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("setProperty", tElem, symbol("blend"), t_iBlend)
  }

  if (callMethod("getaProp", t_desc, symbol("control"))) {
  t_iBlend = 100;
  callMethod("setButtonState", _me, "roominfog.furnishingmode.button", 1)
  callMethod("setButtonState", _me, "roominfog.editinfo.button", 1)
  }

  var t_ar_ElemList = new LingoList(["furnishing.checkbox.text", "friendsonly.checkbox.text", "furnishingmode.off", "roominfog.editinfo.button"]);
  for (var i = 1; i <= t_ar_ElemList.count; ++i) {
  tElem = callMethod("getElement", tWndObj, t_ar_ElemList[i]);
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("setProperty", tElem, symbol("blend"), t_iBlend)
  }

  }

  callMethod("setCheckBoxState", _me, "furnishingmode.off", callMethod("get", callNamed("getObject", symbol("session")), "room_furnish_mode"), t_iBlend)
  var tFriendsOnly = callMethod("getFriendsOnly", _me.component);
  var tText = lingoBinary("join", lingoBinary("join", callNamed("getText", "roominfog.allow.hd"), "\r"), callMethod("GetEntryStateDescription", _me, tFriendsOnly));
  callMethod("setText", callMethod("getElement", tWndObj, "roominfog.allow.hd"), tText)
  break;
  }

}

