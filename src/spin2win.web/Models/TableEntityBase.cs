using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.WindowsAzure.Storage.Table;

namespace spin2win.web.Models
{
    public class TableEntityBase:TableEntity 
    {
        public string Id { get; set; }

        public bool IsNew
        {
            get
            {
                return string.IsNullOrEmpty(Id);
            }
        }

        public void PrepareForTableStorage(User user)
        {
            if (IsNew)
            {
                var id = Guid.NewGuid().ToString();
                Id = id;
            }

            RowKey = Id;
            PartitionKey = user.Id;

        }
    }
}