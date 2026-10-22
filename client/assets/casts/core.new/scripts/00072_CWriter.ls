-- Script
property m_rMember
property m_rDefRect
property m_rTxtRect
property m_rFntStru

on construct this
  m_rDefRect = rect(0, 0, 480, 480)
  m_rTxtRect = VOID
  m_rFntStru = VOID
  m_rMember = member(getResourceManager().createMember("writer_" & getUniqueID(), #text))
  if m_rMember.number = 0 then
    return 0
  else
    m_rMember.alignment = #left
    m_rMember.wordWrap = 0
    return 1
  end if
end
on deconstruct this
  if ilk(m_rMember, #member) then
    getResourceManager().removeMember(m_rMember.name)
    m_rMember = VOID
  end if
  return 1
end
on Define this, a_rMetrics
  if not ilk(a_rMetrics, #propList) then
    return 0
  end if
  if stringp(a_rMetrics[#font]) then
    if m_rMember.font <> a_rMetrics.font then
      m_rMember.font = a_rMetrics.font
    end if
  end if
  if listp(a_rMetrics[#fontStyle]) then
    if m_rMember.fontStyle <> a_rMetrics.fontStyle then
      m_rMember.fontStyle = a_rMetrics.fontStyle
    end if
  end if
  if symbolp(a_rMetrics[#alignment]) then
    if m_rMember.alignment <> a_rMetrics.alignment then
      m_rMember.alignment = a_rMetrics.alignment
    end if
  end if
  if ilk(a_rMetrics[#color], #color) then
    if m_rMember.color <> a_rMetrics.color then
      m_rMember.color = a_rMetrics.color
    end if
  end if
  if ilk(a_rMetrics[#bgColor], #color) then
    if m_rMember.bgColor <> a_rMetrics.bgColor then
      m_rMember.bgColor = a_rMetrics.bgColor
    end if
  end if
  if integerp(a_rMetrics[#wordWrap]) then
    if m_rMember.wordWrap <> a_rMetrics.wordWrap then
      m_rMember.wordWrap = a_rMetrics.wordWrap
    end if
  end if
  if integerp(a_rMetrics[#antialias]) then
    if m_rMember.antialias <> a_rMetrics.antialias then
      m_rMember.antialias = a_rMetrics.antialias
    end if
  end if
  if integerp(a_rMetrics[#fontSize]) then
    if m_rMember.fontSize <> a_rMetrics.fontSize then
      m_rMember.fontSize = a_rMetrics.fontSize
    end if
  end if
  if integerp(a_rMetrics[#boxType]) then
    if m_rMember.boxType <> a_rMetrics.boxType then
      m_rMember.boxType = a_rMetrics.boxType
    end if
  end if
  if ilk(a_rMetrics[#rect], #rect) then
    if m_rMember.width <> a_rMetrics.rect.width then
      m_rMember.rect = a_rMetrics.rect
    end if
  end if
  if m_rMember.fixedLineSpace <> m_rMember.fontSize then
    m_rMember.fixedLineSpace = m_rMember.fontSize
  end if
  if integerp(a_rMetrics[#fixedLineSpace]) then
    t_iTopSpacing = a_rMetrics.fixedLineSpace - m_rMember.fontSize
    if m_rMember.topSpacing <> t_iTopSpacing then
      m_rMember.topSpacing = t_iTopSpacing
    end if
  end if
  m_rTxtRect = a_rMetrics[#rect]
  return 1
end
on render this, a_sText, a_rRect
  m_rMember.text = a_sText
  if a_rRect.ilk = #rect then
    if m_rMember.width <> a_rRect.width then
      m_rMember.rect = a_rRect
    end if
  else
    if voidp(m_rTxtRect) then
      t_iAlignment = m_rMember.alignment
      m_rMember.alignment = #left
      m_rMember.rect = m_rDefRect
      t_iTotal = length(line 1 of a_sText)
      t_iWidth = m_rMember.charPosToLoc(t_iTotal).locH
      t_iLineCount = a_sText.line.count
      if t_iLineCount > 1 then
        repeat with i = 2 to t_iLineCount
          t_iTotal = t_iTotal + length(line i of a_sText) + 1
          t_iNext = m_rMember.charPosToLoc(t_iTotal).locH
          if t_iNext > t_iWidth then
            t_iWidth = t_iNext
          end if
        end repeat
      end if
      t_iWidth = t_iWidth + m_rMember.fontSize
      m_rMember.rect = rect(0, 0, t_iWidth, m_rMember.height)
      m_rMember.alignment = t_iAlignment
    else
      if m_rMember.width <> m_rTxtRect.width then
        m_rMember.rect = m_rTxtRect
      end if
    end if
  end if
  return the image of m_rMember
end
on renderHTML this, a_sHtml, a_rRect
  t_rFont = this.getFont()
  m_rMember.html = a_sHtml
  if a_rRect.ilk = #rect then
    if m_rMember.width <> a_rRect.width then
      m_rMember.rect = a_rRect
    end if
  else
    if voidp(m_rTxtRect) then
      t_iAlignment = m_rMember.alignment
      m_rMember.alignment = #left
      m_rMember.rect = m_rDefRect
      t_iTotal = length(line 1 of the text of m_rMember)
      t_iWidth = m_rMember.charPosToLoc(t_iTotal).locH
      t_iLineCount = m_rMember.text.line.count
      if t_iLineCount > 1 then
        repeat with i = 2 to t_iLineCount
          t_iTotal = t_iTotal + length(line i of the text of m_rMember) + 1
          t_iNext = m_rMember.charPosToLoc(t_iTotal).locH
          if t_iNext > t_iWidth then
            t_iWidth = t_iNext
          end if
        end repeat
      end if
      t_iWidth = t_iWidth + m_rMember.fontSize
      m_rMember.rect = rect(0, 0, t_iWidth, m_rMember.height)
      m_rMember.alignment = t_iAlignment
    else
      if m_rMember.width <> m_rTxtRect.width then
        m_rMember.rect = m_rTxtRect
      end if
    end if
  end if
  this.setFont(t_rFont)
  return the image of m_rMember
end
on setFont this, a_rStruct
  if a_rStruct.ilk <> #struct then
    return error(this, "Font struct expected!", #setFont)
  end if
  if m_rMember.font <> a_rStruct.getaProp(#font) then
    m_rMember.font = a_rStruct.getaProp(#font)
  end if
  if m_rMember.fontSize <> a_rStruct.getaProp(#fontSize) then
    m_rMember.fontSize = a_rStruct.getaProp(#fontSize)
  end if
  if m_rMember.fontStyle <> a_rStruct.getaProp(#fontStyle) then
    m_rMember.fontStyle = a_rStruct.getaProp(#fontStyle)
  end if
  if m_rMember.color <> a_rStruct.getaProp(#color) then
    m_rMember.color = a_rStruct.getaProp(#color)
  end if
  if m_rMember.fixedLineSpace <> m_rMember.fontSize then
    m_rMember.fixedLineSpace = m_rMember.fontSize
  end if
  t_iLineHeight = m_rMember.fontSize + m_rMember.topSpacing
  if t_iLineHeight <> a_rStruct.getaProp(#lineHeight) then
    m_rMember.topSpacing = a_rStruct.getaProp(#lineHeight) - m_rMember.fontSize
  end if
  return 1
end
on getFont this
  if voidp(m_rFntStru) then
    m_rFntStru = getStructVariable("struct.font.empty")
  end if
  m_rFntStru.setaProp(#font, m_rMember.font)
  m_rFntStru.setaProp(#fontStyle, m_rMember.fontStyle)
  m_rFntStru.setaProp(#fontSize, m_rMember.fontSize)
  m_rFntStru.setaProp(#color, m_rMember.color)
  m_rFntStru.setaProp(#lineHeight, m_rMember.fontSize + m_rMember.topSpacing)
  return m_rFntStru
end
on setProperty this, a_kKey, a_vValue
  t_mp_list = [:]
  t_mp_list.addProp(a_kKey, a_vValue)
  this.Define(t_mp_list)
  return 1
end