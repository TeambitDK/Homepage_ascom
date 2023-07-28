const Status = Object.freeze({
  ok: Symbol("Ok"),
  errored: Symbol("Errored"),
  noRecent: Symbol("No Recent Backups")
});

function hasRecentBackups(client, maxDays){
  const days = maxDays || 3;
  const diffTime = days*24*60*60 // 7 days
  const recentFile = (client.lastbackup > (Date.now() / 1000 - diffTime));
  const recentImage = (client.lastbackup_image > (Date.now() / 1000 - diffTime));
  return (recentFile && recentImage);
}

function recentBackupsOk(client){
  return (client.file_ok && client.image_ok);
}

function determineClientStatus(client, maxDays){
  let status;
  if (hasRecentBackups(client, maxDays))
  {
    if (recentBackupsOk(client))
    {
      status = Status.ok
    }
    else
    {
      status = Status.errored
    }
  }
  else
  {
    status = Status.noRecent
  }

  return status;
}

export default function determineStatuses(clientStatuses) {
  let ok = 0;
  let errored = 0;
  let noRecent = 0;
  let result;
  clientStatuses.data.forEach((client) => {
    result = determineClientStatus(client, clientStatuses.maxDays);
    switch (result)
    {
      case Status.ok:
        ok +=1;
        break;
      case Status.errored:
        errored += 1;
        break;
      case Status.noRecent:
        noRecent += 1;
        break;
      default:
        break;
    }
  });

  return {ok, errored, noRecent};
}


