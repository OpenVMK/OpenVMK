// 3f02613936ba018480acffaf92dd883a.cct / CVMKAnimationManager / NewAnimation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function NewAnimation(_me: LingoMe, a_vWorldPos: LingoValue, a_sAnimationID: LingoValue, a_sAnimationMember: LingoValue, a_iAnimationType: LingoValue) {
  if (callNamed("voidp", a_iAnimationType)) {
  a_iAnimationType = symbol("room");
  }

  var t_rAnimationXML = undefined;
  if (lingoBinary("neq", callNamed("getMember", a_sAnimationMember), 0)) {
  var t_sAnimationContent = callNamed("getMember", a_sAnimationMember).text;
  t_rAnimationXML = callNamed("CreateXML", t_sAnimationContent);
  }

  var tProps = new LingoPropList([]);
  tProps["Reference"] = meProp(_me, "m_iRefCounter");
  tProps["WorldPosition"] = a_vWorldPos;
  tProps["spriteDefaults"] = meProp(_me, "m_ar_sriteDefaults");
  tProps["FRAMECOUNTER"] = 1;
  tProps["ANIMATIONSTATE"] = symbol("play");
  tProps["ANIMATIONID"] = a_sAnimationID;
  switch (a_iAnimationType) {
case symbol("room"):
  var tObject = callMethod("CreateRoomAnimationObject", _me, "vmkanimation", meProp(_me, "m_iRefCounter"), tProps);
  break;
case symbol("sprite"):
  tObject = callMethod("CreateSpriteAnimationObject", _me, "vmkanimation", meProp(_me, "m_iRefCounter"), tProps);
  break;
  default:
  tObject = callMethod("CreateRoomAnimationObject", _me, "vmkanimation", meProp(_me, "m_iRefCounter"), tProps);
  }

  callMethod("SetAbsPos", tObject, a_vWorldPos)
  var t_bSuccess = callMethod("parseAnimation", _me, t_rAnimationXML, tObject);
  callMethod("addProp", meProp(_me, "m_ar_rAnimations"), a_sAnimationID, tObject)
  setMeProp(_me, "m_iRefCounter", lingoBinary("add", meProp(_me, "m_iRefCounter"), 1));
  setMeProp(_me, "m_bCheckState", 1);
  return tObject;
}

