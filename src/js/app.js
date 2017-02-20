import $ from 'jquery';


var forEach = function(arr, func){
	for(var i = 0 ; i < arr.length; i++){
		func(arr[i], i, arr)
	}
}

var homeHtml = `
	<div class="home">
		<h2>The Basic Facts</h2>
		<div class ="row">
			<div class="col-xs-6">
				<p>Native Name</p>
				<p>Demonym</p>
				<p>Area (m2)</p>
				<p>Calling Code</p>
			</div>
			<div class="col-xs-6">
				<p>island</p>
				<p>Icelander</p>
				<p>103000</p>
				<p>352</p>
			</div>
		</div>
	</div>
`

// -----------Navbar and Routing Settings----------
var tabsContainerEl = document.querySelector('.tabcontent__list')

function renderActiveTab(theCurrentRoute){
	var previousActiveTabEl = document.querySelector('[class="tabcontent__tab active"]')
	previousActiveTabEl.classList.remove('active')

	var currentActiveTabEl = document.querySelector(`[data-route="${theCurrentRoute}"]`)
	currentActiveTabEl.classList.add('active')
}


var controllerRouter = function(){
	var currentRoute = window.location.hash.slice(1)
	if(currentRoute.length === 0){ currentRoute = 'home' }
	var pageContentEl = document.querySelector('.page_content')
	renderActiveTab(currentRoute)
	renderContentTo(pageContentEl, currentRoute, pageContentObj)
}


tabsContainerEl.addEventListener('click', function(evt){
	var clickedTabEl = evt.target
	var route = clickedTabEl.dataset.route
	var pageContentEl = document.querySelector('.page_content')
	window.location.hash = route

	if (clickedTabEl.dataset.route === 'home'){pageContentEl.innerHTML = homeHtml}
	// console.log(clickedTabEl)



// ---------------concerts page------------------

	$.getJSON('http://apis.is/concerts').then(function(concertsRes){
		var concertsObj = concertsRes.results
		// console.log(concertsObj)
		forEach(concertsObj, function(concertsEl, index, theArray){
			// console.log(concertsEl)

			var concertsHtml = `
			<div class="concerts">
				<h2>Concerts</h2>
				<div class="row">
					<div class="col-xs-4">
						<div class="thumbnail">
						<img src="${concertsEl.imageSource}">
							<div class="caption">
							<h3>${concertsEl.eventDateName}</h3>
							<p>${concertsEl.eventHallName}</p>
							<p>${concertsEl.dateOfShow}</p>
							</div>
						</div>
					</div>
				</div>
			`

	if (clickedTabEl.dataset.route === 'home'){pageContentEl.innerHTML = homeHtml}
	if (clickedTabEl.dataset.route === 'concerts'){pageContentEl.innerHTML = concertsHtml}
})
})


//------------------- carpools page

$.getJSON('http://apis.is/rides/samferda-drivers/').then(function(carpoolsRes){
	var carpoolsObj = carpoolsRes.results
	// console.log(concertsObj)
	forEach(carpoolsObj, function(carpoolsEl, index, theArray){
		// console.log(carpoolsEl)

		var carpoolsHtml = `
		<div class="carpools">
			<h2>Carpools</h2>
			<div class="row">
				<div class="col-xs-4">
						<div class="caption">
						<h4>Time of Departure</h4>
						<p>${carpoolsEl.time}</p>
						</div>
				</div>
				<div class="col-xs-4">
					<div class="caption">
					<h4>From</h4>
					<p>${carpoolsEl.from}</p>
					</div>
				</div>
				<div class="col-xs-4">
					<div class="caption">
					<h4>To</h4>
					<p>${carpoolsEl.to}</p>
					</div>
				</div>
				</div>
			</div>
		`

if (clickedTabEl.dataset.route === 'carpools'){pageContentEl.innerHTML = carpoolsHtml}
})
})




// **********arrivals flight info

$.getJSON('http://apis.is/flight?language=en&type=arrivals').then(function(arrivalsRes){
	var arrivalsObj = arrivalsRes.results

	forEach(arrivalsObj, function(arrivalsEl, index, theArray){

		var arrivalsHtml = `
		<div class="arrivals">
			<h5>Arrivals</h5>
			<div class="row">
				<div class="col-xs-3">
						<div class="caption">
						<h4>Date</h4>
						<p>${arrivalsEl.date}</p>
						</div>
				</div>
				<div class="col-xs-3">
						<div class="caption">
						<h4>Arrival Time</h4>
						<p>${arrivalsEl.plannedArrival}</p>
						</div>
				</div>
				<div class="col-xs-3">
					<div class="caption">
					<h4>Origin</h4>
					<p>${arrivalsEl.from}</p>
					</div>
				</div>
				<div class="col-xs-3">
					<div class="caption">
					<h4>Airline</h4>
					<p>${arrivalsEl.airline}</p>
					</div>
				</div>
				</div>
			</div>
		`

})
})

// ------------departures flight info

$.getJSON('http://apis.is/flight?language=en&type=arrivals').then(function(departuresRes){
	var departuresObj = departuresRes.results

	forEach(departuresObj, function(departuresEl, index, theArray){

		var departuresHtml = `
		<div class="departures">
			<h5>Departures</h5>
			<div class="row">
				<div class="col-xs-3">
						<div class="caption">
						<h4>Date</h4>
						<p>${departuresEl.date}</p>
						</div>
				</div>
				<div class="col-xs-3">
						<div class="caption">
						<h4>Arrival Time</h4>
						<p>${departuresEl.plannedArrival}</p>
						</div>
				</div>
				<div class="col-xs-3">
					<div class="caption">
					<h4>Destination</h4>
					<p>${departuresEl.to}</p>
					</div>
				</div>
				<div class="col-xs-3">
					<div class="caption">
					<h4>Airline</h4>
					<p>${departuresEl.airline}</p>
					</div>
				</div>
				</div>
			</div>
		`
})
})


// -----------flight info both
// var flightsHtml = `
// 	<div class='flights'>
// 		<h2>Flights</h2>
// 		<div class="row">
// 			<div class="col-xs-6">
// 				<div class="caption">
// 				${arrivalsHtml}
// 				</div>
// 			</div>
// 			<div class="col-xs-6">
// 				<div class="caption">
// 				${departuresHtml}
// 				</div>
// 			</div>
// 		</div>
// 	</div>
// `
//
// if (clickedTabEl.dataset.route === 'flights'){pageContentEl.innerHTML = flightsHtml}
// 	return flightsHtml

})
