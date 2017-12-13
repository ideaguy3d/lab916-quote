/**
 * Created by julius on 12/7/2017.
 */
/**
 * Created by Julius Alvarado
 */
(function () {
    "use strict";

    var app = angular.module('quote', []),
        controllerId = 'QuoteCtrl',
        factoryId = 'jDataSer';


    //#region Quiz Application:
    app.factory(factoryId, ['$http', jDataServiceClass]);

    app.controller(controllerId, ['$scope', '$sce', 'jDataSer', QuoteCtrlClass]);

    function QuoteCtrlClass($scope, $sce, jDataSer) {
        $scope.introMessage = 'Test your knowledge';
        $scope.score = 0;
        $scope.activeQuestion = -1;
        $scope.activeQuestionAnswered = 0;
        $scope.percentScore = 0;
        $scope.optionIsSelected = false;
        $scope.status = "Wired up (:";
        $scope.contact = {};
        $scope.testVal = 0;

        $scope.createContact = function () {
            console.log("jha - $scope.contact = ");
            console.log($scope.contact);
            jDataSer.createHubspotContact($scope.contact).then(function(res) {
                $scope.testRes = "The response === "+res.data;
                console.log("jha - res.data =");
                console.log(res.data);
            });
        };

        $scope.testMe = function () {
            $scope.testVal++;
        };

        $scope.selectAnswer = function (indexQuestion, indexAnswer) {
            console.log("questionIndex = "+indexQuestion+" answerIndex = "+indexAnswer);
            var questionState = $scope.myQuestions[indexQuestion].questionState;
            $scope.myQuestions[indexQuestion].answers[indexAnswer].optionIsSelected =
                !$scope.myQuestions[indexQuestion].answers[indexAnswer].optionIsSelected;
            // .questionState is falsey because user has yet to click on an answer
            if (questionState !== 'answered') {
                $scope.myQuestions[indexQuestion].selectedAnswer = indexAnswer;
                var correctAnswer = $scope.myQuestions[indexQuestion].correct;
                $scope.myQuestions[indexQuestion].correctAnswer = correctAnswer;

                if (indexAnswer === correctAnswer) {
                    $scope.myQuestions[indexQuestion].correctness = 'correct';
                    $scope.score += 1;
                } else {
                    $scope.myQuestions[indexQuestion].correctness = 'incorrect';
                }
                // now that user has clicked on an answer I now set .questionState
                $scope.myQuestions[indexQuestion].questionState = 'answered';
            }

            $scope.percentScore = (100 * ($scope.score / $scope.totalQuestions)).toFixed(2);
        };

        $scope.isSelected = function (qIndex, aIndex) {
            return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
        };

        $scope.isCorrect = function (qIndex, aIndex) {
            return $scope.myQuestions[qIndex].correctAnswer === aIndex;
        };

        $scope.selectContinue = function () {
            console.log("jha - activeQuestion = "+$scope.activeQuestion);
            return $scope.activeQuestion += 1;
        };

        $scope.createShareLinks = function (percent) {
            var url = 'http://php1.julius3d.com';
            var emailLink = '<a href="mailto:?subject=Quiz Score.&amp;body=Beat my ' + percent +
                '% quiz score at ' + url + ' studios." class="btn btn-sm btn-warning email">Email</a>';
            var tweetLink = '<a href="http://twitter.com/share?text=I scored ' + percent + ' on my AngularJS quiz. ' +
                'Beat my score at &hashtags=ngQuiz&url=' + url + '" target="_blank" class="btn btn-sm btn-info twitter">Tweet</a>';

            var newMarkup = emailLink + tweetLink;
            return $sce.trustAsHtml(newMarkup);
        };

        activate();
        function activate() {
            jDataSer.getLocalQuizData().then(function (res) {
                $scope.myQuestions = res.data;
                $scope.totalQuestions = $scope.myQuestions.length;
            });
        }
    }

    function jDataServiceClass($http) {

        var getQuizData = function () {
            return $http.get('api/quiz/get-quiz-data.php?jtoken=public');
        };

        var getLocalQuizData = function () {
            return $http.get('quote_data.json')
        };

        var createHubspotContact = function(data) {
            var action = encodeURIComponent('createContact');
            var name = encodeURIComponent(data.name);
            var email = encodeURIComponent(data.email);
            var number = encodeURIComponent(data.number);
            var message = encodeURIComponent(data.message);
            console.log("jha - query string = ");
            console.log('php/hubspot1.php?action='+action+'name='+name+'&email='
                +email+'&number='+number+'&message='+message);
            return $http.get('php/hubspot1.php?action='+action+'&name='+name+'&email='
                +email+'&number='+number+'&message='+message);
        };


        return {
            getQuizData: getQuizData,
            getLocalQuizData: getLocalQuizData,
            createHubspotContact: createHubspotContact
        }
    }

    //#endregion
}());