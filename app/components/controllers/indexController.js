
phoenix.controller('IndexController', ['$scope', '$rootScope','$routeParams', '$location', 'config','constants', 'CategoryService','PostService', 'Service', indexController]);

function indexController ($scope, $rootScope, $routeParams, $location, config, constants, categoryService, postService, service) {

    $scope.location = $location;

    $scope.constants = constants;

    $scope.theme = config.theme;
    $scope.pagItemsPerPage = config.pagItemsPerPage;

    //Load categories
    categoryService.list(function(categories){
        $scope.categories = categories;
    });

    //Load menu
    service.get('content/menus/menu.json',function(data){
        $scope.menuLinks = data;
    });

    //Local Social
    service.get('content/social.json',function(data){
        $scope.social = data;
    });

    //Config menu navigation
    $scope.isActive = function(item) {
      if (item.url == "#"+$location.path()) {
        return true;
      }
      return false;
    };

    //Add Search support
    $scope.searchPosts = function(search){
        $location.path("/search/"+search);
    }

    //When page change, scrol to top
    $scope.pageChangeHandler = function(num) {
      window.scrollTo(0, 0);
    };

}
