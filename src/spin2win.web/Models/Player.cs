namespace spin2win.web.Models
{
    public class Player : TableEntityBase
    {
        public string Name { get; set; }
        public int NumberOfSlots { get; set; }
        public string PictureUrl { get; set; }
        public bool Included { get; set; }
    }
}