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
	
	//this is used to store the selected rating
    $scope.starRating1 = 0;
    
    //this is used to store the rating of the star over which are hovering
    $scope.hoverRating1 = 0;
	
	//this post request gets the data according to which ratings needs to be recorded
	$http.get('https://www.naviadoctors.com/visit_feedback/front_end_test')
	.success(function(data) {
   $scope.ratings = data.ratings;
})
.error(function(data) {
   // error stuff
});
	

	// this function will be invoked when we will click on a star to give rating to the visit
    $scope.click1 = function (param) {
        console.log('Click(' + param + ')');
		if(param==1)
			document.getElementById('rate'+param).setAttribute('data-content',$scope.ratings[param]);
		if(param==2)
			document.getElementById('rate'+param).setAttribute('data-content',$scope.ratings[param]);
		if(param==3)
			document.getElementById('rate'+param).setAttribute('data-content',$scope.ratings[param]);
		if(param==4)
			document.getElementById('rate'+param).setAttribute('data-content',$scope.ratings[param]);
		if(param==5)
			document.getElementById('rate'+param).setAttribute('data-content',$scope.ratings[param]);
    };

 // this function will be invoked when we will hover over a star to give rating to the visit
    $scope.mouseHover1 = function (param) {
		
		
		if(param==1)
			document.getElementById('rate'+param).setAttribute('data-content',$scope.ratings[param]);
		if(param==2)
			document.getElementById('rate'+param).setAttribute('data-content',$scope.ratings[param]);
		if(param==3)
			document.getElementById('rate'+param).setAttribute('data-content',$scope.ratings[param]);
		if(param==4)
			document.getElementById('rate'+param).setAttribute('data-content',$scope.ratings[param]);
		if(param==5)
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
