// vmk_pirates_minigame.cct / CPiratesVisualizerBase / setCollisionVisualization

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setCollisionVisualization(_me: LingoMe, a_bVal: LingoValue) {
  if (a_bVal) {
  setMeProp(_me, "m_mp_csVis", new LingoPropList([symbol("on"), 1, symbol("vis"), new LingoPropList([])]));
  switch (callMethod("GetParam", callMethod("getObject", _me), "BoundsType")) {
case symbol("point"):
  break;
case symbol("circle"):
  callMethod("addProp", meProp(_me, "m_mp_csVis").vis, symbol("sprite"), callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))))
  var tBoundSize = callMethod("GetParam", callMethod("getObject", _me), "BoundingCircleRadius");
  var tImg = callNamed("image", lingoBinary("div", tBoundSize, 50), lingoBinary("div", tBoundSize, 100), 32);
  callMethod("fill", tImg, tImg.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("lineSize"), 1, symbol("color"), callNamed("rgb", 0, 0, 0), symbol("bgColor"), callNamed("rgb", 0, 0, 0)]))
  callMethod("fill", tImg, tImg.rect, new LingoPropList([symbol("shapeType"), symbol("oval"), symbol("lineSize"), 1, symbol("color"), callNamed("rgb", 0, 255, 255), symbol("bgColor"), callNamed("rgb", 0, 255, 255)]))
  var tmember = callNamed("member", callNamed("createMember", lingoBinary("join", "collisionVis", callNamed("string", theProperty("milliSeconds"))), symbol("bitmap")));
  setThePropOf(tmember, "image", tImg);
  setThePropOf(meProp(_me, "m_mp_csVis").vis.sprite, "member", tmember);
  break;
case symbol("triplecircle"):
  callMethod("addProp", meProp(_me, "m_mp_csVis").vis, symbol("sprites"), new LingoList([]))
  callMethod("append", meProp(_me, "m_mp_csVis").vis.sprites, callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))))
  callMethod("append", meProp(_me, "m_mp_csVis").vis.sprites, callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))))
  callMethod("append", meProp(_me, "m_mp_csVis").vis.sprites, callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))))
  tBoundSize = callMethod("GetParam", callMethod("getObject", _me), "1stRadius");
  tImg = callNamed("image", lingoBinary("div", tBoundSize, 50), lingoBinary("div", tBoundSize, 100), 32);
  callMethod("fill", tImg, tImg.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("lineSize"), 1, symbol("color"), callNamed("rgb", 0, 0, 0), symbol("bgColor"), callNamed("rgb", 0, 0, 0)]))
  callMethod("fill", tImg, tImg.rect, new LingoPropList([symbol("shapeType"), symbol("oval"), symbol("lineSize"), 1, symbol("color"), callNamed("rgb", 0, 255, 255), symbol("bgColor"), callNamed("rgb", 0, 255, 255)]))
  tmember = callNamed("member", callNamed("createMember", lingoBinary("join", "collisionVis1", callNamed("string", theProperty("milliSeconds"))), symbol("bitmap")));
  setThePropOf(tmember, "image", tImg);
  setThePropOf(meProp(_me, "m_mp_csVis").vis.sprites[1], "member", tmember);
  tBoundSize = callMethod("GetParam", callMethod("getObject", _me), "2ndRadius");
  tImg = callNamed("image", lingoBinary("div", tBoundSize, 50), lingoBinary("div", tBoundSize, 100), 32);
  callMethod("fill", tImg, tImg.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("lineSize"), 1, symbol("color"), callNamed("rgb", 0, 0, 0), symbol("bgColor"), callNamed("rgb", 0, 0, 0)]))
  callMethod("fill", tImg, tImg.rect, new LingoPropList([symbol("shapeType"), symbol("oval"), symbol("lineSize"), 1, symbol("color"), callNamed("rgb", 0, 255, 255), symbol("bgColor"), callNamed("rgb", 0, 255, 255)]))
  tmember = callNamed("member", callNamed("createMember", lingoBinary("join", "collisionVis2", callNamed("string", theProperty("milliSeconds"))), symbol("bitmap")));
  setThePropOf(tmember, "image", tImg);
  setThePropOf(meProp(_me, "m_mp_csVis").vis.sprites[2], "member", tmember);
  tBoundSize = callMethod("GetParam", callMethod("getObject", _me), "3rdRadius");
  tImg = callNamed("image", lingoBinary("div", tBoundSize, 50), lingoBinary("div", tBoundSize, 100), 32);
  callMethod("fill", tImg, tImg.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("lineSize"), 1, symbol("color"), callNamed("rgb", 0, 0, 0), symbol("bgColor"), callNamed("rgb", 0, 0, 0)]))
  callMethod("fill", tImg, tImg.rect, new LingoPropList([symbol("shapeType"), symbol("oval"), symbol("lineSize"), 1, symbol("color"), callNamed("rgb", 0, 255, 255), symbol("bgColor"), callNamed("rgb", 0, 255, 255)]))
  tmember = callNamed("member", callNamed("createMember", lingoBinary("join", "collisionVis3", callNamed("string", theProperty("milliSeconds"))), symbol("bitmap")));
  setThePropOf(tmember, "image", tImg);
  setThePropOf(meProp(_me, "m_mp_csVis").vis.sprites[3], "member", tmember);
  break;
case symbol("box"):
  callMethod("addProp", meProp(_me, "m_mp_csVis").vis, symbol("sprite"), callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))))
  var tBoundDimensions = callMethod("GetParam", callMethod("getObject", _me), "BoxDimensions");
  break;
  }

  } else {
  if (meProp(_me, "m_mp_csVis").on) {
  switch (callMethod("GetParam", callMethod("getObject", _me), "BoundsType")) {
case symbol("point"):
  break;
case symbol("circle"):
  callNamed("removeMember", meProp(_me, "m_mp_csVis").vis.sprite.member.name)
  callNamed("releaseSprite", meProp(_me, "m_mp_csVis").vis.sprite.spriteNum)
  break;
case symbol("triplecircle"):
  callNamed("removeMember", meProp(_me, "m_mp_csVis").vis.sprites[1].member.name)
  callNamed("removeMember", meProp(_me, "m_mp_csVis").vis.sprites[2].member.name)
  callNamed("removeMember", meProp(_me, "m_mp_csVis").vis.sprites[3].member.name)
  callNamed("releaseSprite", meProp(_me, "m_mp_csVis").vis.sprites[1].spriteNum)
  callNamed("releaseSprite", meProp(_me, "m_mp_csVis").vis.sprites[2].spriteNum)
  callNamed("releaseSprite", meProp(_me, "m_mp_csVis").vis.sprites[3].spriteNum)
  break;
case symbol("box"):
  callNamed("removeMember", meProp(_me, "m_mp_csVis").vis.sprite.member.name)
  callNamed("releaseSprite", meProp(_me, "m_mp_csVis").vis.sprite.spriteNum)
  break;
  }

  setMeProp(_me, "m_mp_csVis", new LingoPropList([symbol("on"), 0]));
  }

  }

}

