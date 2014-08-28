// retrieveData(function(data) {
// $('#container').append(data);
// $(document).append('#container');
// }
var endpointCount = 77,
    dataArray = [],
    compiledStory = "";

function appendContainer() {
    for (var i = 0; i < dataArray.length; i++) {
        part = dataArray[i]["fragment"];
        for (segment in part) {
            compiledStory = compiledStory.concat(part[segment]);
        }
    }
    compiledStory = compiledStory.replace(new RegExp('\r?\n', 'g'), '<br />');
    $('#container').append(compiledStory);
}
// Make a call to our server, requesting a set of data.
// The data we get back is a chunk of strings that form
// a larger message.
var gatheredData = function(i) {
    // for (var i = 0; i < endpointCount; i++)
    $.ajax({
        type: 'GET',
        url: '/' + i,
        success: function(data) {
            var obj = {};
            console.log('Got back success from call ' + i + '!');
            obj["location"] = i;
            obj["fragment"] = JSON.parse(data);
            var combine = dataArray.push(obj);
            if (combine === 77) {
                dataArray.sort(function(a, b) {
                    return a.location - b.location;
                });
                appendContainer();
            }
        }
    });
    appendContainer();
};
$('#run').on("click", function() {
    for (var i = 0; i < endpointCount; i++) {
        gatheredData(i);
    }
});
setTimeout(function() {
    $('span').remove();
    $("#container").append("<span></span>");
    compiledStory = "";
    dataArray = dataArray.reverse();
    appendContainer();
}, 5000);