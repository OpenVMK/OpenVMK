// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomComponent / _PrepareRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _PrepareRoom(_me: LingoMe, _this: LingoValue, a_sActive: LingoValue, a_kLocalSwitch: LingoValue) {
  callMethod("_ResetProcess", _this)
  callMethod("hideLoadBar", callMethod("getInterface", _this))
  if (callNamed("objectp", meProp(_me, "m_rContext"))) {
  callNamed("error", _this, "There's already active room context!", symbol("_PrepareRoom"))
  callMethod("Remove", meProp(_me, "m_rFactory"), callMethod("GetKey", meProp(_me, "m_rContext")))
  setMeProp(_me, "m_rContext", undefined);
  }

  setMeProp(_me, "m_sActive", a_sActive);
  var t_sDoc = lingoBinary("join", lingoBinary("join", "project.", a_sActive), ".xml");
  if ((lingoTruthy(callNamed("memberExists", t_sDoc)) ? 0 : 1)) {
  return callNamed("error", _this, lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Project doc not found:", "\""), t_sDoc), "\""), symbol("_PrepareRoom"));
  }

  var t_rProjXML = callNamed("CreateXML", callNamed("getMember", t_sDoc).text);
  var t_sXML = "";
  var t_bspXML = "";
  if (callMethod("Search", t_rProjXML, "type", "PROJECT")) {
  t_sXML = callMethod("GetParam", t_rProjXML, "DOC");
  if (callNamed("voidp", t_sXML)) {
  t_sXML = "";
  }

  t_bspXML = callMethod("GetParam", t_rProjXML, "BSP");
  if (callNamed("voidp", t_bspXML)) {
  t_bspXML = "";
  }

  }

  if (lingoBinary("eq", t_sXML, "")) {
  return callNamed("error", _this, lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Invalid project doc:", "\""), t_sDoc), "\""), symbol("_PrepareRoom"));
  }

  var t_rXML = callNamed("CreateXML", callNamed("getMember", t_sXML).text);
  if ((lingoTruthy(callMethod("Search", t_rXML, "type", "ROOM")) ? 0 : 1)) {
  return callNamed("error", _this, lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Missing data in document:", "\""), "ROOM"), "\""), symbol("_PrepareRoom"));
  } else {
  setMeProp(_me, "m_rRoomXML", t_rXML);
  }

  if (lingoBinary("neq", t_bspXML, "")) {
  setMeProp(_me, "m_rRoomBSPXML", callNamed("CreateXML", callNamed("getMember", t_bspXML).text));
  } else {
  setMeProp(_me, "m_rRoomBSPXML", undefined);
  }

  setMeProp(_me, "m_rSprites", new LingoPropList([]));
  var t_rProjNode = callMethod("GetNode", t_rProjXML);
  for (var t_rLayout of t_rProjNode.child.toArray()) {
  var t_rSpriteXML = callNamed("CreateXML", callNamed("getMember", callMethod("getaProp", t_rLayout.param, "DOC")).text);
  if (callMethod("Search", t_rSpriteXML, "type", "SCORE")) {
  var t_rScore = callMethod("GetNode", t_rSpriteXML);
  for (var t_rSprite of t_rScore.child.toArray()) {
  callMethod("setaProp", meProp(_me, "m_rSprites"), callMethod("getaProp", t_rSprite.param, "ID"), t_rSprite)
  }

  }

  }

  var t_sKey = callMethod("createKey", meProp(_me, "m_rFactory"));
  if (callMethod("create", meProp(_me, "m_rFactory"), t_sKey, t_rXML)) {
  setMeProp(_me, "m_rContext", callMethod("Access", meProp(_me, "m_rFactory"), t_sKey));
  callMethod("_IndexObjects", meProp(_me, "m_rContext"))
  while (1) {
  var t_rPointer = callMethod("Search", meProp(_me, "m_rContext"), "CLASS", "pointer");
  if (callNamed("objectp", t_rPointer)) {
  callMethod("Remove", callMethod("GetOwner", t_rPointer), callMethod("GetKey", t_rPointer))
  continue;
  }

  break;
  }

  var t_rPtrXML = callNamed("CreateXML", callNamed("getMember", "room.object.pointer.xml").text);
  callMethod("Search", t_rPtrXML, "type", "NODE")
  callMethod("RemParam", t_rPtrXML, "REF")
  callMethod("create", meProp(_me, "m_rContext"), callMethod("createKey", meProp(_me, "m_rFactory")), t_rPtrXML)
  callNamed("receiveUpdate", callMethod("getID", _this))
  callNamed("executeMessage", "room_ready", meProp(_me, "m_rContext"))
  if (lingoBinary("neq", meProp(_me, "m_iVersion"), 0)) {
  var t_iVersion = callNamed("integer", callMethod("GetParam", meProp(_me, "m_rContext"), "VERSION"));
  if (lingoBinary("neq", t_iVersion, meProp(_me, "m_iVersion"))) {
  if (lingoBinary("eq", theProperty("runMode"), "Author")) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", "Room version mismatch!", "\r"), "Client:"), t_iVersion), "/"), "Server:"), meProp(_me, "m_iVersion")))
  }

  }

  }

  if (callNamed("voidp", a_kLocalSwitch)) {
  if (lingoBinary("eq", callMethod("GetQueueLength", callNamed("getObject", "RoomItemAssetManager")), 0)) {
  if (callNamed("connectionExists", callNamed("getVariable", "main.connection.id", "VMK"))) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "start")
  }

  } else {
  callMethod("delay", _this, 500, symbol("_WaitForItemsToPreloadBeforeEnteringRoom"))
  }

  } else {
  if (lingoBinary("eq", a_kLocalSwitch, symbol("localswitch"))) {
  }

  }

  } else {
  if (lingoBinary("eq", theProperty("runMode"), "Author")) {
  callNamed("error", _this, "Failed to create room context!", symbol("_PrepareRoom"))
  }

  }

}

