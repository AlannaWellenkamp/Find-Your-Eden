'use: strict';

let matchOptions = {};
let cityList = [];
let cities = ['albuquerque', 'anchorage', 'asheville', 'atlanta', 'austin', 'baltimore', 'birmingham-al', 'boise', 'boston', 'boulder', 'buffalo', 'charleston', 'charlotte', 'chattanooga', 'chicago', 'cincinnati', 'cleveland', 'colorado-springs', 'columbus', 'dallas', 'denver', 'des-moines', 'detroit', 'eugene', 'fort-collins', 'houston', 'indianapolis', 'jacksonville', 'kansas-city', 'knoxville', 'las-vegas', 'los-angeles', 'madison', 'memphis', 'miami', 'milwaukee', 'minneapolis-saint-paul', 'nashville', 'new-orleans', 'new-york', 'oklahoma-city', 'omaha', 'orlando', 'philadelphia', 'phoenix', 'pittsburgh', 'portland-me', 'portland-or', 'raleigh', 'richmond', 'rochester', 'salt-lake-city', 'san-antonio', 'san-diego', 'san-francisco-bay-area', 'san-juan', 'san-luis-obispo', 'st-louis', 'tampa-bay-area', 'washington-dc'];
let scores = {};
let scoresSorted = [];
let stage = 'home';
let citySpecific = '';
let category = '';
let picUrl = '';
let returnTo = '';
let categorySelected = '';

/*------------------------------------------------------ FETCH/BUILD CITY INFO --------------------------------------------------------------*/

function fetchCityInfo() {
    for (let i = 0; i < cities.length; i++) {
        fetch(`https://api.teleport.org/api/urban_areas/slug:${cities[i]}/scores/`)
            .then(response => response.json())
            .then(responseJson => buildCityList(cities[i], responseJson))
            .catch(err => {
                $('#js-error-message').text(`Something went wrong: ${err.message}`);
            })
    }
}

function buildCityList(city, responseJson) {
    const currentCity = {
        name: city,
        housing: responseJson.categories[0].score_out_of_10,
        costOfLiving: responseJson.categories[1].score_out_of_10,
        startups: responseJson.categories[2].score_out_of_10,
        ventureCapital: responseJson.categories[3].score_out_of_10,
        travelConnectivity: responseJson.categories[4].score_out_of_10,
        commute: responseJson.categories[5].score_out_of_10,
        businessFreedom: responseJson.categories[6].score_out_of_10,
        safety: responseJson.categories[7].score_out_of_10,
        healthcare: responseJson.categories[8].score_out_of_10,
        education: responseJson.categories[9].score_out_of_10,
        environmentalQuality: responseJson.categories[10].score_out_of_10,
        economy: responseJson.categories[11].score_out_of_10,
        taxation: responseJson.categories[12].score_out_of_10,
        internetAccess: responseJson.categories[13].score_out_of_10,
        leisureAndCulture: responseJson.categories[14].score_out_of_10,
        tolerance: responseJson.categories[15].score_out_of_10,
        outdoors: responseJson.categories[16].score_out_of_10
    };
    cityList.push(currentCity);
}

function fetchCityPic() {
    let currentCity = cityList.find(o => o.name === citySpecific)
    fetch(`https://api.teleport.org/api/urban_areas/slug:${currentCity.name}/images/`)
        .then(response => response.json())
        .then(responseJson => getPicUrl(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        })
}

function getPicUrl(responseJson) {
    picUrl = responseJson.photos[0].image.web;
    render();
}


/*------------------------------------------------------ RENDER AND GENERATE HTML --------------------------------------------------------------*/

function render() {
    const currentRender = generateHtml();
    $('main').html(currentRender);
    if (stage === 'citySpecific') {
        document.getElementById("citySpecific").style.backgroundImage = `url(${picUrl})`;
        document.getElementById("citySpecific").style.backgroundSize = "cover";
    };
    window.scrollTo(0, 0);
}



function generateHtml(store) {
    if (stage === 'home') {
        return generateHomeElement();
    }
    else if (stage === 'matchSelect') {
        return generateMatchSelectElement();
    }
    else if (stage === 'matchResults') {
        return generateMatchResultsElement();
    }
    else if (stage === 'topByCategorySelect') {
        return generateTopByCategoryElement();
    }
    else if (stage === 'topByCategoryResults') {
        return generateTopByCategoryResultsElement();
    }
    else if (stage === 'citySpecific') {
        return generateCitySpecificElement();
    }
}

/*------------------------------------------------------ SPECIFIC HTMLS --------------------------------------------------------------*/

function generateHomeElement() {
    return `<div class="home">
    <p>Hi there! Welcome to Find Your Eden, an app designed to help you find an ideal place to live in the United States based on what's important to you. Get personal matches by 
    rating the importance in each of 10 categories, find the top cities ranked by each of 10 categories, or view the top cities of all 10 categories combined with no weighting based
    on preference.</p>
    <p>Find Your Eden uses the <a href="https:www.teleport.org">teleport.org</a> city scores, a simple 0-10 for each category.</p>
    <div id="buttons">
        <button id="personal-match-button" class="js-match-page show-button" value="go to personal match">Personal Match</button>
        <button id="top-by-category-button" class="js-top-by-category show-button" value="go to top by category">Top by Category</button>
        <button id="top-overall-button" class="js-top-overall show-button" value="go to top by overall score">Top by Overall Score</button>
    </div></div>`;
}

function generateMatchSelectElement() {
    return `<h2>Personalized Match</h2>
    <p class="text-center">Please select how important each category is to you.</p>
    <div class="match-options">
        <form class="match-option">
            <fieldset>
                <legend>Housing</legend>
                <div class="radio"><input type="radio" id="extremely-important" name="housing"
                        value=1.5>
                    <label for="extremely-important">Extremely Important</label></div>
                <div class="radio"><input type="radio" id="important" name="housing" value=1>
                    <label for="important">Important</label></div>
                <div class="radio"><input type="radio" id="less-important" name="housing" value=.5>
                    <label for="less-important">Less Important</label></div>
                <div class="radio"><input type="radio" id="not-important" name="housing" value=0>
                    <label for="not-important">Not Important</label></div>
            </fieldset>
        </form>
        <form class="match-option">
            <fieldset>
                <legend>Cost of Living</legend>
                <div class="radio"><input type="radio" id="extremely-important" name="cost-of-living"
                        value=1.5>
                    <label for="extremely-important">Extremely Important</label></div>
                <div class="radio"><input type="radio" id="important" name="cost-of-living" value=1>
                    <label for="important">Important</label></div>
                <div class="radio"><input type="radio" id="less-important" name="cost-of-living"
                        value=.5>
                    <label for="less-important">Less Important</label></div>
                <div class="radio"><input type="radio" id="not-important" name="cost-of-living"
                        value=0>
                    <label for="not-important">Not Important</label></div>
            </fieldset>
        </form>
        <form class="match-option">
            <fieldset>
                <legend>Travel Connectivity</legend>
                <div class="radio"><input type="radio" id="extremely-important" name="travel-connectivity"
                        value=1.5>
                    <label for="extremely-important">Extremely Important</label></div>
                <div class="radio"><input type="radio" id="important" name="travel-connectivity" value=1>
                    <label for="important">Important</label></div>
                <div class="radio"><input type="radio" id="less-important" name="travel-connectivity"
                        value=.5>
                    <label for="less-important">Less Important</label></div>
                <div class="radio"><input type="radio" id="not-important" name="travel-connectivity"
                        value=0>
                    <label for="not-important">Not Important</label></div>
            </fieldset>
        </form>
        <form class="match-option">
            <fieldset>
                <legend>Commute</legend>
                <div class="radio"><input type="radio" id="extremely-important" name="commute"
                        value=1.5>
                    <label for="extremely-important">Extremely Important</label></div>
                <div class="radio"><input type="radio" id="important" name="commute" value=1>
                    <label for="important">Important</label></div>
                <div class="radio"><input type="radio" id="less-important" name="commute" value=.5>
                    <label for="less-important">Less Important</label></div>
                <div class="radio"><input type="radio" id="not-important" name="commute" value=0>
                    <label for="not-important">Not Important</label></div>
            </fieldset>
        </form>
        <form class="match-option">
            <fieldset>
                <legend>Safety</legend>
                <div class="radio"><input type="radio" id="extremely-important" name="safety"
                        value=1.5>
                    <label for="extremely-important">Extremely Important</label></div>
                <div class="radio"><input type="radio" id="important" name="safety" value=1>
                    <label for="important">Important</label></div>
                <div class="radio"><input type="radio" id="less-important" name="safety" value=.5>
                    <label for="less-important">Less Important</label></div>
                <div class="radio"><input type="radio" id="not-important" name="safety" value=0>
                    <label for="not-important">Not Important</label></div>
            </fieldset>
        </form>
        <form class="match-option">
            <fieldset>
                <legend>Healthcare</legend>
                <div class="radio"><input type="radio" id="extremely-important" name="healthcare"
                        value=1.5>
                    <label for="extremely-important">Extremely Important</label></div>
                <div class="radio"><input type="radio" id="important" name="healthcare" value=1>
                    <label for="important">Important</label></div>
                <div class="radio"><input type="radio" id="less-important" name="healthcare" value=.5>
                    <label for="less-important">Less Important</label></div>
                <div class="radio"><input type="radio" id="not-important" name="healthcare" value=0>
                    <label for="not-important">Not Important</label></div>
            </fieldset>
        </form>
        <form class="match-option">
            <fieldset>
                <legend>Education</legend>
                <div class="radio"><input type="radio" id="extremely-important" name="education"
                        value=1.5>
                    <label for="extremely-important">Extremely Important</label></div>
                <div class="radio"><input type="radio" id="important" name="education" value=1>
                    <label for="important">Important</label></div>
                <div class="radio"><input type="radio" id="less-important" name="education" value=.5>
                    <label for="less-important">Less Important</label></div>
                <div class="radio"><input type="radio" id="not-important" name="education" value=0>
                    <label for="not-important">Not Important</label></div>
            </fieldset>
        </form>
        <form class="match-option">
            <fieldset>
                <legend>Environmental Quality</legend>
                <div class="radio"><input type="radio" id="extremely-important" name="environmental-quality"
                        value=1.5>
                    <label for="extremely-important">Extremely Important</label></div>
                <div class="radio"><input type="radio" id="important" name="environmental-quality"
                        value=1>
                    <label for="important">Important</label></div>
                <div class="radio"><input type="radio" id="less-important" name="environmental-quality"
                        value=.5>
                    <label for="less-important">Less Important</label></div>
                <div class="radio"><input type="radio" id="not-important" name="environmental-quality"
                        value=0>
                    <label for="not-important">Not Important</label></div>
            </fieldset>
        </form>
        <form class="match-option">
            <fieldset>
                <legend>Taxation</legend>
                <div class="radio"><input type="radio" id="extremely-important" name="taxation"
                        value=1.5>
                    <label for="extremely-important">Extremely Important</label></div>
                <div class="radio"><input type="radio" id="important" name="taxation" value=1>
                    <label for="important">Important</label></div>
                <div class="radio"><input type="radio" id="less-important" name="taxation" value=.5>
                    <label for="less-important">Less Important</label></div>
                <div class="radio"><input type="radio" id="not-important" name="taxation" value=0>
                    <label for="not-important">Not Important</label></div>
            </fieldset>
        </form>
        <form class="match-option">
            <fieldset>
                <legend>Leisure and Culture</legend>
                <div class="radio"><input type="radio" id="extremely-important" name="leisure-and-culture"
                        value=1.5>
                    <label for="extremely-important">Extremely Important</label></div>
                <div class="radio"><input type="radio" id="important" name="leisure-and-culture" value=1>
                    <label for="important">Important</label></div>
                <div class="radio"><input type="radio" id="less-important" name="leisure-and-culture"
                        value=.5>
                    <label for="less-important">Less Important</label></div>
                <div class="radio"><input type="radio" id="not-important" name="leisure-and-culture"
                        value=0>
                    <label for="not-important">Not Important</label></div>
            </fieldset>
        </form></div>
        <div class="center-button match-button"><input type="submit" id="js-match-submit" class="show-button"></div>
    `;
}

function generateMatchResultsElement() {
    returnTo = 'match-results';
    let resultsElement = `<h2>Results:</h2>
    <p>Click on a city name to get additional information.</p>
    <ol class="result-list">`;
    let currentCity = {};
    for (let i = 0; i < 10; i++) {
        currentCity = cityList.find(o => o.name === scoresSorted[i]);
        for (var key of Object.keys(currentCity)) {
            if (typeof currentCity[key] === 'number' && currentCity[key] !== 0) {
                currentCity[key] = ((Math.round(currentCity[key] * 100)) / 100).toFixed(2);
            }
        }
        resultsElement += `<div class="city-result" id="${currentCity.name}-result">
        <li><button class="city-button js-city-select capitalize" id="${currentCity.name}">${(currentCity.name).replace('-', ' ')}</button>
        <ul>
            <li><span class="category-name">Housing: </span><span class="rating">${currentCity.housing}</span></li>
            <li><span class="category-name">Cost of Living: </span><span class="rating">${currentCity.costOfLiving}</span></li>
            <li><span class="category-name">Travel Connectivity: </span><span class="rating">${currentCity.travelConnectivity}</span></li>
            <li><span class="category-name">Commute: </span><span class="rating">${currentCity.commute}</span></li>
            <li><span class="category-name">Safety: </span><span class="rating">${currentCity.safety}</span></li>
            <li><span class="category-name">Healthcare: </span><span class="rating">${currentCity.healthcare}</span></li>
            <li><span class="category-name">Education: </span><span class="rating">${currentCity.education}</span></li>
            <li><span class="category-name">Environmental Quality: </span><span class="rating">${currentCity.environmentalQuality}</span></li>
            <li><span class="category-name">Taxation: </span><span class="rating">${currentCity.taxation}</span></li>
            <li><span class="category-name">Leisure and Culture: </span><span class="rating">${currentCity.leisureAndCulture}</span></li>
        </ul>
    </li></div></div>
    `;
        if (i === 9) {
            resultsElement += `</ol>
            <div class="center-button"><button class="js-home show-button hide-desktop">Home</button></div>`
        }
    }
    return resultsElement;
}

function generateTopByCategoryElement() {
    return `<h2>Select a category to see the top results</h2>
    <div class="top-by-category-options">
        <button id="housing" value="go to housing" class="category-button">Housing</button>
        <button id="costOfLiving" value="go to cost of living" class="category-button">Cost of Living</button>
        <button id="travelConnectivity" value="go to travel connectivity" class="category-button">Travel
            Connectivity</button>
        <button id="commute" value="go to commute" class="category-button">Commute</button>
        <button id="safety" value="go to safety" class="category-button">Safety</button>
        <button id="healthcare" value="go to healthcare" class="category-button">Healthcare</button>
        <button id="education" value="go to education" class="category-button">Education</button>
        <button id="environmentalQuality" value="go to environmental quality" class="category-button">Environmental
            Quality</button>
        <button id="taxation" value="go to taxation" class="category-button">Taxation</button>
        <button id="leisureAndCulture" value="go to leisure-and-culture" class="category-button">Leisure and
            Culture</button></div>
            <div class="center-button match-button"><button class="js-home show-button">Home</button></div>
    `;
}

function generateTopByCategoryResultsElement() {
    returnTo = 'top-by-category-results';
    let resultsElement = `<h2>Results for <span class="capitalize">${categorySelected}</span>:</h2><p>Click on a city name to get additional information.</p>
    <div class="top-category-results"><ol>`;
    let currentCity = {};
    for (let i = 0; i < 10; i++) {
        currentCity = cityList.find(o => o.name === scoresSorted[i]);
        for (var key of Object.keys(currentCity)) {
            if (typeof currentCity[key] === 'number' && currentCity[key] !== 0) {
                currentCity[key] = ((Math.round(currentCity[key] * 100)) / 100).toFixed(2);
            }
        }
        resultsElement += `<div class="city-result" id="${currentCity.name}-result">
        <li><button class="city-button js-city-select capitalize" id="${currentCity.name}">${(currentCity.name).replace('-', ' ')}</button>
        <span class="rating">${currentCity[category]}</span>
    </li>
    </div>`;
        if (i === 9) {
            resultsElement += `</ol></div>
            <div class="center-button"><button class="js-home show-button hide-desktop">Home</button></div>`
        }
    }
    return resultsElement;
}

function generateCitySpecificElement() {
    let currentCity = cityList.find(o => o.name === citySpecific);
    return `<div id="citySpecific"><div class="shade">
    <h2 class="bold capitalize city-specific-name">${(currentCity.name).replace('-', ' ')}:</h2>
    <ul class="city-specific-info">
    <li><span class="category-name">Housing: </span><span class="rating">${currentCity.housing}</span></li>
    <li><span class="category-name">Cost of Living: </span><span class="rating">${currentCity.costOfLiving}</span></li>
    <li><span class="category-name">Travel Connectivity: </span><span class="rating">${currentCity.travelConnectivity}</span></li>
    <li><span class="category-name">Commute: </span><span class="rating">${currentCity.commute}</span></li>
    <li><span class="category-name">Safety: </span><span class="rating">${currentCity.safety}</span></li>
    <li><span class="category-name">Healthcare: </span><span class="rating">${currentCity.healthcare}</span></li>
    <li><span class="category-name">Education: </span><span class="rating">${currentCity.education}</span></li>
    <li><span class="category-name">Environmental Quality: </span><span class="rating">${currentCity.environmentalQuality}</span></li>
    <li><span class="category-name">Taxation: </span><span class="rating">${currentCity.taxation}</span></li>
    <li><span class="category-name">Leisure and Culture: </span><span class="rating">${currentCity.leisureAndCulture}</span></li>
    <p class="bold">Additional Information:</p>
    <li><span class="category-name">Startups: </span><span class="rating">${currentCity.startups}</span></li>
    <li><span class="category-name">Venture Capital: </span><span class="rating">${currentCity.ventureCapital}</span></li>
    <li><span class="category-name">Business Freedom: </span><span class="rating">${currentCity.businessFreedom}</span></li>
    <li><span class="category-name">Economy: </span><span class="rating">${currentCity.economy}</span></li>
    <li><span class="category-name">Internet Access: </span><span class="rating">${currentCity.internetAccess}</span></li>
    <li><span class="category-name">Tolerance: </span><span class="rating">${currentCity.tolerance}</span></li>
    <li><span class="category-name">Outdoors: </span><span class="rating">${currentCity.outdoors}</span></li>
    </ul>
    <div class="center-button city-buttons"><button id="js-return-to-${returnTo}" class="show-button">Back to results</button>
    <button class="js-home show-button">Home</button></div>
    </div></div></div>
    `;
}



/*------------------------------------------------------ EVENT HANDLERS --------------------------------------------------------------*/

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
    $('body').on('click', '#js-match-submit', function (event) {
        event.preventDefault();
        collectMatchOptions();
    })
}

function handleMatchReturn() {
    $('body').on('click', "#js-return-to-match-results", function (event) {
        stage = "matchResults";
        render();
    })
}

function handleTopByCategorySelect() {
    $('body').on('click', '.js-top-by-category', function (event) {
        stage = 'topByCategorySelect';
        render();
    })
}

function handleTopByCategorySubmit() {
    $('body').on('click', '.category-button', function (event) {
        category = $(this).attr("id");
        findTopByCategory();
    })
}

function handleTopByCategoryReturn() {
    $('body').on('click', "#js-return-to-top-by-category-results", function (event) {
        stage = "topByCategoryResults";
        render();
    })
}

function handleTopOverallSelect() {
    $('body').on('click', '.js-top-overall', function (event) {
        findTopOverall();
    })
}

function handleCitySelect() {
    $('body').on('click', '.js-city-select', function (event) {
        stage = 'citySpecific';
        citySpecific = $(this).attr("id");
        fetchCityPic();
    })
}


/*------------------------------------------------------ PROCESS RESULTS --------------------------------------------------------------*/


function collectMatchOptions() {
    matchOptions['housing'] = $("input[type='radio'][name='housing']:checked").val();
    matchOptions['costOfLiving'] = $("input[type='radio'][name='cost-of-living']:checked").val();
    matchOptions['travelConnectivity'] = $("input[type='radio'][name='travel-connectivity']:checked").val();
    matchOptions['commute'] = $("input[type='radio'][name='commute']:checked").val();
    matchOptions['safety'] = $("input[type='radio'][name='safety']:checked").val();
    matchOptions['healthcare'] = $("input[type='radio'][name='healthcare']:checked").val();
    matchOptions['education'] = $("input[type='radio'][name='education']:checked").val();
    matchOptions['environmentalQuality'] = $("input[type='radio'][name='environmental-quality']:checked").val();
    matchOptions['taxation'] = $("input[type='radio'][name='taxation']:checked").val();
    matchOptions['leisureAndCulture'] = $("input[type='radio'][name='leisure-and-culture']:checked").val();
    if (matchOptions.housing && matchOptions.costOfLiving && matchOptions.travelConnectivity && matchOptions.commute && matchOptions.safety && matchOptions.healthcare && matchOptions.education && matchOptions.environmentalQuality && matchOptions.taxation && matchOptions.leisureAndCulture) {
        calculateScore();
    }
    else {
        alert('Please make sure to select an option for each category');
    }
}

function calculateScore() {
    let currentCity = {};
    for (let i = 0; i < cities.length; i++) {
        currentCity = cityList.find(o => o.name === cities[i]);
        let score = 0;
        score += parseFloat((currentCity.housing)) * (matchOptions.housing);
        score += parseFloat((currentCity.costOfLiving)) * (matchOptions.costOfLiving);
        score += parseFloat((currentCity.travelConnectivity)) * (matchOptions.travelConnectivity);
        score += parseFloat((currentCity.commute)) * (matchOptions.commute);
        score += parseFloat((currentCity.safety)) * (matchOptions.safety);
        score += parseFloat((currentCity.healthcare)) * (matchOptions.healthcare);
        score += parseFloat((currentCity.education)) * (matchOptions.education);
        score += parseFloat((currentCity.environmentalQuality)) * (matchOptions.environmentalQuality);
        score += parseFloat((currentCity.taxation)) * (matchOptions.taxation);
        score += parseFloat((currentCity.leisureAndCulture)) * (matchOptions.leisureAndCulture);
        scores[cities[i]] = score;
    }
    scoresSorted = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a] });
    stage = 'matchResults';
    render();
}

function findTopByCategory() {
    for (let i = 0; i < cities.length; i++) {
        currentCity = cityList.find(o => o.name === cities[i]);
        let score = parseFloat(currentCity[category]);
        scores[cities[i]] = score;
    }
    categorySelected = category;
    if (categorySelected === 'costOfLiving') {
        categorySelected = 'Cost Of Living';
    }
    if (categorySelected === 'travelConnectivity') {
        categorySelected = 'Travel Connectivity';
    }
    if (categorySelected === 'environmentalQuality') {
        categorySelected = 'Environmental Quality';
    }
    if (categorySelected === 'leisureAndCulture') {
        categorySelected = 'Leisure And Culture';
    }
    scoresSorted = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a] });
    stage = 'topByCategoryResults';
    render();
}

function findTopOverall() {
    let currentCity = {};
    scores = {};
    scoresSorted = [];
    for (let i = 0; i < cities.length; i++) {
        currentCity = cityList.find(o => o.name === cities[i]);
        let score = 0;
        score += parseFloat(currentCity.housing);
        score += parseFloat(currentCity.costOfLiving);
        score += parseFloat(currentCity.travelConnectivity);
        score += parseFloat(currentCity.commute);
        score += parseFloat(currentCity.safety);
        score += parseFloat(currentCity.healthcare);
        score += parseFloat(currentCity.education);
        score += parseFloat(currentCity.environmentalQuality);
        score += parseFloat(currentCity.taxation);
        score += parseFloat(currentCity.leisureAndCulture);
        scores[cities[i]] = score;
    }
    scoresSorted = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a] });
    stage = 'matchResults';
    render();
}

/*---------------------------------------------------------------------------------------------------------------------------------------------*/
function runApp() {
    render();
    handleHomeSelect();
    handleMatchPageSelect();
    handleMatchSubmit();
    handleMatchReturn();
    handleTopByCategorySelect();
    handleTopByCategorySubmit();
    handleTopByCategoryReturn();
    handleTopOverallSelect();
    handleCitySelect();
}

fetchCityInfo();
$(runApp);