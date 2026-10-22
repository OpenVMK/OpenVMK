-- Movie Script
property m_rXMLDomestic

on construct this
  this.m_rXMLDomestic = CreateXML(getMember("room.object.domestic.xml").text)
  this.m_rXMLDomestic.Search("type", "NODE")
  setVariable("room.class.factor.domestic", "[" & QUOTE & "CRoomWorker" & QUOTE & ", " & QUOTE & "CRoomFactorDomestic" & QUOTE & "]")
  setVariable("room.class.visual.domestic", "[" & QUOTE & "CRoomWorker" & QUOTE & ", " & QUOTE & "CRoomAnchor" & QUOTE & ", " & QUOTE & "CRoomVisualDomestic" & QUOTE & "]")
  this.regMsgList(1)
end
on deconstruct this
end
on handle_createpet this, tMsg
  tCon = tMsg.connection
  t_rContext = getThread("room").getComponent()._AccessRoom()
  t_iID = tCon.GetIntFrom()
  t_iType = tCon.GetIntFrom()
  t_iDir = tCon.GetIntFrom()
  t_sName = tCon.GetStrFrom()
  t_iTile = tCon.GetIntFrom()
  t_iAct = tCon.GetIntFrom()
  tXml = this.m_rXMLDomestic
  tXml.SetParam("REF", string(t_iID))
  tXml.SetParam("NAME", t_sName)
  tXml.SetParam("TYPE", string(t_iType))
  tXml.SetParam("DIR", string(t_iDir))
  tXml.SetParam("ACT", string(t_iAct))
  if t_rContext._CreateIndexed(t_iID, "domestic", tXml) then
    t_rObj = t_rContext._AccessIndexed(t_iID, "domestic")
    t_rObj.GetVisual().CreateSprites()
    t_rTile = t_rContext._AccessIndexed(t_iTile, "tile")
    if objectp(t_rTile) then
      t_iStack = 0
      t_rCopy = t_rTile
      repeat while 1
        if t_rCopy.GetCount() > 0 then
          t_rCopy = t_rCopy[1]
          t_iStack = t_iStack + 1
          next repeat
        end if
        exit repeat
      end repeat
      t_rObj.GetFactor().SetToTileStack(t_rTile, t_iStack)
    end if
  end if
end
on handle_removepet this, tMsg
  getThread("room").getComponent()._AccessRoom()._RemoveIndexed(tMsg.connection.GetIntFrom(), "domestic")
end
on handle_petstatus this, tMsg
  tCon = tMsg.connection
  t_rContext = getThread("room").getComponent()._AccessRoom()
  t_iRef = tCon.GetIntFrom()
  t_bMoveUpdate = tCon.GetIntFrom()
  t_iTile = tCon.GetIntFrom()
  t_iDir = tCon.GetIntFrom()
  t_iAct = tCon.GetIntFrom()
  t_rObj = t_rContext._AccessIndexed(t_iRef, "domestic")
  if objectp(t_rObj) then
    t_rObj.SetParam("DIR", string(t_iDir))
    t_rObj.SetParam("ACT", string(t_iAct))
    t_rTile = t_rContext._AccessIndexed(t_iTile, "tile")
    if objectp(t_rTile) then
      t_iStack = 0
      t_rCopy = t_rTile
      repeat while 1
        if t_rCopy.GetCount() > 0 then
          t_rCopy = t_rCopy[1]
          t_iStack = t_iStack + 1
          next repeat
        end if
        exit repeat
      end repeat
      if not t_bMoveUpdate then
        t_rObj.GetFactor().WalkToTile(t_rTile, t_iStack)
      else
        t_rObj.GetFactor().SetToTileStack(t_rTile, t_iStack)
      end if
    end if
  end if
end
on handle_petchat this, tMsg
  tCon = tMsg.connection
  t_rContext = getThread("room").getComponent()._AccessRoom()
  t_iRef = tCon.GetIntFrom()
  t_sMsg = tCon.GetStrFrom()
  t_rObj = t_rContext._AccessIndexed(t_iRef, "domestic")
  if objectp(t_rObj) then
    t_rColor = rgb(255, 90, 183)
    t_sName = t_rObj.GetParam("NAME")
    t_veLoc = t_rObj.GetScrPos()
    executeMessage(#chat, [#message: t_sMsg, #mode: #say, #name: t_sName, #color: t_rColor, #loc: t_veLoc])
  end if
end
on regMsgList this, tBool
  trace("regMsgList()")
  tMsgs = [:]
  tMsgs.setaProp(3000, #handle_createpet)
  tMsgs.setaProp(3001, #handle_petstatus)
  tMsgs.setaProp(3002, #handle_petchat)
  tMsgs.setaProp(3003, #handle_removepet)
  tCmds = [:]
  tCmds.setaProp("CLICKPET", 3000)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), this.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), this.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), this.getID(), tCmds)
  end if
  trace("end regMsgList()")
end