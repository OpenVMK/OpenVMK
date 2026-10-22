-- Behavior
property m_mp_sXML_rDoc
property m_mp_sDTD_rDoc
property m_mp_sRef_sChr
property m_bValidate

on construct this
  m_mp_sXML_rDoc = [:]
  m_mp_sDTD_rDoc = [:]
  m_mp_sRef_sChr = ["&lt;": "<", "&gt;": ">", "&amp;": "&", "&apos;": "'", "&quot;": QUOTE]
  m_bValidate = 1
  return 1
end
on deconstruct this
  m_mp_sXML_rDoc = [:]
  m_mp_sDTD_rDoc = [:]
  return 1
end
on Validate this, a_bBool
  m_bValidate = a_bBool
end
on ParseXML this, a_sXML, a_sDoc
  t_sCurDTD = EMPTY
  t_rRoot = [#type: "xml", #value: EMPTY, #param: [:], #child: [:]]
  t_rNode = t_rRoot
  t_ar_sItem = []
  t_bBool = this._ListItems(a_sDoc, t_ar_sItem)
  if not t_bBool or t_ar_sItem.count = 0 then
    Throw("Invalid document string")
    return t_rRoot
  end if
  t_sOpen = "<"
  t_sClose = ">"
  t_ar_rStack = []
  t_iItem = 1
  repeat while 1
    t_sItem = t_ar_sItem[t_iItem]
    if t_sItem starts t_sOpen then
      t_sItem = chars(t_sItem, 2, length(t_sItem) - 1)
      if chars(t_sItem, 1, 8) = "![CDATA[" then
        t_sTag = "!CDATA"
        t_sItem = chars(t_sItem, 9, length(t_sItem) - 2)
      else
        t_sTag = word 1 of t_sItem
        delete word 1 of t_sItem
      end if
      case char 1 of t_sTag of
        "/":
          t_sEnd = chars(t_sTag, 2, length(t_sTag))
          if t_sEnd <> t_rNode.type then
            t_sErr = "<" & t_rNode.type & "> --> </" & t_sEnd & ">"
            error(this, "Wrong or missing closing tag:" && t_sErr, #ParseXML)
          end if
          t_ar_rStack.deleteAt(count(t_ar_rStack))
          t_rNode = t_ar_rStack.getLast()
        "?":
          this._XML_ParseAttributes(t_sItem, t_rNode.param)
        "!":
          if t_sTag = "!DOCTYPE" then
            t_sDTD = word 1 of t_sItem
            t_sVisibility = word 2 of t_sItem
            if t_sVisibility = "SYSTEM" then
              t_sFile = word 3 of t_sItem
              t_sDelim = the itemDelimiter
              the itemDelimiter = QUOTE
              t_sFile = item 2 of t_sFile
              the itemDelimiter = t_sDelim
              t_rRes = getMember(t_sFile)
              if t_rRes.number > 0 then
                t_sText = t_rRes.text
              else
                error(this, "Declared DTD not found:" && QUOTE & t_sFile & QUOTE, #ParseXML)
                t_sText = EMPTY
              end if
            else
              if t_sVisibility = "PUBLIC" then
                error(this, "No support for public DTD's!", #ParseXML)
                t_sText = EMPTY
              else
                t_iInline = offset("[", t_sItem)
                if t_iInline > 0 then
                  t_sText = chars(t_sItem, t_iInline + 1, offset("]", t_sItem) - 1)
                else
                  t_sText = EMPTY
                end if
              end if
            end if
            try()
            t_rDTD = this.ParseDTD(t_sDTD, t_sText)
            if catch("Invalid document string") then
              t_rDTD = VOID
            else
              t_sCurDTD = t_sDTD
            end if
          else
            if t_sTag = "!CDATA" then
              t_ar_rStack.getLast().value = t_sItem
            else
              error(this, "Invalid marking:" && QUOTE & t_sItem & QUOTE, #ParseXML)
            end if
          end if
        otherwise:
          t_rTemp = [#type: t_sTag, #value: EMPTY, #param: [:], #child: [:]]
          this._XML_ParseAttributes(t_sItem, t_rTemp.param)
          t_sID = t_rTemp.param.getaProp("ID")
          if voidp(t_sID) then
            t_sID = EMPTY
          end if
          t_rNode.child.addProp(t_sID, t_rTemp)
          if the last char in t_sItem = "/" then
          else
            t_ar_rStack.append(t_rTemp)
            t_rNode = t_rTemp
          end if

      end case
    else
      t_rNode.value = t_sItem
    end if
    t_iItem = t_iItem + 1
    if t_iItem > t_ar_sItem.count then
      exit repeat
    end if
  end repeat
  if m_bValidate then
    if t_sCurDTD <> EMPTY then
      t_rDTD = m_mp_sDTD_rDoc.getaProp(t_sCurDTD)
      if voidp(t_rDTD) then
        error(this, "Missing DOCTYPE definition:" && QUOTE & t_sCurDTD & QUOTE, #ParseXML)
      end if
      if not this._XML_ValidateNode(t_rDTD, t_rRoot.child[1]) then
        error(this, "Missing or invalid attributes!", #ParseXML)
      end if
    end if
  end if
  m_mp_sXML_rDoc.setaProp(a_sXML, t_rRoot)
  return t_rRoot
end
on ParseDTD this, a_sDTD, a_sDoc
  t_mp_sElem_vData = m_mp_sDTD_rDoc.getaProp(a_sDTD)
  if not voidp(t_mp_sElem_vData) then
    return t_mp_sElem_vData
  end if
  t_mp_sElem_vData = [:]
  t_ar_sTag = []
  if not this._ListItems(a_sDoc, t_ar_sTag) then
    Throw("Invalid document string")
    return t_mp_sElem_vData
  end if
  repeat with t_sTag in t_ar_sTag
    t_sTag = chars(t_sTag, 2, length(t_sTag) - 1)
    t_sCase = word 1 of t_sTag
    t_sData = chars(t_sTag, 9, length(t_sTag))
    t_sElem = word 1 of t_sData
    t_sData = word 2 to the number of words in t_sData of t_sData
    case t_sCase of
      "!ELEMENT":
        t_mp_kKey_vData = [#data: EMPTY, #elements: [:], #attributes: [:]]
        if voidp(t_mp_sElem_vData.getaProp(t_sElem)) then
          t_mp_sElem_vData.setaProp(t_sElem, t_mp_kKey_vData)
        else
          error(this, "Multiple definitions of a single element:" && t_sElem, #ParseDTD)
          next repeat
        end if
        if not this._DTD_ParseContents(t_sData, t_mp_kKey_vData.elements) then
          error(this, "Invalid element data:" && t_sElem, #ParseDTD)
        end if
      "!ATTLIST":
        t_mp_kKey_vData = t_mp_sElem_vData.getaProp(t_sElem)
        if voidp(t_mp_kKey_vData) then
          error(this, "Attributes for undefined element:" && t_sElem, #ParseDTD)
          next repeat
        end if
        if not this._DTD_ParseAttributes(t_sData, t_mp_kKey_vData.attributes) then
          error(this, "Invalid attribute data:" && t_sElem, #ParseDTD)
        end if

    end case
    next repeat
  end repeat
  m_mp_sDTD_rDoc.setaProp(a_sDTD, t_mp_sElem_vData)
  return t_mp_sElem_vData
end
on _ListItems this, a_sInput, a_ar_sOutput
  t_sDoc = a_sInput
  t_sOpen = "<"
  t_sClose = ">"
  t_sComOpen = "<!--"
  t_sComClose = "-->"
  repeat while 1
    if word 1 of t_sDoc starts t_sOpen then
      t_iOpen = offset(t_sOpen, t_sDoc)
      if t_iOpen < 1 then
        exit repeat
      end if
      if chars(t_sDoc, t_iOpen, t_iOpen + 3) = t_sComOpen then
        t_iClose = offset(t_sComClose, t_sDoc)
        t_iCount = 1
        repeat while 1
          t_sDoc = chars(t_sDoc, t_iOpen + 4, length(t_sDoc))
          t_iOpen = offset(t_sComOpen, t_sDoc)
          if t_iOpen > 0 and t_iOpen < t_iClose then
            t_iCount = t_iCount + 1
            next repeat
          end if
          exit repeat
        end repeat
        repeat with i = 1 to t_iCount
          t_sDoc = chars(t_sDoc, offset(t_sComClose, t_sDoc) + 3, length(t_sDoc))
        end repeat
        next repeat
      end if
      t_iClose = offset(t_sClose, t_sDoc)
      if t_iClose < 1 then
        exit repeat
      end if
      if chars(t_sDoc, t_iOpen + 1, t_iOpen + 1) = "!" then
        case chars(t_sDoc, t_iOpen + 2, t_iOpen + 8) of
          "[CDATA[":
            t_iClose = offset("]]>", t_sDoc) + 2
          "DOCTYPE":
            if word 3 of t_sDoc starts "[" then
              t_iClose = offset("]", t_sDoc) + 1
            end if

        end case
      end if
    else
      t_iOpen = 1
      t_iClose = offset(t_sOpen, t_sDoc) - 1
      if t_iClose < 1 then
        exit repeat
      end if
    end if
    t_sItem = chars(t_sDoc, t_iOpen, t_iClose)
    if not (chars(t_sItem, 1, 9) = "<![CDATA[") then
      t_iLines = the number of lines in t_sItem
      if t_iLines > 1 then
        t_sTemp = EMPTY
        repeat with i = 1 to t_iLines - 1
          t_sLine = line i of t_sItem
          t_sLine = word 1 to the number of words in t_sLine of t_sLine
          put t_sLine & SPACE after t_sTemp
        end repeat
        t_sLine = line i of t_sItem
        t_sLine = word 1 to the number of words in t_sLine of t_sLine
        put t_sLine after t_sTemp
        t_sItem = t_sTemp
      end if
    end if
    a_ar_sOutput.append(t_sItem)
    t_sDoc = chars(t_sDoc, t_iClose + 1, length(t_sDoc))
  end repeat
  return 1
end
on _XML_ParseAttributes this, a_sInput, a_mp_rOutput
  t_sInput = a_sInput
  t_sDelim = the itemDelimiter
  repeat while 1
    the itemDelimiter = "="
    t_sKey = word 1 of item 1 of t_sInput
    if t_sKey = EMPTY then
      exit repeat
    end if
    delete item 1 of t_sInput
    t_sInput = word 1 to the number of words in t_sInput of t_sInput
    if the number of items in t_sInput = 0 then
      exit repeat
    end if
    the itemDelimiter = QUOTE
    if the number of items in t_sInput = 1 then
      exit repeat
    end if
    t_sValue = item 2 of t_sInput
    delete item 1 of t_sInput
    delete item 1 of t_sInput
    a_mp_rOutput.setaProp(t_sKey, t_sValue)
  end repeat
  the itemDelimiter = t_sDelim
  return 1
end
on _XML_ValidateNode this, a_rDTD, a_rNode
  t_sTag = a_rNode.type
  t_rDesc = a_rDTD.getaProp(t_sTag)
  if voidp(t_rDesc) then
    return error(this, "Undefined tag:" && t_sTag, #_XML_ValidateNode)
  end if
  t_rParams = a_rNode.param
  t_iCount = t_rDesc.attributes.count
  repeat with i = 1 to t_iCount
    t_sAttr = t_rDesc.attributes.getPropAt(i)
    t_rAttr = t_rDesc.attributes[i]
    if voidp(t_rParams.getaProp(t_sAttr)) then
      case t_rAttr.data of
        #default:
          t_rParams.setaProp(t_sAttr, t_rAttr.value)
        #required:
          t_sErr = "Missing attribute" && QUOTE & t_sAttr & QUOTE && "in" && t_sTag
          return error(this, t_sErr, #_XML_ValidateNode)

      end case
    end if
  end repeat
  t_rChilds = a_rNode.child
  t_mp_sType_iCount = ["EMPTY": 1, "#CDATA": 1, "#PCDATA": 1, "ANY": 1]
  repeat with t_rChild in t_rChilds
    t_sType = t_rChild.type
    t_iCount = t_mp_sType_iCount.getaProp(t_sType)
    if voidp(t_iCount) then
      t_iCount = 0
    end if
    t_mp_sType_iCount.setaProp(t_sType, t_iCount + 1)
  end repeat
  t_iCount = t_rDesc.elements.count
  repeat with i = 1 to t_iCount
    t_sType = t_rDesc.elements.getPropAt(i)
    t_sNeed = t_rDesc.elements[i]
    case t_mp_sType_iCount.getaProp(t_sType) of
      1:
      VOID:
        if t_sNeed = EMPTY or t_sNeed = "+" then
          t_sErr = "Missing child:" && QUOTE & t_sType & QUOTE && "in" && t_sTag
          return error(this, t_sErr, #_XML_ValidateNode)
        end if
      otherwise:
        if t_sNeed = EMPTY or t_sNeed = "?" then
          t_sErr = "Too many child occurences:" && QUOTE & t_sType & QUOTE && "in" && t_sTag
          return error(this, t_sErr, #_XML_ValidateNode)
        end if

    end case
  end repeat
  repeat with t_rChild in a_rNode.child
    if not this._XML_ValidateNode(a_rDTD, t_rChild) then
      return 0
    end if
  end repeat
  return 1
end
on _DTD_ParseAttributes this, a_sInput, a_mp_rOutput
  t_mp_kKey_rAttr = [#type: EMPTY, #data: #default, #value: EMPTY]
  t_sAttr = word 1 of a_sInput
  t_mp_kKey_rAttr.type = word 2 of a_sInput
  t_sData = word 3 to the number of words in a_sInput of a_sInput
  if t_sData starts "#" then
    case word 1 of t_sData of
      "#REQUIRED":
        t_mp_kKey_rAttr.data = #required
      "#IMPLIED":
        t_mp_kKey_rAttr.data = #implied
      "#FIXED":
        t_mp_kKey_rAttr.data = #fixed
        t_mp_kKey_rAttr.value = word 2 to the number of words in t_sData of t_sData

    end case
  else
    if char 1 of t_sData = QUOTE then
      t_sData = chars(t_sData, 2, length(t_sData) - 1)
    end if
    t_mp_kKey_rAttr.value = t_sData
  end if
  a_mp_rOutput.setaProp(t_sAttr, t_mp_kKey_rAttr)
  return 1
end
on _DTD_ParseContents this, a_sInput, a_mp_sOutput
  t_sDelim = the itemDelimiter
  the itemDelimiter = ","
  if a_sInput starts "(" then
    t_sData = chars(a_sInput, 2, length(a_sInput) - 1)
  else
    t_sData = a_sInput
  end if
  t_iCount = the number of items in t_sData
  repeat with i = 1 to t_iCount
    t_sElem = word 1 of item i of t_sData
    case the last char in t_sElem of
      "*", "?", "+":
        t_sElem = chars(t_sElem, 1, length(t_sElem) - 1)
        a_mp_sOutput.setaProp(t_sElem, "*")
      ")":
        error(this, "Conditional element content not supported!", #_DTD_ParseContents)
      otherwise:
        a_mp_sOutput.setaProp(t_sData, EMPTY)

    end case
  end repeat
  the itemDelimiter = t_sDelim
  return 1
end