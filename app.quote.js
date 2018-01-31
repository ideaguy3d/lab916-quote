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
        $scope.activeQuestion = 0; // set activeQuestion to -1 and uncomment 'Intro Slide' to get the intro slide back
        $scope.activeQuestionAnswered = 0;
        $scope.percentScore = 0;
        $scope.optionIsSelected = false;

        // contactHub is the real HubSpot req obj
        $scope.contactHubObject = {
            email: "test" + Math.random() + "@lab916.com",
            name: "user" + Math.random(),
            company: "",
            message: "message " + Math.random(),
            number: "916-123-4567",
            currentSalesChannels: [],
            companySnapshot: [],
            estimatedYearlySalesAllChannels: "",
            estimatedMonthlySalesAmazon: "",
            annualMarketingBudgetCompany: "",
            monthlyMarketingBudgetAmazon: "",
            amazonExperience: "",
            amazonBusinessGoals: ""
        };

        //-- used in the side navigation:
        $scope.changeActiveQuestion = function (idx) {
            $scope.activeQuestion = idx;
        };

        function createHubspotContact(shQuestion, answerObj) {
            if (shQuestion === "Currently Selling") {
                if (answerObj.optionIsSelected && answerObj.text !== "other") {
                    $scope.contactHubObject.currentSalesChannels[answerObj.id] = answerObj.text;
                } else {
                    if ($scope.contactHubObject.currentSalesChannels[answerObj.id] && answerObj.text !== "other") {
                        delete $scope.contactHubObject.currentSalesChannels[answerObj.id];
                    }
                }
                console.log("jha - $scope.contactHubObject.currentSalesChannels = ");
                console.log($scope.contactHubObject.currentSalesChannels);
            }
            // manage Company Snapshot slide
            else if (shQuestion === "Company Snapshot") {
                console.log("jha - $scope.contactHubObject.companySnapshot =");
                console.log($scope.contactHubObject.companySnapshot);
            }
            // manage Amazon Goals slide
            else if (shQuestion === "Amazon Goals") {

            }
            // manage Amazon Services slide
            else if (shQuestion === "Amazon Services") {

            }
            // manage Other Question slide
            else if (shQuestion === "Other Questions") {

            }
        }

        $scope.makeHubspotRequest = function () {
            jDataSer.createHubspotContact($scope.contactHubObject).then(function (res) {
                console.log("jha - res.data =");
                console.log(res.data);
            });
        };

        // sort of like the engine that powers this questionnaire
        $scope.selectAnswer = function (indexQuestion, indexAnswer) {
            var questionState = $scope.myQuestions[indexQuestion].questionState;

            //-- this will style the answer card to indicate it has been selected:
            $scope.myQuestions[indexQuestion].answers[indexAnswer].optionIsSelected =
                !$scope.myQuestions[indexQuestion].answers[indexAnswer].optionIsSelected;

            // questionState is always going to initially be falsey because user has yet to click on an answer
            if (questionState !== 'answered') {
                var correctAnswer = $scope.myQuestions[indexQuestion].correct;

                $scope.myQuestions[indexQuestion].selectedAnswer = indexAnswer;
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

            var sq = $scope.myQuestions[indexQuestion].shortenedQuestion;
            var ao = $scope.myQuestions[indexQuestion].answers[indexAnswer];
            createHubspotContact(sq, ao);
        };

        $scope.isSelected = function (qIndex, aIndex) {
            return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
        };

        $scope.isCorrect = function (qIndex, aIndex) {
            return $scope.myQuestions[qIndex].correctAnswer === aIndex;
        };

        $scope.selectContinue = function () {
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

        var createHubspotContact = function (data) {
            var email = encodeURIComponent(data.email);
            var name = encodeURIComponent(data.name);
            var company = encodeURIComponent(data.company);
            var message = encodeURIComponent(data.message);
            var number = encodeURIComponent(data.number);
            // each answer has an id, the index of the array is the answers id.
            var estimatedYearlySalesAllChannels = encodeURIComponent(data.companySnapshot[0]);
            var estimatedMonthlySalesAmazon = encodeURIComponent(data.companySnapshot[1]);
            var annualMarketingBudget = encodeURIComponent(data.companySnapshot[2]);
            var monthlyMarketingBudgetAmazon = encodeURIComponent(data.companySnapshot[3]);

            // current sales channels is an array, so convert to a str
            var currentSalesChannelsStr = "";
            data.currentSalesChannels.forEach(function (value) {
                currentSalesChannelsStr += (value + " __ ");
            });
            var currentSalesChannels = encodeURIComponent(currentSalesChannelsStr);

            var action = encodeURIComponent('createContact');
            return $http.get('php/hubspot1.php?action=' + action + '&name=' + name + '&email=' + email +
                '&number=' + number + '&message=' + message +
                '&current-selling-channels=' + currentSalesChannels +
                '&estimated-yearly-sales-all-channels=' + estimatedYearlySalesAllChannels +
                '&estimated-monthly-sales-amazon=' + estimatedMonthlySalesAmazon +
                '&annual-marketing-budget-for-company=' + annualMarketingBudget +
                '&monthly-budget-on-amazon=' + monthlyMarketingBudgetAmazon
            );
        };


        return {
            getQuizData: getQuizData,
            getLocalQuizData: getLocalQuizData,
            createHubspotContact: createHubspotContact
        }
    }

    //#endregion
}());