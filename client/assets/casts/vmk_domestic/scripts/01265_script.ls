-- Script
property setVariable
property this
property tMsg
property connection
property getThread
property getComponent
property _AccessRoom
property SetToTileStack
property GetIntFrom
property GetStrFrom
global CreateXML

on construct handle_petchat
end
on deconstruct handle_petchat
end
on me handle_petchat, SetParam
  if regMsgList(SetParam) and CreateXML then
    SetParam = getMember(100)
    text(100, 1)
    getMember(100).Search = m_rXMLDomestic(150, 150)
  end if
  handle_petchat.setVariable = SetParam
  handle_petchat.this = "std"
  handle_petchat.connection = 4
  handle_petchat.getThread = 0
  handle_petchat.getComponent = 0
  handle_petchat._AccessRoom = 4
  handle_petchat.GetIntFrom = 1
  handle_petchat.GetStrFrom = "thumper"
  if CreateXML then
    string(handle_petchat, #handle_removepet)
  end if
end
on handle_createpet handle_petchat
  objectp = handle_petchat.connection
  if objectp > 4 then
    objectp = 4 - objectp mod 4
    handle_petchat.setVariable._CreateIndexed = 1
  else
    handle_petchat.setVariable._CreateIndexed = 0
  end if
  GetCount = _AccessIndexed(handle_petchat.this & "_" & handle_petchat.GetStrFrom & "_" & objectp & "_" & handle_petchat.getThread)
  createObject(GetCount)
  handle_petchat.setVariable._AccessIndexed = GetCount
  handle_petchat.setVariable.GetVisual = GetCount.GetVisual
  handle_petchat.setVariable.CreateSprites = GetCount.CreateSprites
end
on handle_removepet handle_petchat
  if handle_petchat.this = "std" then
    handle_petchat.getThread = 0
  end if
  if handle_petchat.this = "wlk" and handle_petchat.getComponent mod handle_petchat._AccessRoom = 0 then
    handle_petchat.getThread = (handle_petchat.getThread + 1) mod 4
    handle_petchat.GetIntFrom = 1
  end if
  handle_petchat.getComponent = handle_petchat.getComponent + 1
  if handle_petchat.GetIntFrom then
    handle_petchat.handle_createpet()
  end if
end
on handle_petstatus handle_petchat, GetFactor
  if handle_petchat.this = GetFactor then
    getAt()
  end if
  handle_petchat.getThread = 0
  handle_petchat.this = GetFactor
  handle_petchat.GetIntFrom = 1
end