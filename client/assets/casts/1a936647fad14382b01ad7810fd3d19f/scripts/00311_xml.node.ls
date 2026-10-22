-- Script
property name
property type
property text
property child
property count
property attributeName
property attributeValue
property isEmpty

on new me, _name, _type, _data
  me.name = _name
  me.type = _type
  me.text = _data
  me.child = []
  me.attributeName = []
  me.attributeValue = [:]
  return me
end
on makeSublist me
  case me.type of
    #element:
      xmlList = [:]
      xmlList.addProp(me.name, me.toList())
    #procinst:
      xmlList = [:]
      xmlList.addProp("!PROCINST", me.toList())
    #chardata:
      xmlList = [:]
      xmlList.addProp("!CHARDATA", me.toList())

  end case
  return xmlList
end
on getAt me, index
  if index.ilk = #integer then
    return me.child[index]
  else
    index = string(index)
    repeat with node in me.child
      if node.name = index then
        return node
      end if
    end repeat
  end if
end
on count me
  return count(the child of me)
end
on getElementByName me, TagName, nodeList
  if nodeList.ilk = #void then
    nodeList = []
  end if
  repeat with node in me.child
    if node.type = #element then
      if node.name = TagName then
        nodeList.add(node)
      end if
      node.getElementByName(TagName, nodeList)
    end if
  end repeat
  if nodeList.count = 1 then
    return nodeList[1]
  else
    return nodeList
  end if
end
on getText me
  case me.type of
    #chardata:
      return the text of me
    #element:
      str = EMPTY
      repeat with node in me.child
        str = str & node.getText()
      end repeat
      return str
    #procinst:
      return the text of me

  end case
end
on toList me
  case me.type of
    #element:
      elemList = [:]
      attrList = duplicate(attributeValue)
      elemList.addProp("!ATTRIBUTES", attrList)
      repeat with i in child
        case i.type of
          #element:
            elemList.addProp(i.name, i.toList())
          #chardata:
            elemList.addProp("!CHARDATA", i.toList())
          #procinst:
            elemList.addProp("!PROCINST", i.toList())

        end case
      end repeat
      return elemList
    #chardata:
      return the text of me
    #procinst:
      piList = [:]
      piList.addProp("NAME", me.name)
      piList.addProp("TEXT", me.text)
      return piList

  end case
end
on toString me
  case me.type of
    #element:
      if me.isEmpty then
        tag = "<" & me.name & me.attrString() & "/>"
      else
        tag = "<" & me.name & me.attrString() & ">"
        repeat with node in me.child
          tag = tag & node.toString()
        end repeat
        tag = tag & "</" & me.name & ">"
      end if
      return tag
    #chardata:
      return me.encodeString(the text of me)
    #procinst:
      return "<?" & the name of me && the text of me & "?>"

  end case
end
on attrString me
  numAttr = count(me.attributeValue)
  attrStr = EMPTY
  if numAttr then
    repeat with i = 1 to numAttr
      attrName = attributeValue.getPropAt(i)
      attrValue = me.encodeString(attributeValue[i])
      attrStr = attrStr && attrName & "=" & QUOTE & attrValue & QUOTE
    end repeat
  end if
  return attrStr
end
on encodeString me, str
  encodedStr = EMPTY
  numChars = str.length
  repeat with i = 1 to numChars
    currChar = str.char[i]
    case currChar of
      "<":
        encodedStr = encodedStr & "&lt;"
      ">":
        encodedStr = encodedStr & "&gt;"
      "'":
        encodedStr = encodedStr & "&apos;"
      QUOTE:
        encodedStr = encodedStr & "&quot;"
      "&":
        encodedStr = encodedStr & "&amp;"
      otherwise:
        charNum = charToNum(currChar)
        if charNum > 127 then
          encodedStr = encodedStr & "&#" & charNum & ";"
        else
          encodedStr = encodedStr & currChar
        end if

    end case
  end repeat
  return encodedStr
end