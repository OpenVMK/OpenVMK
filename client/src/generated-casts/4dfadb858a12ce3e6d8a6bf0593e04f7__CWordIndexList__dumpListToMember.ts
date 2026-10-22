// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CWordIndexList / dumpListToMember

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dumpListToMember(_me: LingoMe, o_member: LingoValue) {
  var t_text = "";
  for (var i = 1; i <= meProp(_me, "m_ar_list").count; ++i) {
  t_text = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", t_text, i), "\t"), meProp(_me, "m_ar_list")[i]), "\r");
  }

  setThePropOf(o_member, "text", t_text);
  callMethod("copyToClipboard", o_member)
}

