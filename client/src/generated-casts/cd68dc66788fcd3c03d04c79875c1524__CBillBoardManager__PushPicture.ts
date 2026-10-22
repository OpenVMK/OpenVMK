// cd68dc66788fcd3c03d04c79875c1524.cct / CBillBoardManager / PushPicture

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PushPicture(_me: LingoMe, a_mp_params: LingoValue) {
  var tIdentifier = lingoBinary("join", a_mp_params.boardName, a_mp_params.tag);
  setThePropOf(meProp(_me, "m_mp_boards")[tIdentifier], "state", symbol("done"));
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  if (callNamed("objectp", tRoomContext)) {
  var tNode = callMethod("Search", tRoomContext, "NAME", a_mp_params.boardName);
  var tNodeClick = callMethod("Search", tRoomContext, "NAME", a_mp_params.clickName);
  if (lingoBinary("neq", tNode, 0)) {
  var tmember = callNamed("member", meProp(_me, "m_mp_boards")[tIdentifier].memNum);
  if (callNamed("voidp", tmember)) {
  return callNamed("error", _me, "Downloaded billboard image is missing!??", symbol("PushPicture"));
  }

  if (lingoBinary("neq", tmember._type, symbol("bitmap"))) {
  return callNamed("error", _me, lingoBinary("join", "Downloaded billboard image had wrong type : ", tmember._type), symbol("PushPicture"));
  }

  setThePropOf(tmember, "regPoint", callNamed("point", 0, 0));
  var tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  setThePropOf(tSprite, "member", tmember);
  if (lingoBinary("or", lingoBinary("gt", meProp(_me, "m_mp_boards")[tIdentifier].space, 0), lingoBinary("neq", meProp(_me, "m_mp_boards")[tIdentifier].url, ""))) {
  if (lingoBinary("neq", tNodeClick, 0)) {
  tSprite = callMethod("getSprite", callMethod("GetVisual", tNodeClick));
  callMethod("setEventBroker", callNamed("getSpriteManager"), tSprite.spriteNum, tIdentifier)
  callMethod("registerProcedure", tSprite, symbol("ClickPicture"), callMethod("getID", _me), symbol("mouseUp"))
  setThePropOf(tSprite, "cursor", new LingoList([callNamed("getMember", "cursor.finger"), callNamed("getMember", "cursor.finger.mask")]));
  setThePropOf(meProp(_me, "m_mp_boards")[tIdentifier], "clickSpr", tSprite.spriteNum);
  }

  }

  }

  }

}

