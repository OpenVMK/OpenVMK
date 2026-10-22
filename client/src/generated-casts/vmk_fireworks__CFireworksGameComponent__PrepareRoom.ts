// vmk_fireworks.cct / CFireworksGameComponent / PrepareRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrepareRoom(_me: LingoMe) {
  callNamed("put", "CFireworksGameComponent::PrepareRoom - begin")
  callNamed("executeMessage", symbol("MinigameState"), symbol("running"))
  callMethod("DisableFireworks", callMethod("getComponent", callNamed("getThread", "FireworksPreShow")))
  callMethod("DisableTimerWindow", callMethod("getInterface", callNamed("getThread", "FireworksPreShow")))
  callMethod("PrepareRoom", callMethod("getInterface", _me))
  setMeProp(_me, "m_stage", callNamed("createObject", symbol("random"), "CFireworksStage"));
  if (callNamed("voidp", meProp(_me, "m_stage"))) {
  return callNamed("error", _me, "Unable to create stage.", symbol("construct"));
  }

  setMeProp(_me, "m_maskMember", undefined);
  setMeProp(_me, "m_maskSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_maskSprite"), "locZ", -float(102));
  setThePropOf(meProp(_me, "m_maskSprite"), "loc", callNamed("point", 0, 0));
  setThePropOf(meProp(_me, "m_maskSprite"), "member", meProp(_me, "m_maskMember"));
  setMeProp(_me, "m_selectorMember", undefined);
  setMeProp(_me, "m_selectorSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_selectorSprite"), "locZ", -float(101));
  setThePropOf(meProp(_me, "m_selectorSprite"), "loc", callNamed("point", 0, 0));
  setThePropOf(meProp(_me, "m_selectorSprite"), "member", meProp(_me, "m_selectorMember"));
  setMeProp(_me, "m_flashMember", undefined);
  setMeProp(_me, "m_flashSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_flashSprite"), "locZ", -float(100));
  setThePropOf(meProp(_me, "m_flashSprite"), "loc", callNamed("point", 0, 0));
  setThePropOf(meProp(_me, "m_flashSprite"), "ink", 33);
  setThePropOf(meProp(_me, "m_flashSprite"), "blendLevel", 50);
  setThePropOf(meProp(_me, "m_flashSprite"), "member", meProp(_me, "m_flashMember"));
  var tWriterStyle = callNamed("getStructVariable", "struct.font.plain");
  callMethod("setaProp", tWriterStyle, symbol("color"), callNamed("rgb", "#EFEFFE"))
  callMethod("setaProp", tWriterStyle, symbol("bgColor"), callNamed("rgb", "#000000"))
  callMethod("setaProp", tWriterStyle, symbol("fixedLineSpace"), 20)
  callMethod("setaProp", tWriterStyle, symbol("lineHeight"), 20)
  callMethod("setaProp", tWriterStyle, symbol("fontSize"), 20)
  callMethod("setaProp", tWriterStyle, symbol("font"), "Folio BoldCondensed *")
  callMethod("setaProp", tWriterStyle, symbol("alignment"), symbol("center"))
  setMeProp(_me, "m_sWriterName", "fireworks_writer");
  callNamed("createWriter", meProp(_me, "m_sWriterName"))
  callMethod("Define", callNamed("getWriter", meProp(_me, "m_sWriterName")), tWriterStyle)
  setMeProp(_me, "m_rWriterSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_rWriterSprite"), "member", callNamed("member", "writer.bitmap"));
  setThePropOf(meProp(_me, "m_rWriterSprite"), "ink", 36);
  setThePropOf(meProp(_me, "m_rWriterSprite"), "loc", callNamed("point", lingoBinary("div", theProperty("stage").image.width, 2), lingoBinary("sub", lingoBinary("div", theProperty("stage").image.height, 2), 50)));
  setThePropOf(meProp(_me, "m_rWriterSprite"), "locZ", -float(25));
  setThePropOf(meProp(_me, "m_rWriterSprite"), "width", meProp(_me, "m_rWriterSprite").member.image.width);
  setThePropOf(meProp(_me, "m_rWriterSprite"), "height", meProp(_me, "m_rWriterSprite").member.image.height);
  callNamed("executeMessage", symbol("stop_Music"))
  setMeProp(_me, "m_rSoundPlayer", callNamed("createObject", "FireworksSoundPlayer", "CFireworksGameSoundPlayer"));
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("InitGame"))
  callNamed("executeMessage", symbol("room_switch"), "fireworks")
  callNamed("puppetTempo", 18)
  setMeProp(_me, "m_prepared", 1);
  callNamed("DisableHighScore")
  if (callNamed("connectionExists", callNamed("getVariable", "main.connection.id", "VMK"))) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 580)
  }

  callNamed("put", "CFireworksGameComponent::PrepareRoom - end")
}

