<%
	' ----- ----- ----- ----- ----- ----- ----- -----
	' Package release 16.0.0.1207
	' File UUID: b6ac0696-1a3c-4d82-b01f-f51c5c13219b
	' ----- ----- ----- ----- ----- ----- ----- -----

	Response.ContentType = "application/json"
	z = 0

	arrSessionItems = Array (_
		"LoginGuid", "SessionKey", "AspxSessionId", "CmsWindowTitle", "EmptyBuffer", _
		"EditorialServerGuid", "DialogLanguageId", "ProjectGuid", "LastActiveModule", _
		"UserFullName", "UserGuid", "UserLevel", "UserAgent", _
		"CurrentLanguageName", "CurrentLanguageGuid", "LanguageId", _
		"MainLanguageVariantId", "LanguageVariantId", "LanguageVariantLCID", "LanguageVariantRfcId", _
		"EditLinkGuid", "EditPageGuid", "EditPageId", _
		"LinkGuid", "LinkPageGuid", "LinkPageId", "LinkType", _
		"EltGuid", "EltPageGuid", "EltPageId", "EltTemplateElementGuid", "EltType", _
		"PageHeadline", "PageGuid", "PageId", "PageIsLocked", "PageStatus", _
		"RDApplicationPath", _
		"TemplateEditorRight", "TemplateGroup", "Template", "TemplateTitle", "TemplateGuid", "TemplateVariantGuid", _
		"TreeGuid", "TreeParentGuid", "TreeType", "TreeParentType")

	Response.Write chr(123)
	for x = 0 to ubound(arrSessionItems)
		if not (arrSessionItems(x) = "") then
			if (z = 0) then
				Response.Write vbCrLf
				z = 1
			else
				Response.Write chr(44) & vbCrLf
			end if
			select case arrSessionItems(x)
				case "TreeData"
					Response.Write vbtab & chr(34) & arrSessionItems(x) & chr(34) & chr(58) & Session(arrSessionItems(x))
				case "RDApplicationPath"
					Response.Write vbtab & chr(34) & arrSessionItems(x) & chr(34) & chr(58) & chr(34) & Server.URLEncode(Session(arrSessionItems(x))) & chr(34)
				case else
					Response.Write vbtab & chr(34) & arrSessionItems(x) & chr(34) & chr(58) & chr(34) & Session(arrSessionItems(x)) & chr(34)
			end select

		end if
	next
	Response.Write vbCrLf & chr(125)
%>
