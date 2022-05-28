namespace Allotment.DTOs
{
    public interface IAppSettings
    {

    }


    public class AppSettings : IAppSettings
    {

        public AppSettings()
        {
            Connection = new Connection();
            Profile = new Profile();
        }

        public Connection Connection { get; set; }
        public Profile Profile { get; set; }

    }

    public class Connection
    {
        public string Value { get; set; }
    }

    public class Profile
    {
        public string Machine { get; set; }
    }
}
