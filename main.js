'use: strict';

let fetched = 0;
let matchOptions = { housing: '1', costOfLiving: '1', travelConnectivity: '1', commute: '1', safety: '1', healthcare: '1', education: '1', environmentalQuality: '1', taxation: '1', leisureAndCulture: '1' };
let cityList = [];
const cities = ['albuquerque', 'anchorage', 'asheville', 'atlanta', 'austin', 'baltimore', 'birmingham-al', 'boise', 'boston', 'boulder', 'buffalo', 'charleston', 'charlotte', 'chattanooga', 'chicago', 'cincinnati', 'cleveland', 'colorado-springs', 'columbus', 'dallas', 'denver', 'des-moines', 'detroit', 'eugene', 'fort-collins', 'houston', 'indianapolis', 'jacksonville', 'kansas-city', 'knoxville', 'las-vegas', 'los-angeles', 'madison', 'memphis', 'miami', 'milwaukee', 'minneapolis-saint-paul', 'nashville', 'new-orleans', 'new-york', 'oklahoma-city', 'omaha', 'orlando', 'philadelphia', 'phoenix', 'pittsburgh', 'portland-me', 'portland-or', 'raleigh', 'richmond', 'rochester', 'salt-lake-city', 'san-antonio', 'san-diego', 'san-francisco-bay-area', 'san-juan', 'san-luis-obispo', 'st-louis', 'tampa-bay-area', 'washington-dc'];
let scores = {};
let scoresSorted = [];


function cityLoop() {
    console.log(cities);
    for (let i = 0; i < cities.length; i++) {
        fetch(`https://api.teleport.org/api/urban_areas/slug:${cities[i]}/scores/`)
            .then(response => response.json())
            .then(responseJson => buildCityList(cities[i], responseJson))

    }
}

function buildCityList(city, responseJson) {
    const currentCity = {
        name: city,
        housing: responseJson.categories[0].score_out_of_10,
        costOfLiving: responseJson.categories[1].score_out_of_10,
        travelConnectivity: responseJson.categories[4].score_out_of_10,
        commute: responseJson.categories[5].score_out_of_10,
        safety: responseJson.categories[7].score_out_of_10,
        healthcare: responseJson.categories[8].score_out_of_10,
        education: responseJson.categories[9].score_out_of_10,
        environmentalQuality: responseJson.categories[10].score_out_of_10,
        taxation: responseJson.categories[12].score_out_of_10,
        leisureAndCulture: responseJson.categories[14].score_out_of_10
    };
    cityList.push(currentCity);
    if (cityList.length === 60) {
        console.log(cityList);
        calculateScore(cityList, cities, matchOptions);
    }

}



function calculateScore(cityList, cities, matchOptions) {
    console.log('calculating scores');
    for (let i = 0; i < cities.length; i++) {
        console.log('calculating score for ' + cities[i]);
        let currentCity = {}; 
        currentCity = cityList.find(o => o.name === cities[i]);
        let score = 0;
        score += (currentCity.housing) * (matchOptions.housing);
        score += (currentCity.costOfLiving) * (matchOptions.costOfLiving);
        score += (currentCity.travelConnectivity) * (matchOptions.travelConnectivity);
        score += (currentCity.commute) * (matchOptions.commute);
        score += (currentCity.safety) * (matchOptions.safety);
        score += (currentCity.healthcare) * (matchOptions.healthcare);
        score += (currentCity.education) * (matchOptions.education);
        score += (currentCity.environmentalQuality) * (matchOptions.environmentalQuality);
        score += (currentCity.taxation) * (matchOptions.taxation);
        score += (currentCity.leisureAndCulture) * (matchOptions.leisureAndCulture);
        scores[cities[i]] = score;
    }
    console.log(scores);
    var scoresSorted = Object.keys(scores).sort(function(a,b){return scores[b]-scores[a]});
    console.log(scoresSorted);
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

runApp();

/*
$(runApp);
*/


