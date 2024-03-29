const endpoint = {
    'ip': 'checkIP',
    'anid': 'CheckAnid',
    'location': 'CheckLocation',
    'adid': 'checkAdid',
    'idfa': 'checkAdid'
}

export async function getApiData(searchType, searchData) {

    if (searchType === 'adid')
        searchData.DeviceIdType = 'ADID'
    else if (searchType === 'idfa') {
        searchData.adid = searchData.idfa
        searchData.idfa = undefined
        searchData.DeviceIdType = 'userIDFA'
    }

    console.log(searchData)
    const resp = await fetch(`https://banlistlookup.azurewebsites.net/api/${endpoint[searchType]}`, { method: 'POST', body: JSON.stringify(searchData) })

    console.log(resp)
    if (!resp.ok)
        return { error: `${resp.status} - ${resp.statusText}` }

    const data = resp.json();

    return (data);
}
