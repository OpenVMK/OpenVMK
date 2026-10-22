-- Script
property m_sPopupWndTitle
property m_pPlayerPopup
property m_pTextScroller
property m_pTextScrollerHolder

on construct me
  registerMessage(#room_ready, me.getID(), #enterRoom)
  registerMessage("TrainStartSong", me.getID(), #showScroller)
  registerMessage("TrainEndSong", me.getID(), #hideScroller)
  m_pTextScroller = 0
  m_pTextScrollerHolder = 0
  m_sPopupWndTitle = "VMK Music Mix Player"
  m_pPlayerPopup = 0
  return 1
end
on deconstruct me
  unregisterMessage(#room_ready, me.getID())
  unregisterMessage("TrainStartSong")
  unregisterMessage("TrainEndSong")
  if not voidp(m_pTextScroller) then
    removeObject(m_pTextScroller.getID())
  end if
  t_title = "Music Player Popup"
  if getObject(t_title) <> 0 then
    removeObject(t_title)
  end if
  if windowExists(m_sPopupWndTitle) then
    removeWindow(m_sPopupWndTitle)
  end if
  return 1
end
on createPlayer me
  t_pPlayerPopup = createObject("Music Player Popup", "CMusicPlayerPopup")
  if t_pPlayerPopup <> 0 then
    t_pPlayerPopup.Init(me.getID())
    return t_pPlayerPopup
  end if
  return 0
end
on openMusicPlayer me
  if m_pPlayerPopup = 0 then
    m_pPlayerPopup = me.createPlayer()
  end if
  if m_pPlayerPopup <> 0 then
    if me.getComponent().getPlayerState() then
      if not m_pPlayerPopup.m_bVisible then
        m_pPlayerPopup.show()
      end if
    end if
  end if
end
on enterRoom me
  if m_pTextScroller = 0 then
    m_pTextScroller = me.initTextScroller()
  end if
  if m_pTextScrollerHolder = 0 then
    m_pTextScrollerHolder = me.initTextScrollerHolder()
  end if
end
on initTextScroller me
  if getThread("TextScroller") <> 0 then
    tWidth = 127
    tHeight = 85
    tRoomContext = getThread(#room).getComponent()._AccessRoom()
    tNode = tRoomContext.Search("NAME", "display_song")
    if tNode <> 0 then
      tSprite = tNode.GetVisual().getSprite()
      if tSprite <> 0 then
        tWidth = tSprite.width
        tHeight = tSprite.height
      end if
    end if
    t_initText = getText("monorail.musicmix.game.init.scroller")
    t_pTextScroller = createTextScroller(convertToHigherCase(t_initText))
    t_pTextScroller.SetRenderer(#isometric)
    t_pTextScroller.GetRenderer().Init(me.getID(), "Digital_font2", tWidth, tHeight)
    t_pTextScroller.GetRenderer().SetOffset(point(2, 56))
    t_pTextScroller.GetRenderer().setAngle(120)
    t_pTextScroller.setVisibleCharCount(tWidth / 10)
    t_pTextScroller.m_bLoop = 0
    if getIntVariable("MonorailState") = 1 then
      t_pTextScroller.start()
    else
      executeMessage("TrainEndSong")
    end if
    return t_pTextScroller
  else
    return 0
  end if
end
on initTextScrollerHolder me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  tNode = tRoomContext.Search("NAME", "display_song")
  if tNode <> 0 then
    tSprite = tNode.GetVisual().getSprite()
    if tSprite <> 0 then
      put "Found sprite" && [tSprite, tSprite.blend, tSprite.ink, tSprite.width, tSprite.height]
      t_Img = image(tSprite.width, tSprite.height, 32)
      t_Img.fill(t_Img.rect, [#color: rgb("#000000")])
      tSprite.member.image = t_Img
      tSprite.blend = 100
      tSprite.member.regPoint = point(0, 0)
      tSprite.bgColor = rgb("#000000")
      tSprite.ink = 33
      return the member of tSprite
    end if
  end if
  return 0
end
on displayText me, t_sText
  if m_pTextScroller <> 0 then
    m_pTextScroller.resetQueue()
    m_pTextScroller.setText(convertToHigherCase(t_sText))
  end if
end
on scrollerUpdate me, t_Img
  if m_pTextScrollerHolder <> 0 then
    m_pTextScrollerHolder.image = t_Img
    m_pTextScrollerHolder.regPoint = point(0, m_pTextScrollerHolder.height)
  end if
end
on showScroller me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  tNode = tRoomContext.Search("NAME", "display_song")
  if tNode <> 0 then
    tNode.GetVisual().visible(1)
  end if
end
on hideScroller me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  tNode = tRoomContext.Search("NAME", "display_song")
  if tNode <> 0 then
    tNode.GetVisual().visible(0)
  end if
end