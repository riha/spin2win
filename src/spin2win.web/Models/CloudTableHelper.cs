using Microsoft.WindowsAzure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;

namespace spin2win.web.Models
{
    public static class CloudTableHelper
    {
        private static readonly CloudStorageAccount StorageAccount =
            CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting("StorageConnectionString"));

        public static CloudTable GetCloudTable(string tableName)
        {
            var tableClient = StorageAccount.CreateCloudTableClient();
            var table = tableClient.GetTableReference(tableName);
            table.CreateIfNotExists();

            return table;
        }
    }
}