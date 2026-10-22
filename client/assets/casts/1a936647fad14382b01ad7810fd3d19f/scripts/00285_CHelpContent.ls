-- Parent Script
property pMem
property pImg
property pNeedUpdate
property pLayoutImg
property pViewMem
property pwidth
property pOffset
property pHelp
property pTopic
property m_fillColor
property m_sWindowTitle

on construct me
  pHelp = VOID
  pTopic = VOID
  pwidth = 300
  pNeedUpdate = 1
  pOffset = point(0, 0)
  m_sWindowTitle = EMPTY
  return 1
end
on deconstruct me
  pMem.erase()
  pViewMem.erase()
end
on setWindowTitle me, i_WindowTitle
  m_sWindowTitle = i_WindowTitle
end
on setup me, _help, _width
  pHelp = _help
  if not voidp(_width) then
    pwidth = _width
  end if
  pMem = new(#text, castLib("bin"))
  pMem.name = "HELPCONTENT.content"
  pMem.font = "Arial"
  pMem.wordWrap = 1
  pMem.rect = rect(0, 0, pwidth, 200)
  pMem.fontStyle = [#plain]
  pMem.fontSize = 12
  pMem.antialias = 1
  pMem.color = rgb(255, 255, 255)
  pViewMem = new(#text, castLib("bin"))
  pViewMem.name = "HELPCONTENT.view"
  pViewMem.font = "Arial"
  pViewMem.wordWrap = 1
  pViewMem.rect = rect(0, 0, pwidth, 200)
  pViewMem.fontStyle = [#plain]
  pViewMem.fontSize = 12
  pViewMem.antialias = 1
  pViewMem.useHypertextStyles = 0
  pViewMem.color = rgb(255, 255, 255)
  pImg = pMem.image.duplicate()
  pLayoutImg = image(300, 300, 32)
  m_fillColor = rgb("#001f55")
end
on setTopic me, _topic
  pTopic = _topic
end
on setText me, _text
  pViewMem.text = EMPTY
  pMem.text = _text
  pImg = pMem.image.duplicate()
  pLayoutImg.fill(pLayoutImg.rect, [#shapeType: #rect, #color: m_fillColor])
  me.parseContent()
end
on getText me
  return the text of pMem
end
on getImage me
  return pLayoutImg
end
on render me, g
  tW = pImg.rect.width
  tH = pImg.rect.height
  g.copyPixels(pImg, rect(pOffset[1] + 310, pOffset[2], pOffset[1] + tW + 310, pOffset[2] + tH), pImg.rect)
  tW = pLayoutImg.rect.width
  tH = pLayoutImg.rect.height
  g.copyPixels(pLayoutImg, rect(pOffset[1], pOffset[2], pOffset[1] + tW, pOffset[2] + tH), pLayoutImg.rect)
end
on parseContent me
  xmlDoc = "<?xml version=" & QUOTE & "1.0" & QUOTE & "?>" & RETURN
  xmlDoc = xmlDoc & "<CONTENT>" & RETURN & pMem.text & RETURN & "</CONTENT>"
  viewHtml = "<HTML><HEAD><TITLE></TITLE></HEAD><BODY>" & RETURN
  t_fontStyle = "<FONT FACE=" & QUOTE & "Arial" & QUOTE & " SIZE=3 COLOR=" & QUOTE & "#FFFFFF" & QUOTE & ">"
  if xmlDoc.ilk = #string then
    if xmlDoc.length then
      XmlParser = script("xml.parser").new()
      XmlParser.parseString(xmlDoc)
      objects = XmlParser.child[1]
      numObjs = objects.child.count
      ballList = []
      repeat with node in objects.child
        if node.type = #chardata then
          t_insertHtml = replaceChunks(node.text, "\r", "<BR>")
          viewHtml = viewHtml & t_fontStyle & t_insertHtml & "</FONT><BR>" & RETURN
          next repeat
        end if
        if node.type = #element then
          if node.name = "link" then
            t_error = 0
            linkdata = "<A HREF=" & QUOTE
            if node.attributeName.getOne("help") > 0 then
              linkdata = linkdata & "#" & node.attributeValue.getaProp("help")
            else
              if node.attributeName.getOne("href") > 0 then
                linkdata = linkdata & node.attributeValue.getaProp("href")
              else
                t_error = 1
              end if
            end if
            if not t_error then
              linkdata = linkdata & QUOTE & ">" & node.child[1].text & "</A>"
              viewHtml = viewHtml & linkdata
            end if
          end if
          if node.name = "image" then
            t_error = 0
            imgdata = "<IMG SRC=" & QUOTE
            if node.attributeName.getOne("id") > 0 then
              t_ImgMem = member(node.attributeValue.getaProp("id"))
              if t_ImgMem.memberNum > 0 then
                imgdata = imgdata & node.attributeValue.id & QUOTE & ">"
                pViewMem.html = viewHtml
                t_y = pViewMem.image.height
                t_x = pwidth / 2 - t_ImgMem.image.width / 2
                t_offset = rect(t_x, t_y, t_x, t_y)
                pLayoutImg.copyPixels(t_ImgMem.image, t_ImgMem.rect + t_offset, t_ImgMem.rect)
                t_lines = t_ImgMem.image.height / (pViewMem.fontSize + 0)
                repeat with i = 1 to t_lines + 1
                  viewHtml = viewHtml & "<br>"
                end repeat
              else
                t_error = 1
              end if
            end if
          end if
          next repeat
        end if
        put "Help-xml, unknown node-type" && node.type
      end repeat
    end if
  end if
  if not voidp(pTopic) then
    t_error = 1
    tWndObj = getWindow(m_sWindowTitle)
    if tWndObj <> 0 then
      t_next = tWndObj.getElement("hlp.nextpage.button")
      t_prev = tWndObj.getElement("hlp.previouspage.button")
      if t_next <> 0 and t_prev <> 0 then
        t_error = 0
      end if
    end if
    pages = pTopic.pages
    activePage = pTopic.activePage
    if not t_error then
      if activePage > 1 then
        me.setButtonState("hlp.previouspage.button", 1)
      else
        me.setButtonState("hlp.previouspage.button", 0)
      end if
      if activePage < pages.count then
        me.setButtonState("hlp.nextpage.button", 1)
      else
        me.setButtonState("hlp.nextpage.button", 0)
      end if
    else
      viewHtml = viewHtml & RETURN & "<HR><table border=0><tr>"
      if activePage > 1 then
        viewHtml = viewHtml & RETURN & "<td align=left><A HREF=" & QUOTE & "#previous" & QUOTE & ">Previous page</A></td>"
      else
        viewHtml = viewHtml & RETURN & "<td align=left>&nbsp;</td>"
      end if
      if activePage < pages.count then
        viewHtml = viewHtml & RETURN & "<td align=right><A HREF=" & QUOTE & "#next" & QUOTE & ">Next page</A></td>"
      else
        viewHtml = viewHtml & RETURN & "<td align=right>&nbsp;</td>"
      end if
      viewHtml = viewHtml & RETURN & "</tr></table><br>"
    end if
  else
    pages = [1, 2, 3, 4, 5, 6, 7, 8]
    activePage = 1
  end if
  viewHtml = viewHtml & RETURN & "</BODY></HTML>"
  pViewMem.html = viewHtml
  me.setStyle()
  pLayoutImg.copyPixels(pViewMem.image, pViewMem.image.rect, pViewMem.image.rect)
end
on setButtonState me, t_elemName, t_state
  tWndObj = getWindow(m_sWindowTitle)
  if tWndObj <> 0 then
    t_Elem = tWndObj.getElement(t_elemName)
    if t_Elem <> 0 then
      case t_state of
        1:
          t_Elem.setProperty(#cursor, ["cursor.finger", "cursor.finger.mask"])
          t_Elem.Activate()
        0:
          t_Elem.setProperty(#cursor, #arrow)
          t_Elem.deactivate()

      end case
    end if
  end if
end
on inside me, loc, t_target
  t_loc = loc - pOffset
  if t_loc.inside(pLayoutImg.rect) then
    t_target.locH = t_loc.locH
    t_target.locV = t_loc.locV
    return 1
  end if
  return 0
end
on nextPage me
  if not voidp(pTopic) then
    pTopic.nextPage()
    me.setText(pTopic.getText())
    pHelp.render()
    return 1
  else
    return 0
  end if
end
on previousPage me
  if not voidp(pTopic) then
    pTopic.previousPage()
    me.setText(pTopic.getText())
    pHelp.render()
    return 1
  else
    return 0
  end if
end
on clickPage me, pos
  t_charPos = pViewMem.locToCharPos(pos)
  t_link = pViewMem.char[t_charPos].hyperlink
  if t_link.length then
    if t_link.char[1] = "#" then
      t_linkData = t_link.char[2..t_link.length]
      case t_linkData of
        "previous":
          me.previousPage()
          return 1
        "next":
          me.nextPage()
          return 1
        otherwise:
          if pHelp.searchNode(t_linkData) then
            return 1
          end if

      end case
    else
      if t_link.char[1..7] = "http://" then
        return 1
      end if
    end if
  end if
  return 0
end
on setStyle me
  pViewMem.antialias = 1
  pViewMem.useHypertextStyles = 1
  pViewMem.useHypertextStyles = 0
  pHyperLinks = pViewMem.hyperlinks
  pVisited = []
  if pHyperLinks.count > 0 then
    pVisited[pHyperLinks.count] = 0
    pNormalColor = rgb(255, 255, 255)
    pNormalStyle = [#normal, #underline]
    repeat with i in pHyperLinks
      linkRef = pViewMem.char[i[1]..i[2]].ref
      linkRef.color = pNormalColor
      linkRef.fontStyle = pNormalStyle
      linkRef.font = "Arial"
    end repeat
  end if
end