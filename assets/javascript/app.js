// Javascript populate buttons into div id ="animalButtons"
	//Array of animals, loops over them, and when clicked, the value of the button
	// Will display the 10 gifs
// When button clicked, goes to GIPHYAPI and pulls 10 images
// When giphy clicked, plays, clicked again, stops
// Image also displays rating
// Form id should allow user to enter another animal
	//Which creates another button to the array and display those 10 gifs when clicked

// Create buttons upon page load
$(function(){
	populateButtons(searchArray, "searchButton", "#buttonsArea");
	console.log("Page Loaded");
})


var searchArray = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", 
					"sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat",
					"chicken", "capybara", "teacup pig", "serval", "salamander", "frog", "falcon"];

function populateButtons(topics,classToAdd,areaToAddTo){

	//Empties button area or else we'll be adding in copies of out buttons
	$(areaToAddTo).empty();
	for (var i = 0; i < searchArray.length; i++){

		var a = $("<button>"); // Modifying a button element
		a.addClass(classToAdd);
		a.attr("data-type", searchArray[i]);
		a.text(searchArray[i]);
		$(areaToAddTo).append(a);

	}
}

$(document).on("click", ".searchButton", function(){
	var type = $(this).data("type");
	console.log(type);
	var queryURL = "https://api.giphy.com/v1/gifs/search?&api_key=ebd6d4e758dc4f3bafa1583e026f0910&q=" +type+ "&limit=10";
	$.ajax({url: queryURL, method: "GET"})
		.done(function(response){
			//Print out all results
			for (var i = 0; i < response.data.length; i++){
				var searchDiv = $('<div class="search-item">');
				var rating = response.data[i].rating;
				var p = $('<p>').text('Rating: ' +rating);
				var animated = response.data[i].images.fixed_height.url; // Retrieves animated GIF
				var still = response.data[i].images.fixed_height_still.url; // Retrieves still GIF
				var image = $("<img>");
				image.attr('src', still);
				image.attr('data-still', still);
				image.attr('data-animated', animated);
				image.attr('data-state', 'still');
				image.addClass('searchImage');
				searchDiv.append(p);
				searchDiv.append(image);
				$('#searches').append(searchDiv);
			}
		})
})

// When clicked on Gif, it will stop or play
$(document).on('click', '.searchImage', function(){
	var state = $(this).attr('data-state');
	if(state == 'still'){
		$(this).attr('src', $(this).data('animated'));
		$(this).attr('data-state', 'animated');
	} else {
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}
})

// Text Box adds in new buttons
$('#addSearch').on('click', function(){
	var newSearch = $('input').eq(0).val(); //eq is looking for input, (0) is looking for first
	searchArray.push(newSearch);
	populateButtons(searchArray, 'searchButton', '#buttonsArea');
	return false;
})
