// Define a new module. 
var app = angular.module("TellAStoryApp", []);

// Create and register the new "instagram" service
app.factory('instagram', function($resource){

	return {
		fetchPopular: function(callback){

			// The ngResource module gives us the $resource service. It makes working with
			// AJAX easy. Here I am using a client_id of a test app. Replace it with yours.

			var api = $resource('https://api.instagram.com/v1/media/popular?client_id=:client_id&callback=JSON_CALLBACK',{
				client_id: '642176ece1e7445e99244cec26f4de1f'
			},{
				// This creates an action which we've chosen to name "fetch". It issues
				// an JSONP request to the URL of the resource. JSONP requires that the
				// callback=JSON_CALLBACK part is added to the URL.

				fetch:{method:'JSONP'}
			});

			api.fetch(function(response){

				// Call the supplied callback function
				callback(response.data);

			});
		}
	}

});

// The controller. Notice that I've included our instagram service which we
// defined below. It will be available inside the function automatically.

app.controller('StoryController',function($scope){
	$scope.stories=[
		{'story':'Story 1',
		 'pic':'images/icon_01.png'},
		{'story':'Story 2',
		 'pic':'images/icon_02.png'},
		 {'story':'Story 3',
		 'pic':'images/icon_03.png'},
		 {'story':'Story 4',
		 'pic':'images/icon_04.png'},
		 {'story':'Story 5',
		 'pic':'images/icon_01.png'},
		 {'story':'Story 6',
		 'pic':'images/icon_02.png'},
		 {'story':'Story 7',
		 'pic':'images/icon_03.png'},
		 {'story':'Story 8',
		 'pic':'images/icon_04.png'},
		 {'story':'Story 9',
		 'pic':'images/icon_01.png'},
	];
});
