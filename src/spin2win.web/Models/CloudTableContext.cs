using System.Collections.Generic;
using System.Linq;
using Microsoft.WindowsAzure.Storage.Table;

namespace spin2win.web.Models
{
    public class CloudTableContext
    {
        private const string PlayerTableName = "players";
        private const string SettingsTableName = "settings";

        public string SavePlayer(User user, Player player)
        {
            var table = CloudTableHelper.GetCloudTable(PlayerTableName);
            TableOperation operation;

            if (player.IsNew)
            {
                operation = TableOperation.Insert(player);
            }
            else
            {
                player.ETag = "*";
                operation = TableOperation.Replace(player);
            }

            player.PrepareForTableStorage(user);

            table.Execute(operation);

            return player.Id;
        }

        public IEnumerable<Player> GetPlayers(User user)
        {
            var context = CloudTableHelper.GetCloudTable(PlayerTableName);

            var playersQuery = new TableQuery<Player>().Where(
                TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, user.Id));

            var players = context.ExecuteQuery(playersQuery);

            return players;
        }

        public Settings GetSettings(User user)
        {
            var context = CloudTableHelper.GetCloudTable(SettingsTableName);

            var settingsQuery = new TableQuery<Settings>().Where(
                TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, user.Id));

            var settings = context.ExecuteQuery(settingsQuery).SingleOrDefault();

            return settings;
        }

        internal void SaveSettings(User user, Settings settings)
        {
            var table = CloudTableHelper.GetCloudTable(SettingsTableName);
            TableOperation operation;

            if (settings.IsNew)
            {
                operation = TableOperation.Insert(settings);
            }
            else
            {
                settings.ETag = "*";
                operation = TableOperation.Replace(settings);
            }

            settings.PrepareForTableStorage(user);

            table.Execute(operation);
        }

        public void DeletePlayer(User user, Player player)
        {
            var table = CloudTableHelper.GetCloudTable(PlayerTableName);
            player.ETag = "*";
            player.PrepareForTableStorage(user);

            var deleteOperation = TableOperation.Delete(player);
            table.Execute(deleteOperation);
        }
    }
}