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
    }
    console.log('rendered');
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
    return `<h2>Welcome to Find Your Eden</h2>
    <p>Hi there! Welcome to Find Your Eden, an app designed to help you find an ideal place to live in the United States based on what's important to you. Get personal matches by 
    rating the importance in each of 10 categories, find the top cities ranked by each of 10 categories, or view the top cities of all 10 categories combined with no weighting based
    on preference.</p>
    <p>Find Your Eden uses the <a href="https:www.teleport.org">teleport.org</a> city scores, a simple 0-10 for each category.</p>
    <div id="buttons">
        <button id="personal-match-button" class="js-match-page" value="go to personal match">Personal Match</button>
        <button id="top-by-category-button" class="js-top-by-category" value="go to top by category">Top by Category</button>
        <button id="top-overall-button" class="js-top-overall" value="go to top by overall score">Top by Overall Score</button>
    </div>`;
}

function generateMatchSelectElement() {
    return `<h2>Personalized Match</h2>
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
        </form>
        <input type="submit" id="js-match-submit">
    </div>`;
}

function generateMatchResultsElement() {
    let resultsElement = '<h2>Results:</h2><ol>';
    let currentCity = {};
    for (let i = 0; i < 10; i++) {
        currentCity = cityList.find(o => o.name === scoresSorted[i]);
        for (var key of Object.keys(currentCity)) {
            if (typeof currentCity[key] === 'number' && currentCity[key] !== 0) {
                currentCity[key] = (Math.round(currentCity[key] * 100)) / 100;
            }
        }
        resultsElement += `<div class="city-result" id="${currentCity.name}-result">
        <li><button class="city-button js-city-select" id="${currentCity.name}">${currentCity.name}</button>
        <ul>
            <li>Housing: ${currentCity.housing}</li>
            <li>Cost of Living: ${currentCity.costOfLiving}</li>
            <li>Travel Connectivity: ${currentCity.travelConnectivity}</li>
            <li>Commute: ${currentCity.commute}</li>
            <li>Safety: ${currentCity.safety}</li>
            <li>Healthcare: ${currentCity.healthcare}</li>
            <li>Education: ${currentCity.education}</li>
            <li>Environmental Quality: ${currentCity.environmentalQuality}</li>
            <li>Taxation: ${currentCity.taxation}</li>
            <li>Leisure and Culture: ${currentCity.leisureAndCulture}</li>
        </ul>
    </li>
    </div>`;
        if (i === 9) {
            resultsElement += `</ol>
            <button class="js-home">Home</button>`
        }
    }
    return resultsElement;
}

function generateTopByCategoryElement() {
    return ` <h2>Select a category to see the top results</h2>
    <button id="housing" value="go to housing" class="category-button">Housing</button>
    <button id="costOfLiving" value="go to cost of living" class="category-button">Cost of Living</button>
    <button id="travelConnectivity" value="go to travel connectivity" class="category-button">Travel Connectivity</button>
    <button id="commute" value="go to commute" class="category-button">Commute</button>
    <button id="safety" value="go to safety" class="category-button">Safety</button>
    <button id="healthcare" value="go to healthcare" class="category-button">Healthcare</button>
    <button id="education" value="go to education" class="category-button">Education</button>
    <button id="environmentalQuality" value="go to environmental quality" class="category-button">Environmental Quality</button>
    <button id="taxation" value="go to taxation" class="category-button">Taxation</button>
    <button id="leisureAndCulture" value="go to leisure-and-culture" class="category-button">Leisure and Culture</button>`;
}

function generateTopByCategoryResultsElement() {
    let resultsElement = '<h2>Results:</h2><ol>';
    let currentCity = {};
    for (let i = 0; i < 10; i++) {
        currentCity = cityList.find(o => o.name === scoresSorted[i]);
        for (var key of Object.keys(currentCity)) {
            if (typeof currentCity[key] === 'number' && currentCity[key] !== 0) {
                currentCity[key] = (Math.round(currentCity[key] * 100)) / 100;
            }
        }
        resultsElement += `<div class="city-result" id="${currentCity.name}-result">
        <li><button class="city-button js-city-select" id="${currentCity.name}">${currentCity.name}</button>
        <ul>
            <li>${category}: ${currentCity[category]}</li>
        </ul>
    </li>
    </div>`;
        if (i === 9) {
            resultsElement += '</ol>'
        }
    }
    return resultsElement;
}

function generateCitySpecificElement() {
    let currentCity = cityList.find(o => o.name === citySpecific);
    return `<div id="citySpecific">
    <h2>${currentCity.name}:</h2>
    <ul>
    <li>Housing: ${currentCity.housing}</li>
    <li>Cost of Living: ${currentCity.costOfLiving}</li>
    <li>Travel Connectivity: ${currentCity.travelConnectivity}</li>
    <li>Commute: ${currentCity.commute}</li>
    <li>Safety: ${currentCity.safety}</li>
    <li>Healthcare: ${currentCity.healthcare}</li>
    <li>Education: ${currentCity.education}</li>
    <li>Environmental Quality: ${currentCity.environmentalQuality}</li>
    <li>Taxation: ${currentCity.taxation}</li>
    <li>Leisure and Culture: ${currentCity.leisureAndCulture}</li>
    <p>Additional Information:</p>
    <li>Startups: ${currentCity.startups}</li>
    <li>Venture Capital: ${currentCity.ventureCapital}</li>
    <li>Business Freedom: ${currentCity.businessFreedom}</li>
    <li>Economy: ${currentCity.economy}</li>
    <li>Internet Access: ${currentCity.internetAccess}</li>
    <li>Tolerance: ${currentCity.tolerance}</li>
    <li>Outdoors: ${currentCity.outdoors}</li>
    </ul>
    <button id="js-return-to-match-results">Back to results</button>
    </div>
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
        console.log(matchOptions);
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
    scoresSorted = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a] });
    stage = 'matchResults';
    render();
}

function findTopByCategory() {
    console.log('sorting top by category: ' + category)
    for (let i = 0; i < cities.length; i++) {
        currentCity = cityList.find(o => o.name === cities[i]);
        let score = currentCity[category];
        scores[cities[i]] = score;
    }
    console.log(scores);
    scoresSorted = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a] });
    console.log(scoresSorted)
    stage = 'topByCategoryResults';
    render();
}

function findTopOverall() {
    let currentCity = {};
    for (let i = 0; i < cities.length; i++) {
        currentCity = cityList.find(o => o.name === cities[i]);
        let score = 0;
        score += (currentCity.housing);
        score += currentCity.costOfLiving;
        score += currentCity.travelConnectivity;
        score += currentCity.commute;
        score += currentCity.safety;
        score += currentCity.healthcare;
        score += currentCity.education;
        score += currentCity.environmentalQuality;
        score += currentCity.taxation;
        score += currentCity.leisureAndCulture;
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
    handleTopOverallSelect();
    handleCitySelect();
}

fetchCityInfo();
$(runApp);