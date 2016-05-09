var request = require('request');

function fixCSVString(val) {
  return val.replace('"', '').replace('"', '').trim();
}

function industryCodeInfo(successCallback, errorCallback) {
  request('http://www.bls.gov/cew/doc/titles/industry/industry_titles.csv', function (error, response, body) {
    if (!error && response.statusCode == 200) {

      var lines = body.trim().split('\n');
      lines.shift(); // remove the header row

      var transformed = lines.map(function(row) {
        var values = row.split(',');
        return {
          industryCode: fixCSVString(values[0]),
          industryName: fixCSVString(values[1])
        }
      }).reduce(function(tot, val) {
        tot[val.industryCode] = val.industryName
        return tot;
      }, {});

      successCallback(transformed);
    }
    else {
      errorCallback({ statusCode: response.statusCode })
    }
  });
}






function get(successCallback, errorCallback) {

  request('http://www.bls.gov/cew/data/api/2012/a/area/48009.csv', function (error, response, body) {
    if (!error && response.statusCode == 200) {

      var lines = body.trim().split('\n');
      lines.shift(); // remove the header row

      var transformed = lines.map(function(row) {
        var values = row.split(',');
        return {
          industryCode: fixCSVString(values[2]),
          totalAnnualWages: fixCSVString(values[10]),
          annualAverageWeeklyWage: fixCSVString(values[13])
        }
      })


      industryCodeInfo(function(industryMap) {

        for (var val of transformed) {
          val.industryName = industryMap[val.industryCode];
        }


        successCallback({ dataLength: lines.length, items: transformed });
      });

    }
    else {
      errorCallback({ statusCode: response.statusCode })
    }
  });

}


module.exports = {
  get: get
}
