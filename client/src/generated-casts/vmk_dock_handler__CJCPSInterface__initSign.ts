// vmk_dock_handler.cct / CJCPSInterface / initSign

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initSign(_me: LingoMe) {
  setMeProp(_me, "m_signUpBoard", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_signUpBoard"), "ink", 0);
  setThePropOf(meProp(_me, "m_signUpBoard"), "blend", 100);
  setThePropOf(meProp(_me, "m_signUpBoard"), "loc", callNamed("point", 168, 200));
  setThePropOf(meProp(_me, "m_signUpBoard"), "locZ", -float(40000000));
  setThePropOf(meProp(_me, "m_signUpBoard"), "member", callNamed("getMember", "dock_signup_board"));
  setThePropOf(meProp(_me, "m_signUpBoard"), "width", meProp(_me, "m_signUpBoard").member.width);
  setThePropOf(meProp(_me, "m_signUpBoard"), "height", meProp(_me, "m_signUpBoard").member.height);
  callNamed("setEventBroker", meProp(_me, "m_signUpBoard").spriteNum, "Signup")
  callMethod("registerProcedure", meProp(_me, "m_signUpBoard"), symbol("eventProcDock"), callMethod("getID", _me), symbol("mouseDown"))
  setThePropOf(meProp(_me, "m_signUpBoard"), "cursor", new LingoList([callNamed("getMember", "cursor.finger"), callNamed("getMember", "cursor.finger.mask")]));
}

