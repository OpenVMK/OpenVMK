-- Script
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

on construct me
  pHelp = VOID
  pTopic = VOID
  pwidth = 300
  pNeedUpdate = 1
  pOffset = point(0, 0)
  return 1
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
  put _text
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
on getXMLContent me, xmlData
  t_rTopics = VOID
  xmlData.GetRoot()
  if xmlData.Search("type", "CONTENT") then
    t_rTopics = xmlData.GetNode()
  end if
  return t_rTopics
end
on parseContent me
  xmlDoc = "<?xml version=" & QUOTE & "1.0" & QUOTE & "?>" & RETURN
  xmlDoc = xmlDoc & "<CONTENT>" & RETURN & pMem.text & RETURN & "</CONTENT>"
  viewHtml = "<HTML><HEAD><TITLE></TITLE></HEAD><BODY>" & RETURN
  t_fontStyle = "<FONT FACE=" & QUOTE & "Arial" & QUOTE & " SIZE=3 COLOR=" & QUOTE & "#FFFFFF" & QUOTE & ">"
  if xmlDoc.ilk = #string then
    if xmlDoc.length then
      XmlParser = CreateXML(xmlDoc)
      objects = me.getXMLContent(XmlParser)
      numObjs = objects.child.count
      put numObjs & " token(s) on page"
      if objects.value.length then
        put objects.value
      end if
      repeat with node in objects.child
        if node.type = EMPTY then
          t_insertHtml = replaceChunks(node.value, "\r", "<BR>")
          viewHtml = viewHtml & t_fontStyle & t_insertHtml & "</FONT><BR>" & RETURN
          next repeat
        end if
        if node.type = "link" then
          t_error = 0
          linkdata = "<A HREF=" & QUOTE
          if node.param.getaProp("help").length then
            linkdata = linkdata & "#" & node.param.getaProp("help") & QUOTE
          else
            if node.param.getaProp("href").length then
              linkdata = linkdata & node.param.getaProp("href") & QUOTE
            else
              t_error = 1
              put "Unknown link"
            end if
          end if
          if not t_error then
            linkdata = linkdata & ">" & node.value & "</A>"
            viewHtml = viewHtml & linkdata
          end if
        end if
        if node.type = "image" then
          t_error = 0
          imgdata = "<IMG SRC=" & QUOTE
          if node.param.getaProp("id").length then
            t_ImgMem = member(node.param.getaProp("id"))
            if not voidp(t_ImgMem) then
              imgdata = imgdata & node.param.getaProp("id") & QUOTE & ">"
              pViewMem.html = viewHtml
              t_y = pViewMem.image.height
              t_x = pwidth / 2 - t_ImgMem.image.width / 2
              t_offset = rect(t_x, t_y, t_x, t_y)
              pLayoutImg.copyPixels(t_ImgMem.image, t_ImgMem.rect + t_offset, t_ImgMem.rect)
              t_lines = t_ImgMem.image.height / (pViewMem.fontSize + 0)
              repeat with i = 1 to t_lines + 1
                viewHtml = viewHtml & "<br>"
              end repeat
              next repeat
            end if
            t_error = 1
          end if
        end if
      end repeat
    end if
  end if
  if not voidp(pTopic) then
    pages = pTopic.pages
    activePage = pTopic.activePage
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
  else
    pages = [1, 2, 3, 4, 5, 6, 7, 8]
    activePage = 1
  end if
  viewHtml = viewHtml & RETURN & "</BODY></HTML>"
  pViewMem.html = viewHtml
  me.setStyle()
  pLayoutImg.copyPixels(pViewMem.image, pViewMem.image.rect, pViewMem.image.rect)
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
on clickPage me, pos
  t_charPos = pViewMem.locToCharPos(pos)
  t_link = pViewMem.char[t_charPos].hyperlink
  if t_link.length then
    if t_link.char[1] = "#" then
      t_linkData = t_link.char[2..t_link.length]
      put "INTERNAL" && t_linkData
      case t_linkData of
        "previous":
          pTopic.previousPage()
          me.setText(pTopic.getText())
          pHelp.render()
        "next":
          pTopic.nextPage()
          me.setText(pTopic.getText())
          pHelp.render()
        otherwise:
          pHelp.searchNode(t_linkData)

      end case
    else
      if t_link.char[1..7] = "http://" then
        put "EXTERNAL" && t_link
      end if
    end if
  end if
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
  put pViewMem.html
end