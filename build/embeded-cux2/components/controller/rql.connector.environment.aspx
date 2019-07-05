<%@ Page Language="C#" validateRequest="false" %>

    <script language="C#" runat="server">
        /* ----- ----- ----- ----- ----- ----- ----- -----
           Package release 16.0.0.1253
           File UUID: c8d0c666-5f21-4861-bc88-08d75f22949f
           ----- ----- ----- ----- ----- ----- ----- ----- */

        protected DateTime GetCurrentTime(string TimeZoneName) {
            DateTime serverTime = DateTime.Now;
            DateTime _localTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(serverTime, TimeZoneInfo.Local.Id, TimeZoneName);
            return _localTime;
        }

        protected void Page_Load(object sender, EventArgs e) {
            Response.ContentType = "application/json";
            Response.Write("{\n");
            DateTime serverTime = DateTime.Now;
            Response.Write("  \"envMachineName\" : \"" + System.Environment.MachineName + "\",\n");
            Response.Write("  \"envProcessorCount\" : \"" + System.Environment.ProcessorCount + "\",\n");
            Response.Write("  \"envTickCount\" : \"" + System.Environment.TickCount + "\",\n");
            Response.Write("  \"envWorkingSet\" : \"" + System.Environment.WorkingSet + "\",\n");
            Response.Write("  \"envIs64BitOperatingSystem\" : \"" + System.Environment.Is64BitOperatingSystem + "\",\n");
            Response.Write("  \"envIs64BitProcess\" : \"" + System.Environment.Is64BitProcess + "\",\n");
            Response.Write("  \"envVersionIIS\" : \"" + Request.ServerVariables["SERVER_SOFTWARE"] + "\",\n");
            Response.Write("  \"envVersionOS\" : \"" + System.Environment.OSVersion + "\",\n");
            Response.Write("  \"envVersionDotNet\" : \"" + System.Environment.Version + "\",\n");
            Response.Write("  \"localDate\" : \"" + serverTime + "\",\n");
            Response.Write("  \"localDateGMT\" : \"" + TimeZoneInfo.ConvertTimeBySystemTimeZoneId(serverTime, TimeZoneInfo.Local.Id, "GMT Standard Time") + "\",\n");
            Response.Write("  \"localDateUTC\" : \"" + TimeZoneInfo.ConvertTimeBySystemTimeZoneId(serverTime, TimeZoneInfo.Local.Id, "UTC") + "\",\n");
            Response.Write("  \"localTimeZoneID\" : \"" + TimeZoneInfo.Local.Id + "\",\n");
            Response.Write("  \"localTimeZoneDisplayName\" : \"" + TimeZoneInfo.Local.DisplayName + "\",\n");
            Response.Write("  \"localTimeZoneStandardName\" : \"" + TimeZoneInfo.Local.StandardName + "\",\n");
            Response.Write("  \"localTimeZoneDaylightName\" : \"" + TimeZoneInfo.Local.DaylightName + "\",\n");
            Response.Write("  \"localTimeZoneOffsetUTC\" : \"" + TimeZone.CurrentTimeZone.GetUtcOffset(serverTime) + "\",\n");
            Response.Write("  \"localTimeZoneSupportsDaylightSavingTime\" : \"" + TimeZoneInfo.Local.SupportsDaylightSavingTime + "\"\n");
            Response.Write("}");
        }
    </script>
