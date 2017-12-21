using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MvcApp.Models
{
    public class Music
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Artist { get; set; }
        public string Album { get; set; }
        public int? ReleaseYear { get; set; }
        public string Genre { get; set; }
        public string Filename { get; set; }
        public string Folder { get; set; }
    }
}
