// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoInterface / UpdateChoises

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateChoises(_me: LingoMe, a_iState: LingoValue, a_sWindowTitle: LingoValue) {
  var t_sWindowTitle = "";
  if (callNamed("voidp", a_sWindowTitle)) {
  t_sWindowTitle = meProp(_me, "m_sWhoEntersWindow");
  } else {
  t_sWindowTitle = a_sWindowTitle;
  }

  if ((lingoTruthy(callNamed("windowExists", t_sWindowTitle)) ? 0 : 1)) {
  return 0;
  }

  var tWndObj = callNamed("getWindow", t_sWindowTitle);
  if (callNamed("voidp", a_iState)) {
  a_iState = callMethod("getFriendsOnly", _me.component);
  }

  if (callNamed("objectp", tWndObj)) {
  switch (a_iState) {
case 0:
  var t_rElement = callMethod("getElement", tWndObj, "owner.off");
  var t_Img = callNamed("getMember", "button.radiobutton.0").image;
  callMethod("feedImage", t_rElement, t_Img)
  t_rElement = callMethod("getElement", tWndObj, "friendsonly.off");
  t_Img = callNamed("getMember", "button.radiobutton.0").image;
  callMethod("feedImage", t_rElement, t_Img)
  t_rElement = callMethod("getElement", tWndObj, "ticketpeople.off");
  t_Img = callNamed("getMember", "button.radiobutton.0").image;
  callMethod("feedImage", t_rElement, t_Img)
  t_rElement = callMethod("getElement", tWndObj, "almosteveryone.off");
  t_Img = callNamed("getMember", "button.radiobutton.0").image;
  callMethod("feedImage", t_rElement, t_Img)
  t_rElement = callMethod("getElement", tWndObj, "everyone.off");
  t_Img = callNamed("getMember", "button.radiobutton.1").image;
  callMethod("feedImage", t_rElement, t_Img)
  break;
case 1:
  t_rElement = callMethod("getElement", tWndObj, "owner.off");
  t_Img = callNamed("getMember", "button.radiobutton.0").image;
  callMethod("feedImage", t_rElement, t_Img)
  t_rElement = callMethod("getElement", tWndObj, "friendsonly.off");
  t_Img = callNamed("getMember", "button.radiobutton.1").image;
  callMethod("feedImage", t_rElement, t_Img)
  t_rElement = callMethod("getElement", tWndObj, "ticketpeople.off");
  t_Img = callNamed("getMember", "button.radiobutton.0").image;
  callMethod("feedImage", t_rElement, t_Img)
  t_rElement = callMethod("getElement", tWndObj, "almosteveryone.off");
  t_Img = callNamed("getMember", "button.radiobutton.0").image;
  callMethod("feedImage", t_rElement, t_Img)
  t_rElement = callMethod("getElement", tWndObj, "everyone.off");
  t_Img = callNamed("getMember", "button.radiobutton.0").image;
  callMethod("feedImage", t_rElement, t_Img)
  break;
case 2:
  t_rElement = callMethod("getElement", tWndObj, "owner.off");
  t_Img = callNamed("getMember", "button.radiobutton.0").image;
  callMethod("feedImage", t_rElement, t_Img)
  t_rElement = callMethod("getElement", tWndObj, "friendsonly.off");
  t_Img = callNamed("getMember", "button.radiobutton.0").image;
  callMethod("feedImage", t_rElement, t_Img)
  t_rElement = callMethod("getElement", tWndObj, "ticketpeople.off");
  t_Img = callNamed("getMember", "button.radiobutton.1").image;
  callMethod("feedImage", t_rElement, t_Img)
  t_rElement = callMethod("getElement", tWndObj, "almosteveryone.off");
  t_Img = callNamed("getMember", "button.radiobutton.0").image;
  callMethod("feedImage", t_rElement, t_Img)
  t_rElement = callMethod("getElement", tWndObj, "everyone.off");
  t_Img = callNamed("getMember", "button.radiobutton.0").image;
  callMethod("feedImage", t_rElement, t_Img)
  break;
case 3:
  t_rElement = callMethod("getElement", tWndObj, "owner.off");
  t_Img = callNamed("getMember", "button.radiobutton.0").image;
  callMethod("feedImage", t_rElement, t_Img)
  t_rElement = callMethod("getElement", tWndObj, "friendsonly.off");
  t_Img = callNamed("getMember", "button.radiobutton.0").image;
  callMethod("feedImage", t_rElement, t_Img)
  t_rElement = callMethod("getElement", tWndObj, "ticketpeople.off");
  t_Img = callNamed("getMember", "button.radiobutton.0").image;
  callMethod("feedImage", t_rElement, t_Img)
  t_rElement = callMethod("getElement", tWndObj, "almosteveryone.off");
  t_Img = callNamed("getMember", "button.radiobutton.1").image;
  callMethod("feedImage", t_rElement, t_Img)
  t_rElement = callMethod("getElement", tWndObj, "everyone.off");
  t_Img = callNamed("getMember", "button.radiobutton.0").image;
  callMethod("feedImage", t_rElement, t_Img)
  break;
case 4:
  t_rElement = callMethod("getElement", tWndObj, "owner.off");
  t_Img = callNamed("getMember", "button.radiobutton.1").image;
  callMethod("feedImage", t_rElement, t_Img)
  t_rElement = callMethod("getElement", tWndObj, "friendsonly.off");
  t_Img = callNamed("getMember", "button.radiobutton.0").image;
  callMethod("feedImage", t_rElement, t_Img)
  t_rElement = callMethod("getElement", tWndObj, "ticketpeople.off");
  t_Img = callNamed("getMember", "button.radiobutton.0").image;
  callMethod("feedImage", t_rElement, t_Img)
  t_rElement = callMethod("getElement", tWndObj, "almosteveryone.off");
  t_Img = callNamed("getMember", "button.radiobutton.0").image;
  callMethod("feedImage", t_rElement, t_Img)
  t_rElement = callMethod("getElement", tWndObj, "everyone.off");
  t_Img = callNamed("getMember", "button.radiobutton.0").image;
  callMethod("feedImage", t_rElement, t_Img)
  break;
  }

  }

}

