'use: strict';

let matchOptions = {};
let cityList = [];
let cities = ['albuquerque', 'anchorage', 'asheville', 'atlanta', 'austin', 'baltimore', 'birmingham-al', 'boise', 'boston', 'boulder', 'buffalo', 'charleston', 'charlotte', 'chattanooga', 'chicago', 'cincinnati', 'cleveland', 'colorado-springs', 'columbus', 'dallas', 'denver', 'des-moines', 'detroit', 'eugene', 'fort-collins', 'houston', 'indianapolis', 'jacksonville', 'kansas-city', 'knoxville', 'las-vegas', 'los-angeles', 'madison', 'memphis', 'miami', 'milwaukee', 'minneapolis-saint-paul', 'nashville', 'new-orleans', 'new-york', 'oklahoma-city', 'omaha', 'orlando', 'philadelphia', 'phoenix', 'pittsburgh', 'portland-me', 'portland-or', 'raleigh', 'richmond', 'rochester', 'salt-lake-city', 'san-antonio', 'san-diego', 'san-francisco-bay-area', 'san-juan', 'san-luis-obispo', 'st-louis', 'tampa-bay-area', 'washington-dc'];
let scores = {};
let scoresSorted = [];
let stage = 'home';
let citySpecific = '';

/*------------------------------------------------------ FETCH/BUILD CITY INFO --------------------------------------------------------------*/

function fetchCityInfo() {
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

/*------------------------------------------------------ RENDER AND GENERATE HTML --------------------------------------------------------------*/

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
    else if (stage === 'topOverall') {
        return generateTopOverallElement();
    }
    else if (stage === 'citySpecific') {
        return generateCitySpecificElement();
    }
}

/*------------------------------------------------------ SPECIFIC HTMLS --------------------------------------------------------------*/

function generateHomeElement() {
    return `<h2>Welcome to Find Your Eden</h2>
    <p>Get a personalized match with one of the top urban centers in the US, view the top results of a given category, or browse the top areas overall.</p>
    <div id="buttons">
        <button id="personal-match-button" class="js-match-page" value="go to personal match">Personal Match</button>
        <button id="top-by-category-button" class="js-top-by-category" value="go to top by category">Top by Category</button>
        <button id="top-overall-button" class="js-top-overall" value="go to top by overall score">Top by Overall Score</button>
    </div>`;
}

function generateMatchSelectElement() {
    return `<h2>Personalized Match</h2>
    <div class="match-options">
        <form>
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
        <form>
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
        <form>
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
        <form>
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
        <form>
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
        <form>
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
        <form>
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
        <form>
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
        <form>
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
        <form>
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
    for (let i = 0; i < 10; i ++) {        
        currentCity = cityList.find(o => o.name === scoresSorted[i]);
        resultsElement += `<li><button class="city-button">${currentCity.name}</button>
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
    </li>`;
        if (i === 9) {
            resultsElement += '</ol>'
        }
    }    
    return resultsElement;
}

function generateTopByCategoryElement() {
    return ` <h2>Select a category to see the top results</h2>
    <button id="housing-button" value="go to housing" class="category-button">Housing</button>
    <button id="cost-of-living-button" value="go to cost of living" class="category-button">Cost of Living</button>
    <button id="travel-connectivity-button" value="go to travel connectivity" class="category-button">Travel Connectivity</button>
    <button id="commute-button" value="go to commute" class="category-button">Commute</button>
    <button id="safety-button" value="go to safety" class="category-button">Safety</button>
    <button id="healthcare-button" value="go to healthcare" class="category-button">Healthcare</button>
    <button id="education-button" value="go to education" class="category-button">Education</button>
    <button id="environmental-quality-button" value="go to environmental quality" class="category-button">Environmental Quality</button>
    <button id="taxation-button" value="go to taxation" class="category-button">Taxation</button>
    <button id="leisure-and-culture-button" value="go to leisure-and-culture" class="category-button">Leisure and Culture</button>`;
}

function generateTopByCategoryResultsElement() {
    return ``;
}

function generateTopOverallElement() {
    return ``;
}

function generateCitySpecificElement() {
    return ``;
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
        stage = 'citySpecific';
        render();
    })
}


/*------------------------------------------------------ PROCESS MATCH RESULTS --------------------------------------------------------------*/


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
    console.log('calculating scores');
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
    console.log(scoresSorted);
    render();
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