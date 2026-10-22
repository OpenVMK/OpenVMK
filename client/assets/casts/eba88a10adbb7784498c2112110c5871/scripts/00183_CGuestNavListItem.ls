-- Script
property m_ImgBg
property m_Img
property m_sWriterID
property m_tText
property m_pLinkedPage
property m_iMargin
property m_bState
property m_bSpecial
property m_iType
property m_sLand
property m_bVisibleInNavi

on construct me
  m_Img = VOID
  m_sWriterID = "GuestNav" & getUniqueID()
  m_iMargin = 0
  m_bState = 0
  m_bSpecial = 0
  m_iType = 2
  m_sLand = VOID
  me.ResolveImage()
  tPlain = getStructVariable("struct.font.plain")
  tBold = getStructVariable("struct.font.bold")
  tLink = getStructVariable("struct.font.link")
  tMetrics = [#font: tPlain.getaProp(#font), #fontStyle: tPlain.getaProp(#fontStyle), #color: rgb(250, 250, 250), #bgColor: rgb("#001F55"), #fixedLineSpace: 15]
  createWriter(m_sWriterID, tMetrics)
end
on deconstruct me
  removeWriter(m_sWriterID)
end
on render me
  t_fillColor = rgb("#001F55")
  tWriter = getWriter(m_sWriterID)
  if not m_bVisibleInNavi then
    tWriter.setProperty(#color, rgb(250, 10, 50))
  else
    tWriter.setProperty(#color, rgb(250, 250, 250))
    if m_pLinkedPage["friendOnly"] = 1 then
      tWriter.setProperty(#color, rgb("#99EE3C"))
    else
      if m_pLinkedPage["friendOnly"] = 2 then
        tWriter.setProperty(#color, rgb("#FFFF25"))
      else
        if m_pLinkedPage["friendOnly"] = 3 then
          tWriter.setProperty(#color, rgb("#FF6CFF"))
        end if
      end if
    end if
  end if
  t_pImage = tWriter.render(m_tText)
  t_Img = m_ImgBg.image.duplicate()
  t_Img.useAlpha = 0
  t_x = 60
  t_y = 0
  t_Img.copyPixels(t_pImage, rect(t_x, t_y, t_pImage.width + t_x, t_pImage.height + t_y), t_pImage.rect)
  m_Img = t_Img
  if not voidp(m_pLinkedPage) then
    if integerp(m_pLinkedPage["UserCount"]) then
      t_rIconImg = getMember("roomspace.indicator").image
      t_iPercent = m_pLinkedPage["UserCount"]
      t_iCount = 0
      if t_iPercent > 0 and t_iPercent <= 50 then
        t_iCount = 1
      else
        if t_iPercent > 50 and t_iPercent < 100 then
          t_iCount = 2
        else
          if t_iPercent >= 100 then
            t_iCount = 3
            if t_iPercent >= 120 then
              t_rIconImg = getMember("roomspace.indicator.full").image
            end if
          end if
        end if
      end if
      if t_iCount > 0 then
        t_iLeft = 4
        repeat with i = 1 to t_iCount
          t_Img.copyPixels(t_rIconImg, t_rIconImg.rect + [t_iLeft, 3, t_iLeft, 3], t_rIconImg.rect, [#ink: 36])
          t_iLeft = t_iLeft + t_rIconImg.width + 2
        end repeat
      end if
    end if
  end if
  m_Img = t_Img
end
on ResolveImage me
  m_bSpecial = 0
  if m_bState then
    m_ImgBg = getMember("field.nav.selected")
  else
    m_ImgBg = getMember("field.nav.active")
  end if
end
on GetMargin me
  return m_iMargin
end
on setText me, i_sText
  m_tText = i_sText
  me.render()
end
on SetVisibleInNavi me, a_bVisible
  m_bVisibleInNavi = a_bVisible
end
on setState me, a_bState
  if voidp(a_bState) then
    m_bState = not m_bState
    me.ResolveImage()
    me.render()
  else
    m_bState = a_bState
    me.ResolveImage()
    me.render()
  end if
  return 1
end
on GetState me
  return m_bState
end
on setLand me, a_sLand
  m_sLand = a_sLand
end
on setSpecial me, a_bSpecial
  m_bSpecial = a_bSpecial
  me.render()
end
on setLink me, a_iLink
  m_pLinkedPage = a_iLink
end
on GetType me
  return m_iType
end
on getText me
  return m_tText
end
on getLink me
  return m_pLinkedPage
end
on getImage me
  return m_Img
end
on getLand me
  return m_sLand
end