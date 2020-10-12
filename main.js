'use: strict';

let scores = [];
const importance = [1, 2, 1, 1, 1, 2, 1, 2, 0, 1];
const cityList = {};

function cityLoop() {
    const cities = ['albuquerque', 'anchorage', 'asheville', 'atlanta', 'austin', 'baltimore', 'birmingham-al', 'boise', 'boston', 'boulder', 'buffalo', 'charleston', 'charlotte', 'chattanooga', 'chicago', 'cincinnati', 'cleveland', 'colorado-springs', 'columbus', 'dallas', 'denver', 'des-moines', 'detroit', 'eugene', 'fort-collins', 'houston', 'indianapolis', 'jacksonville', 'kansas-city', 'knoxville', 'las-vegas', 'los-angeles', 'madison', 'memphis', 'miami', 'milwaukee', 'minneapolis-saint-paul', 'nashville', 'new-orleans', 'new-york', 'oklahoma-city', 'omaha', 'orlando', 'philadelphia', 'phoenix', 'pittsburgh', 'portland-me', 'portland-or', 'raleigh', 'richmond', 'rochester', 'salt-lake-city', 'san-antonio', 'san-diego', 'san-francisco-bay-area', 'san-juan', 'san-luis-obispo', 'st-louis', 'tampa-bay-area', 'washington-dc'];
    console.log('launching city loop,' + cities.length);
    for (let i = 0; i < cities.length; i++) {
        fetch(`https://api.teleport.org/api/urban_areas/slug:${cities[i]}/scores/`)
            .then(response => response.json())
            .then(responseJson => buildCityList(cities[i], responseJson));
    }
    console.log(cityList);
}

function buildCityList(city, responseJson) {
    cityList[city] = responseJson;

}



function calculateScore(responseJson) {
    console.log(responseJson);
    let score = 0;
    console.log('calculating score');
    console.log(responseJson.categories.length + ' categories');
    score += (responseJson.categories[0].score_out_of_10) * (importance[0]);
    score += (responseJson.categories[1].score_out_of_10) * (importance[1]);
    score += (responseJson.categories[4].score_out_of_10) * (importance[2]);
    score += (responseJson.categories[5].score_out_of_10) * (importance[3]);
    score += (responseJson.categories[7].score_out_of_10) * (importance[4]);
    score += (responseJson.categories[8].score_out_of_10) * (importance[5]);
    score += (responseJson.categories[9].score_out_of_10) * (importance[6]);
    score += (responseJson.categories[10].score_out_of_10) * (importance[7]);
    score += (responseJson.categories[12].score_out_of_10) * (importance[8]);
    score += (responseJson.categories[14].score_out_of_10) * (importance[9]);
    console.log('calculated score');
    console.log(score);
    scores.push(score);
    console.log(scores);

}


function runApp() {
    console.log('app running');
    cityLoop();

}



/*window.onload = function () {
    if (sessionStorage.getItem("hasCodeRunBefore") === null) {
        Your code here.
        sessionStorage.setItem("hasCodeRunBefore", true);
    }
}*/

$(runApp);






