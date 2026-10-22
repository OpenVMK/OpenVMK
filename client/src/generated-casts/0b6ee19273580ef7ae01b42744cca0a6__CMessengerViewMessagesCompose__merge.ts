// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewMessagesCompose / merge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function merge(_me: LingoMe, a_rWindow: LingoValue) {
  setMeProp(_me, "m_rWindow", a_rWindow);
  callMethod("merge", meProp(_me, "m_rWindow"), "vmk_mes_messages_compose.window")
  setMeProp(_me, "m_rAddressbookList", callMethod("GetAddressBook", callMethod("getInterface", _me)));
  setMeProp(_me, "m_pComposeMessage", callNamed("CreateCannedField", callMethod("getID", a_rWindow), "mes.messages.messageinput"));
  callMethod("setScrolling", meProp(_me, "m_pComposeMessage"), 1)
  callMethod("updateContent", _me)
}

