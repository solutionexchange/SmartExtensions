<%
	' ----- ----- ----- ----- ----- ----- ----- -----
	' Package release 16.0.0.1253
	' File UUID: 825b9786-63a9-495b-8fcd-31ae4f993491
	' ----- ----- ----- ----- ----- ----- ----- -----

	Response.ContentType = "application/json"

	Response.Write chr(123)
	Response.Write vbCrLf
	Response.Write vbtab & chr(34) & "heartbeat" & chr(34) & chr(58) & "true"
	Response.Write vbCrLf & chr(125)
%>
