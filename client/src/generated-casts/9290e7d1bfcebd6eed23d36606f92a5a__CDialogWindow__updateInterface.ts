// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CDialogWindow / updateInterface

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateInterface(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_wWindowTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  var t_Elem = callMethod("getElement", tWndObj, "basic.content.text");
  if (lingoBinary("neq", t_Elem, 0)) {
  callMethod("setText", t_Elem, callMethod("getaProp", meProp(_me, "m_pTexts"), symbol("desc")))
  }

  t_Elem = callMethod("getElement", tWndObj, "basic.window.title");
  if (lingoBinary("neq", t_Elem, 0)) {
  callMethod("setText", t_Elem, callMethod("getaProp", meProp(_me, "m_pTexts"), symbol("title")))
  }

  switch (meProp(_me, "m_iType")) {
case 1:
  var btn1 = "basic.dialog1.button1";
  break;
case 2:
  btn1 = "basic.dialog.button1";
  var btn2 = "basic.dialog.button2";
  break;
case 3:
  btn1 = "basic.dialog.button1";
  btn2 = "basic.dialog.button2";
  var btn3 = "basic.dialog.button3";
  break;
  default:
  btn1 = "basic.dialog.button1";
  btn2 = "basic.dialog.button2";
  btn3 = "basic.dialog.button3";
  }

  callMethod("setButtonText", _me, btn1, callMethod("getaProp", meProp(_me, "m_pTexts"), symbol("btn1")))
  callMethod("setButtonText", _me, btn2, callMethod("getaProp", meProp(_me, "m_pTexts"), symbol("btn2")))
  callMethod("setButtonText", _me, btn3, callMethod("getaProp", meProp(_me, "m_pTexts"), symbol("btn3")))
  }

}

