-- Script
property m_rXMLObjSrc
property m_rXMLParser

on construct this
  m_rXMLObjSrc = createObject(#temp, GetClsVariable("core.xml.doc"))
  m_rXMLObjSrc.setaProp(#ancestor, VOID)
  m_rXMLParser = createObject("core.xml.parser", GetClsVariable("core.xml.parser"))
  return 1
end
on deconstruct this
  m_rXMLObjSrc.close()
  m_rXMLObjSrc = VOID
  removeObject("core.xml.parser")
  m_rXMLParser = VOID
  return 1
end
on CreateXML this, a_sDoc
  if voidp(m_rXMLObjSrc) then
    this.construct()
  end if
  t_rXML = m_rXMLObjSrc.script.rawNew()
  t_rXML.close()
  t_rXML.m_rPrs = m_rXMLParser
  if stringp(a_sDoc) then
    t_rXML.open(a_sDoc)
  end if
  return t_rXML
end