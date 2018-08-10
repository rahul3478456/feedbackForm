'use strict';

//the below create a Angular Js module
var app = angular.module('myApp', []);

// With the help of the module created in the above step we have created a controller function which will control the div assigned to it.
app.controller('appController', ['$scope','$http', function ($scope,$http) {
	
	//this is to store the review content
	$scope.review={	
		name:"",
		email:"",
		reviewDescription:"" };
	
	
    $scope.starRating1 = 0; //this is used to store the selected rating
    
 
    $scope.hoverRating1 = 0;    //this is used to store the rating of the star over which are hovering
	
	//this post request gets the data according to which ratings needs to be recorded
	$http.get('https://www.naviadoctors.com/visit_feedback/front_end_test')
	.success(function(data) {
   $scope.ratings = data.ratings; //Storing the values of comments based on the rating
   $scope.noOfRatings = Object.keys(data.ratings).length; //Storing the highest value of rating that a user can give
   $scope.colorSetter = Math.floor($scope.noOfRatings/2); // Setting different color to the selected rating indicator (E.g, Poor ratings will reflect red color and so on)
 	$scope.invoke=[1]; //This is to invoke the div containing the directive star rating after the api gets called
})
.error(function(data) {
   // error
});
	

	// this function is used to set color to the selected rating based on its priority when compared to the highest rating available.
    $scope.click1 = function (param) {
    	if(param <= $scope.colorSetter)
    		{
    		document.getElementById('selection').className = 'badge badge-danger';
    		}
    	else if(param >= $scope.noOfRatings-1)
    		{
    		document.getElementById('selection').className = 'badge badge-success';
    		}
    	else
    		{
    		document.getElementById('selection').className = 'badge badge-warning';
    		}
    
		document.getElementById('rate'+param).setAttribute('data-content',$scope.ratings[param]);	
    };

 // this function will be invoked when we will hover over a star while rating the visit
    $scope.mouseHover1 = function (param) {
    	document.getElementById('rate'+param).setAttribute('data-content',$scope.ratings[param]);
		$('#rate'+param).popover('show');
        $scope.hoverRating1 = param;
    };

    
    // // this function will be invoked when we will stop hovering over a star while giving rating to the visit
    $scope.mouseLeave1 = function (param) {
		$('#rate'+param).popover('hide');
        $scope.hoverRating1 = param + '*';
    };

   // this method will be invoked when we will submit the review for the visit
 $scope.submit=function()
 {
	 swal("Your feedback has been recorded.", "Thank You!", "success");	
 };
 
}]);


//Below is a custom directive which will control how we will rate the visit by selecting any number of stars
app.directive('starRating', function () {
    return {
        scope: {
            rating: '=',
            maxRating: '@',
            readOnly: '@',
            click: "&",
            mouseHover: "&",
            mouseLeave: "&"
        },
        restrict: 'EA',
        template:
            "<div style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer;' ng-repeat='idx in maxRatings track by $index'> \
                    <a id='rate{{$index+1}}' data-container='body' data-toggle='popover' data-placement='top'  data-content='aaa'>\
					<img ng-src='{{((hoverValue + _rating) <= $index) && \"image/star-empty-lg.png\" || \"image/star-fill-lg.png\"}}' \
                    ng-Click='isolatedClick($index + 1)' \
                    ng-mouseenter='isolatedMouseHover($index + 1)' \
                    ng-mouseleave='isolatedMouseLeave($index + 1)'></img> \
            </div>",
        compile: function (element, attrs) {
            if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
                attrs.maxRating = '5';
            };
        },
        controller: function ($scope, $element, $attrs) {
            $scope.maxRatings = [];

            for (var i = 1; i <= $scope.maxRating; i++) {
                $scope.maxRatings.push({});
            };

            $scope._rating = $scope.rating;
			
			$scope.isolatedClick = function (param) {
				if ($scope.readOnly == 'true') return;

				$scope.rating = $scope._rating = param;
				$scope.hoverValue = 0;
				$scope.click({
					param: param
				});
			};

			$scope.isolatedMouseHover = function (param) {
				if ($scope.readOnly == 'true') return;

				$scope._rating = 0;
				$scope.hoverValue = param;
				$scope.mouseHover({
					param: param
				});
			};

			$scope.isolatedMouseLeave = function (param) {
				if ($scope.readOnly == 'true') return;

				$scope._rating = $scope.rating;
				$scope.hoverValue = 0;
				$scope.mouseLeave({
					param: param
				});
			};
        }
    };
});
