'use strict';

var app = angular.module('myApp', []);

app.controller('appController', ['$scope','$http', function ($scope,$http) {

//	$('#exampleModalCenter').modal('toggle');
	$scope.popoverContent="";
    $scope.starRating1 = 0;
    $scope.hoverRating1 = 0;
	
		
	$http.get('https://www.naviadoctors.com/visit_feedback/front_end_test')
	.success(function(data) {
   console.log(data);
   $scope.ratings = data.ratings;
})
.error(function(data) {
   // error stuff
});
	

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
		$('#rate'+param).popover('show')
        console.log('mouseHover(' + param + ')');
        $scope.hoverRating1 = param;
    };

    $scope.mouseLeave1 = function (param) {
		$('#rate'+param).popover('hide')
        console.log('mouseLeave(' + param + ')');
        $scope.hoverRating1 = param + '*';
    };

 $scope.submit=function()
 {
	 if($scope.mandatory!="" && $scope.mandatory!=undefined)
		 {
	 console.log("in submit");
	 swal("Your feedback has been recorded.", "Thank You!", "success");
		 }
 };
 
}]);

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