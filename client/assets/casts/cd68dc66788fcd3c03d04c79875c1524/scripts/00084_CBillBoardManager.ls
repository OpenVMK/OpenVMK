-- Behavior
property m_mp_boards
property m_iNameCounter

on construct me
  m_iNameCounter = 1
  m_mp_boards = [:]
  m_mp_boards.sort()
  return 1
end
on deconstruct me
  repeat with tBoard in m_mp_boards
  end repeat
end
on InitBillBoard me, a_mp_initialization, a_sRoomTag
  if ilk(a_mp_initialization, #propList) then
    tIdentifier = a_mp_initialization.getPropAt(1) & a_sRoomTag
    tContent = a_mp_initialization[1]
    tParamsToCallback = [#boardName: a_mp_initialization.getPropAt(1), #clickName: tContent.clickarea, #tag: a_sRoomTag]
    if voidp(m_mp_boards.getaProp(tIdentifier)) then
      if tContent.content <> EMPTY then
        tMemNum = queueDownload(tContent.content, "BillBoardExternal:" & m_iNameCounter, #bitmap, 0)
        registerDownloadCallback(tMemNum, #PushPicture, me.getID(), tParamsToCallback)
        m_mp_boards[tIdentifier] = [#state: #LOADING, #memNum: tMemNum, #space: tContent.space, #url: tContent.url, #clickSpr: VOID]
        m_iNameCounter = m_iNameCounter + 1
      end if
    else
      if m_mp_boards[tIdentifier].state = #done then
        me.PushPicture(tParamsToCallback)
      end if
    end if
  end if
end
on PushPicture me, a_mp_params
  tIdentifier = a_mp_params.boardName & a_mp_params.tag
  m_mp_boards[tIdentifier].state = #done
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  if objectp(tRoomContext) then
    tNode = tRoomContext.Search("NAME", a_mp_params.boardName)
    tNodeClick = tRoomContext.Search("NAME", a_mp_params.clickName)
    if tNode <> 0 then
      tmember = member(m_mp_boards[tIdentifier].memNum)
      if voidp(tmember) then
        return error(me, "Downloaded billboard image is missing!??", #PushPicture)
      end if
      if tmember.type <> #bitmap then
        return error(me, "Downloaded billboard image had wrong type : " & the type of tmember, #PushPicture)
      end if
      tmember.regPoint = point(0, 0)
      tSprite = tNode.GetVisual().getSprite()
      tSprite.member = tmember
      if m_mp_boards[tIdentifier].space > 0 or m_mp_boards[tIdentifier].url <> EMPTY then
        if tNodeClick <> 0 then
          tSprite = tNodeClick.GetVisual().getSprite()
          getSpriteManager().setEventBroker(tSprite.spriteNum, tIdentifier)
          tSprite.registerProcedure(#ClickPicture, me.getID(), #mouseUp)
          tSprite.cursor = [getMember("cursor.finger"), getMember("cursor.finger.mask")]
          m_mp_boards[tIdentifier].clickSpr = tSprite.spriteNum
        end if
      end if
    end if
  end if
end
on ClickPicture me, a_tEvent, a_sEventID
  tBoard = m_mp_boards.getaProp(a_sEventID)
  if not voidp(tBoard) then
    if tBoard.url <> EMPTY then
      gotoNetPage(tBoard.url, "_blank")
    end if
    if tBoard.space <> -1 then
      tMsg = [#int: tBoard.space, #int: -1]
      getConnection(getVariable("main.connection.id", "VMK")).send(31, tMsg)
    end if
  end if
end