'use strict';
window.LaborStatistics = {};

(function(context) {

  function start() {

    var apiData;
    var input = document.querySelector('#query');

    input.addEventListener('keyup', function(evt) {

      if (evt.keyCode === 13) {
        var val = input.value;

        var filteredValues = [];
        for (var item of apiData.items) {
          if (item.industryName.indexOf(val) !== -1) {
            filteredValues.push(item);
          }
        }
        templateRows(filteredValues);
        //return filteredValues
      }


    });

    function templateRows(arr) {
      var tBody = document.querySelector('tbody');
      var templateDOMElement = document.querySelector('#template');
      var templateText = templateDOMElement.innerHTML;

      var templateFunc = _.template(templateText);

      var bodyHTML = '';
      for (var item of arr) {
        var htmlString = templateFunc({ industryCode: item.industryCode,
            industryName: item.industryName,
            totalAnnualWages: item.totalAnnualWages,
            annualAverageWeeklyWage: item.annualAverageWeeklyWage
          });
        bodyHTML += htmlString;
      }
      tBody.innerHTML = bodyHTML;
    }


    var promise = $.ajax('http://localhost:3002/api/qcew');
    promise.done(function(data) {
      console.log('data', data);
      apiData = data;



      templateRows(apiData.items);



    });

  }

  context.start = start;

})(this.LaborStatistics);
