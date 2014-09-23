angular.module("ngTimer", [])
    .directive('timer', ['$interval', '$cookieStore',
        function ($interval, $cookieStore) {

            function link(scope, element, attrs) {
                var timeoutId,
                    seconds;
                
                seconds = $cookieStore.get('timer');
                if(seconds == null)
                {
                    seconds = 0;
                } 

                function updateTime() {
                    seconds++;
                    element.text(pad(parseInt(seconds / 60)) +":" + pad(seconds % 60));
                    scope.val = seconds;
                    $cookieStore.put('timer', seconds);
                }
                
                function pad(val) {
                    var valString = val + "";
                    if (valString.length < 2) {
                        return "0" + valString;
                    } else {
                        return valString;
                    }
                }

                /*
                element.on('$destroy', function () {
                    $interval.cancel(timeoutId);
                });
                */

                // start the UI update process; save the timeoutId for canceling
                timeoutId = $interval(function () {
                    updateTime(); // update DOM
                }, 1000);
            }

            return {
                restrict: 'EA', //E = element, A = attribute, C = class, M = comment   
                scope: {val: '='  },
                link: link
            };

}]);