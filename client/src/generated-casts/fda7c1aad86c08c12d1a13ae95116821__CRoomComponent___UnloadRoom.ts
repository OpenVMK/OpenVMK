// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomComponent / _UnloadRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _UnloadRoom(_me: LingoMe, _this: LingoValue, a_sActive: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rContext"))) ? 0 : 1)) {
  callNamed("error", _this, "Can't remove resources while room is active!", symbol("_UnloadRoom"))
  return;
  }

  setMeProp(_me, "m_rRoomBSPXML", undefined);
  var t_rXML = callMethod("getaProp", meProp(_me, "m_rCache"), a_sActive);
  if (callNamed("objectp", t_rXML)) {
  callMethod("GetRoot", t_rXML)
  callMethod("Search", t_rXML, "type", "FILES")
  if (callMethod("Search", t_rXML, "type", "CASTS")) {
  var t_rCasts = callMethod("GetNode", t_rXML);
  if (lingoBinary("gt", t_rCasts.child.count, 0)) {
  for (var t_rCast of t_rCasts.child.toArray()) {
  var t_sCstName = callMethod("getaProp", t_rCast.param, "URL");
  if (callNamed("castExists", t_sCstName)) {
  callNamed("RemoveCastLib", t_sCstName)
  }

  }

  }

  }

  callMethod("GetRoot", t_rXML)
  callMethod("Search", t_rXML, "type", "FILES")
  if (callMethod("Search", t_rXML, "type", "OTHER")) {
  var t_rFiles = callMethod("GetNode", t_rXML);
  if (lingoBinary("gt", t_rFiles.child.count, 0)) {
  for (var t_rFile of t_rFiles.child.toArray()) {
  var t_sMemName = callMethod("getaProp", t_rFile.param, "URL");
  if (callNamed("memberExists", t_sMemName)) {
  callNamed("removeMember", t_sMemName)
  }

  }

  }

  }

  }

}

