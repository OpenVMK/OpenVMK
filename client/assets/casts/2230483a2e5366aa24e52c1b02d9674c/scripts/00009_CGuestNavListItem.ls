-- Script
on construct me
  me.m_Img = VOID
  me.m_sWriterID = "GuestNav" & getUniqueID()
  me.m_iMargin = 0
  me.m_bState = 0
  me.m_bSpecial = 0
  me.m_iType = 2
  me.m_sLand = VOID
  ResolveImage(me)
  tPlain = getStructVariable("struct.font.plain")
  tBold = getStructVariable("struct.font.bold")
  tLink = getStructVariable("struct.font.link")
  tMetrics = propList(#font, tPlain.getaProp(#font), #fontStyle, tPlain.getaProp(#fontStyle), #color, rgb(250, 250, 250), #bgColor, rgb("#001F55"), #fixedLineSpace, 15)
  createWriter(me.m_sWriterID, tMetrics)
end
on deconstruct me
  removeWriter(me.m_sWriterID)
end
on render me
  t_fillColor = rgb("#001F55")
  tWriter = getWriter(me.m_sWriterID)
  if not me.m_bVisibleInNavi then
    trace("not visible in navi")
    tWriter.setProperty(#color, rgb(250, 10, 50))
  end if
  tWriter.setProperty(#color, rgb(250, 250, 250))
  trace("setting default colour")
  if me.m_pLinkedPage["friendOnly"] = 1 then
    trace("- friends only 1")
    tWriter.setProperty(#color, rgb("#99EE3C"))
  else
    if me.m_pLinkedPage["friendOnly"] = 2 then
      trace("- friendso nly 2")
      tWriter.setProperty(#color, rgb("#FFFF25"))
    else
      if me.m_pLinkedPage["friendOnly"] = 3 then
        trace("-friendso nly 3")
        tWriter.setProperty(#color, rgb("#FF6CFF"))
      end if
    end if
  end if
  t_pImage = render(tWriter, me.m_tText)
  t_Img = duplicate(me.m_ImgBg.image)
  me.useAlpha = 0
  t_x = 60
  t_y = 0
  copyPixels(t_Img, t_pImage, rect(t_x, t_y, t_pImage.width + t_x, t_pImage.height + t_y), t_pImage.rect)
  me.m_Img = t_Img
  if not voidp(me.m_pLinkedPage) then
    if integerp(me.m_pLinkedPage["UserCount"]) then
      t_rIconImg = getMember("roomspace.indicator").image
      t_iPercent = me.m_pLinkedPage["UserCount"]
      t_iCount = 0
      if t_iPercent <= 50 and t_iPercent > 0 then
        t_iCount = 1
      else
        if t_iPercent < 100 and t_iPercent > 50 then
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
          copyPixels(t_Img, t_rIconImg, t_rIconImg.rect + [t_iLeft, 3, t_iLeft, 3], t_rIconImg.rect, propList(#ink, 0))
          t_iLeft = t_iLeft + t_rIconImg.width + 2
        end repeat
        me.m_Img = t_Img
      end if
    end if
  end if
end
on ResolveImage me
  me.m_bSpecial = 0
  if me.m_bState then
    me.m_ImgBg = getMember("field.nav.selected")
  end if
  me.m_ImgBg = getMember("field.nav.active")
end
on GetMargin me
  return the m_iMargin of me
end
on setText me, i_sText
  trace("OpenVMK Navigator:" && i_sText)
  me.m_tText = i_sText
  render(me)
end
on SetVisibleInNavi me, a_bVisible
  me.m_bVisibleInNavi = a_bVisible
end
on setState me, a_bState
  if voidp(a_bState) then
    me.m_bState = a_bState
    ResolveImage(me)
    render(me)
  end if
  me.m_bState = a_bState
  ResolveImage(me)
  render(me)
  return 1
end
on GetState me
  return the m_bState of me
end
on setLand me, a_sLand
  me.m_sLand = a_sLand
end
on setSpecial me, a_bSpecial
  me.m_bSpecial = a_bSpecial
  render(me)
end
on setLink me, a_iLink
  me.m_pLinkedPage = a_iLink
end
on GetType me
  return the m_iType of me
end
on getText me
  return the m_tText of me
end
on getLink me
  return the m_pLinkedPage of me
end
on getImage me
  return the m_Img of me
end
on getLand me
  return the m_sLand of me
end