-- Movie Script
property m_sClientID
property m_sWindowTitle
property m_ElemID
property m_fillColor
property m_pImage
property m_iActive
property m_pSongs
property m_iLineHeight
property m_width
property m_height

on construct me
  m_sClientID = EMPTY
  m_sWindowTitle = EMPTY
  m_ElemID = EMPTY
  m_fillColor = rgb("#001F55")
  m_pImage = image(0, 0, 32)
  m_iActive = 0
  m_pSongs = []
  m_iLineHeight = 15
  m_width = 0
  m_height = 0
  return 1
end
on deconstruct me
end
on Init me, t_sClientID, t_sWindowTitle, t_ElemID
  m_sClientID = t_sClientID
  m_sWindowTitle = t_sWindowTitle
  m_ElemID = t_ElemID
  m_iActive = 0
  tElem = getWindow(t_sWindowTitle).getElement(t_ElemID)
  if not voidp(tElem.ancestor.getaProp(#pImage)) then
    m_width = tElem.pImage.width
    m_height = tElem.pImage.height
    m_pImage = me.getImage()
    me.render(1)
    t_sprite = tElem.getProperty(#sprite)
    if not voidp(t_sprite) then
      setEventBroker(t_sprite.spriteNum, me.getID())
      t_sprite.registerProcedure(#eventProcInternal, me.getID(), #mouseUp)
    end if
  end if
end
on setSongList me, t_ar_Songs
  m_pSongs = []
  repeat with song in t_ar_Songs
    t_Song = createObject(#random, "CMusicPlayerSongListItem")
    t_Song.setText(song.name)
    t_Song.setID(song.id)
    m_pSongs.append(t_Song)
  end repeat
end
on render me, updateAll
  m_pImage.fill(m_pImage.rect, [#color: m_fillColor])
  repeat with song in m_pSongs
    if updateAll then
      song.m_bUpdate = 1
    end if
    song.render()
  end repeat
  repeat with i = 1 to m_pSongs.count
    tY = m_iLineHeight * (i - 1)
    tImg = m_pSongs[i].getImage()
    m_pImage.copyPixels(tImg, tImg.rect + rect(0, tY, 0, tY), tImg.rect)
  end repeat
  tWndObj = getWindow(m_sWindowTitle)
  if tWndObj <> 0 then
    tElem = tWndObj.getElement(m_ElemID)
    if tElem <> 0 then
      tElem.feedImage(m_pImage)
    end if
  end if
end
on getImage me
  m_iLineHeight = integer(m_height / 4.0 + 0.5)
  t_Img = image(m_width, m_height, 32)
  t_Img.fill(t_Img.rect, [#color: m_fillColor])
  t_rect = rect(0, 0, m_width, m_iLineHeight)
  return t_Img
end
on reset me
  m_iActive = 0
  repeat with song in m_pSongs
    song.reset()
  end repeat
  m_pImage.fill(m_pImage.rect, [#color: m_fillColor])
end
on SetSelected me, i
  m_iActive = i
end
on GetSelected me
  return m_iActive
end
on getSelectedSong me
  if m_iActive <> 0 then
    return m_pSongs[m_iActive]
  else
    return 0
  end if
end
on eventProcInternal me, tEvent, tElemID, tParm
  tX = 0
  tY = 0
  tClickedLine = 0
  tElem = getWindow(m_sWindowTitle).getElement(m_ElemID)
  t_sprite = tElem.getProperty(#sprite)
  passEvent = 1
  eventReceiver = #eventProcSongList
  tObject = getObjectManager().get(m_sClientID)
  tOffset = point(0, 0)
  if not voidp(t_sprite) then
    tX = _mouse.clickLoc.locH - t_sprite.locH + tOffset.locH
    tY = _mouse.clickLoc.locV - t_sprite.locV + tOffset.locV
    tClickedLine = integer(tY / m_iLineHeight + 0.5)
  end if
  if tObject = 0 then
    passEvent = 0
  else
    if tObject.handlers().getOne(eventReceiver) = 0 then
      passEvent = 0
    end if
  end if
  if tEvent = #mouseUp then
    if tClickedLine <= m_pSongs.count then
      if tClickedLine <> 0 and tClickedLine <> m_iActive then
        executeMessage("PlayInterfaceSound", "UI-click")
        if m_iActive <> 0 then
          m_pSongs[m_iActive].deactivate()
        end if
        m_iActive = tClickedLine
        m_pSongs[m_iActive].Activate()
        me.render()
        if passEvent then
          call(eventReceiver, tObject, tEvent, m_iActive)
        end if
      end if
    end if
  end if
end