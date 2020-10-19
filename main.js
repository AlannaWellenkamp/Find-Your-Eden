'use: strict';

let matchOptions = {};
let cityList = [];
const cities = ['albuquerque', 'anchorage', 'asheville', 'atlanta', 'austin', 'baltimore', 'birmingham-al', 'boise', 'boston', 'boulder', 'buffalo', 'charleston', 'charlotte', 'chattanooga', 'chicago', 'cincinnati', 'cleveland', 'colorado-springs', 'columbus', 'dallas', 'denver', 'des-moines', 'detroit', 'eugene', 'fort-collins', 'houston', 'indianapolis', 'jacksonville', 'kansas-city', 'knoxville', 'las-vegas', 'los-angeles', 'madison', 'memphis', 'miami', 'milwaukee', 'minneapolis-saint-paul', 'nashville', 'new-orleans', 'new-york', 'oklahoma-city', 'omaha', 'orlando', 'philadelphia', 'phoenix', 'pittsburgh', 'portland-me', 'portland-or', 'raleigh', 'richmond', 'rochester', 'salt-lake-city', 'san-antonio', 'san-diego', 'san-francisco-bay-area', 'san-juan', 'san-luis-obispo', 'st-louis', 'tampa-bay-area', 'washington-dc'];
let scores = {};
let scoresSorted = [];
let stage = 'home';
let citySpecific = '';

function fetchCityInfo() {
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
}


function render() {
    const currentRender = generateHtml();
    $('main').html(currentRender);
    console.log('rendered');
}

function generateHtml(store) {
    if (stage === 'home') {
        return generateHomeElement();
    }
    else if (stage === 'matchSelect') {
        return generateMatchSelect();
    }
    else if (stage === 'matchResults') {
        return generateMatchResults();
    }
    else if (stage === 'topByCategorySelect') {
        return generateTopByCategory();
    }
    else if (stage === 'topByCategoryResults') {
        return generateTopByCategoryResults();
    }
    else if (stage === 'topOverall') {
        return generateTopOverall();
    }
    else if (stage === 'citySpecific') {
        return generateCitySpecific();
    }
}




function handleHomeSelect() {
    $('body').on('click', '.js-home', function (event) {
        stage = 'home';
        render();
    })
}

function handleMatchPageSelect() {
    $('body').on('click', '.js-match-page', function (event) {
        stage = 'matchSelect';
        render();
    })
}

function handleMatchSubmit() {
    $('body').on('submit', '#js-match-submit', function (event) {
        event.preventDefault();
        collectMatchOptions();
    })
}

function handleTopByCategorySelect() {
    $('body').on('click', '.js-top-by-category', function (event) {
        stage = 'topByCategory';
        render();
    })
}

function handleTopByCategorySubmit() {
    $('body').on('click', '#js-top-by-category-submit', function (event) {
        findTopByCategory();
    })
}

function handleTopOverallSelect() {
    $('body').on('click', '.js-top-overall', function (event) {
        findTopOverall();
    })
}

function handleCitySelect() {
    $('body').on('click', '.js-city-select', function (event) {

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
    var scoresSorted = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a] });
    console.log(scoresSorted);
}


function runApp() {
    render();
    handleHomeSelect();
    handleMatchPageSelect();
    handleMatchSubmit();
    handleTopByCategorySelect();
    handleTopByCategorySubmit();
    handleTopOverallSelect();
    handleCitySelect();
}



/*window.onload = function () {
    if (sessionStorage.getItem('hasCodeRunBefore') === null) {
        Your code here.
        sessionStorage.setItem('hasCodeRunBefore', true);
    }
}*/

fetchCityInfo();
$(runApp);