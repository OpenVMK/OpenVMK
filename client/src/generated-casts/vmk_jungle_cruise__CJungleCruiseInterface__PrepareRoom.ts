// vmk_jungle_cruise.cct / CJungleCruiseInterface / PrepareRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrepareRoom(_me: LingoMe) {
  callNamed("put", "CJungleCruiseInterface::PrepareRoom - begin")
  callNamed("executeMessage", symbol("ui_hide"))
  setMeProp(_me, "m_store", new LingoPropList([]));
  callMethod("setaProp", meProp(_me, "m_store"), "keydownscript", theProperty("keyDownScript"))
  callMethod("setaProp", meProp(_me, "m_store"), "keyupscript", theProperty("keyUpScript"))
  callMethod("setaProp", meProp(_me, "m_store"), "mousedownscript", theProperty("mouseDownScript"))
  setTheProperty("keyDownScript", "");
  setTheProperty("keyUpScript", "");
  setTheProperty("mouseDownScript", "");
  callNamed("put", "Create Camera")
  setMeProp(_me, "m_camera", callNamed("createObject", "JCCamera", "CGameCamera"));
  callMethod("SetConstraints", meProp(_me, "m_camera"), 0, 36, theProperty("stage").image.width, theProperty("stage").image.height)
  callNamed("put", "Create Feedback")
  setMeProp(_me, "m_feedback", callNamed("createObject", "JCFeedback", "CScoreFeedback"));
  callNamed("put", "Create Writer")
  var tFontPlain = callNamed("getStructVariable", "struct.font.plain");
  callMethod("setaProp", tFontPlain, symbol("color"), callNamed("rgb", "#FEFEFE"))
  callMethod("setaProp", tFontPlain, symbol("bgColor"), callNamed("rgb", "#000000"))
  callMethod("setaProp", tFontPlain, symbol("lineHeight"), 25)
  callMethod("setaProp", tFontPlain, symbol("fontSize"), 23)
  callMethod("setaProp", tFontPlain, symbol("alignment"), symbol("center"))
  callNamed("createWriter", "JCScoreDisplay", tFontPlain)
  setMeProp(_me, "m_writer", callNamed("getWriter", "JCScoreDisplay"));
  callNamed("put", "Create Interface")
  callNamed("createMember", "ScoreFloat", symbol("bitmap"))
  setMeProp(_me, "m_scoreSprite", undefined);
  setMeProp(_me, "m_exitButton", new LingoPropList([]));
  var ma_ar_hideables = new LingoList([]);
  callNamed("put", "Create Hit Test Timer")
  callNamed("createTimeout", "jc_camera_hittest", 100, symbol("CheckHits"), callMethod("getID", _me), undefined, 0)
  setMeProp(_me, "m_bAnimalsInSight", 0);
  callNamed("put", "Start Update")
  setMeProp(_me, "m_bMouseIsDown", 0);
  callNamed("receiveUpdate", callMethod("getID", _me))
  setMeProp(_me, "m_prepared", 1);
  callNamed("put", "CJungleCruiseInterface::PrepareRoom - end")
}

