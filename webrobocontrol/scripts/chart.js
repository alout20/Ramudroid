
    google.load("visualization", "1", {packages: ["bar","corechart",'table',"geochart"]});

    google.setOnLoadCallback(function() {
        drawChart('barChart', 'barchartDiv', arrData, null);
    });

    google.setOnLoadCallback(function() {
       drawChart('lineChart', 'linechartDiv', arrData, null);
    });

    google.setOnLoadCallback(function() {
       drawChart('bubbleChart', 'bubblechartDiv', arrData, null);
    });

    google.setOnLoadCallback(function() {
       drawChart('areaChart', 'areachartDiv', arrData, null);
    });



function drawChart(chartType, containerID, arrayVals, options) {
            
    var containerDiv = document.getElementById(containerID);
    var chart = false;

    if (chartType.toUpperCase() == 'BARCHART') {

        var data = google.visualization.arrayToDataTable(arrayVals);

        var options = {
            chart: {
                title: "barchart for Lat Long",
                subtitle: "maps the movemenet by bot",
            },
            backgroundColor: {
                fill: '#000000'
            },
            legend: {
                position: 'none'
            },
            bars: 'horizontal' // Required for Material Bar Charts.
        };

        chart = new google.charts.Bar(document.getElementById('barchartDiv'));
        //chart.draw(data, options);
        chart.draw(data, google.charts.Bar.convertOptions(options));
    }

    else if (chartType.toUpperCase() == 'LINECHART') {

        var data = new google.visualization.arrayToDataTable(arrayVals);
        var view = new google.visualization.DataView(data);
        view.setColumns([0,1]);

        var options = {
            title: "Latitude Longitude Distance",
            hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue: data.getColumnRange(0).max},
            vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max},
            legend: 'none',
            backgroundColor: 'black',
            chartArea: {
                        backgroundColor: 'black'
                    },
            crosshair: {
                  orientation: 'vertical'
            },
            animation: {
                  startup: true,
                  duration: 5000
            },
         };
         
        chart = new google.visualization.LineChart(containerDiv);
        chart.draw(view, options);
    }

    else if (chartType.toUpperCase() == 'BUBBLECHART') {
        var data = new google.visualization.arrayToDataTable(arrayVals);
        var view = new google.visualization.DataView(data);
        view.setColumns([8,9,10]);
        
        view[0]=["Sat","Prec","Chars"];
        for( var x=1 ;x<=view.length;x++ ){
            view[x][0]=String(view[x][0]);
        }
        console.log(view);
        var options = {
          colorAxis: {colors: ['yellow', 'red']}
        };

        var chart = new google.visualization.BubbleChart(containerDiv);
        chart.draw(view, options);
    }
    else if (chartType.toUpperCase() == 'PIECHART') {
       chart = new google.visualization.PieChart(containerDiv);
    }
    else if (chartType.toUpperCase() == 'AREACHART') {

        var data = new google.visualization.arrayToDataTable(arrayVals);
        var view = new google.visualization.DataView(data);
        view.setColumns([0,1]);

        var options = {
          title: 'Company Performance',
          hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(containerDiv);
        chart.draw(view, options);
    }

    if (chart == false) {
        return false;
    }


}

