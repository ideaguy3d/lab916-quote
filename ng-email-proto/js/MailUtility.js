angular.module('app')
    .factory('MailUtility', function () {
        var module = {};

        var nextId = 5;

        // Hardcoded mail list
        var mails = [
            {
                to: 'NathanExplosion@metal.com',
                subject: 'New Band Opportunity!',
                text: 'Nathan, I think it is time to reconsider your position at Dethklok... Let me know',
                id: 1
            }, {
                to: 'elon@tesla.com',
                subject: 'Re: Opportunity At Tesla',
                text: 'I appreciate the offer, but I have decided to pursue an opportunity with BitGo.',
                id: 2
            }, {
                to: 'bill@murray.com',
                subject: 'Dinner Tomorrow',
                text: 'Going to have to cancel. Going to golf with the Dalai Lama.  So I got that going for me, which is nice.',
                id: 3
            }, {
                to: 'candidate@gmail.com',
                subject: 'Angular Challenge',
                text: 'Good luck on the challenge. Looking forward to see what you come up with!',
                id: 4
            }
        ];

        module.getMails = function () {
            return mails;
        };

        module.createMail = function (mail) {
            mail.id = nextId;
            nextId++;
            mails.push(mail);
        };

        return module;
    });
