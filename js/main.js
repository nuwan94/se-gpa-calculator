$(document).ready(function () {
    $('.tabs').tabs();
    $('select').formSelect();
    $('.loader').delay(1000).fadeOut();
});

var app = angular.module('app', []);

app.controller('gpaCtrl', function ($scope) {

    $scope.cgpa = 0.0;

    $scope.savedSubjects = localStorage.getItem('subjects');
    $scope.savedGPA = localStorage.getItem('cgpa');

    if ($scope.savedSubjects == undefined || ($scope.savedSubjects == null) || ($scope.savedSubjects == "undefined")) {
        $scope.subjects = [
            {
                year:'1', 
                sems: [{
                    sem: '1',
                    subs: [{
                        name: 'FUNDAMENTALS OF COMPUTING',
                        id: 'SENG 11213',
                        cd: 3,
                    }, {
                        name: 'PROGRAMMING CONCEPTS',
                        id: 'SENG 11223',
                        cd: 3,
                    }, {
                        name: 'ENGINEERING FOUNDATION',
                        id: 'SENG 11232',
                        cd: 2,
                    }, {
                        name: 'STATISTICS',
                        id: 'SENG 11243',
                        cd: 3,
                    }, {
                        name: 'DISCREET MATHEMATICS FOR COMPUTING I A',
                        id: 'PMAT 11212',
                        cd: 2,
                    }, {
                        name: 'ENGLISH FOR PROFESSIONALS',
                        id: 'DELT 11212',
                        cd: 2,
                    }]
                },
                {
                    sem: '2',
                    subs: [{
                        name: 'DATA STRUCTURES AND ALGORITHMS',
                        id: 'SENG 12213',
                        cd: 3,
                    }, {
                        name: 'DATABASE DESIGN AND DEVELOPMENT',
                        id: 'SENG 12223',
                        cd: 3,
                    }, {
                        name: 'OBJECT ORIENTED PROGRAMMING',
                        id: 'SENG 12233',
                        cd: 3,
                    }, {
                        name: 'MANAGEMENT FOR SOFTWARE ENGINEERING I',
                        id: 'SENG 12242',
                        cd: 2,
                    }, {
                        name: 'DISCREET MATHEMATICS FOR COMPUTING II B',
                        id: 'PMAT 12212',
                        cd: 2,
                    }, {
                        name: 'COMMUNICATION SKILLS FOR PROFESSIONALS',
                        id: 'DELT 12312',
                        cd: 2,
                    }]
                }]
            },
            {
                year:'2', 
                sems: [{
                    sem: '3',
                    subs: [{
                        name: 'COMPUTER ARCHITECTURE AND OPERATING SYSTEMS',
                        id: 'SENG 21213',
                        cd: 3,
                    }, {
                        name: 'SOFTWARE CONSTRUCTIONS',
                        id: 'SENG 21222',
                        cd: 2,
                    }, {
                        name: 'Requirement Engineering',
                        id: 'SENG 21233',
                        cd: 3,
                    }, {
                        name: 'Software Modelling',
                        id: 'SENG 21243',
                        cd: 3,
                    }, {
                        name: 'Web Application Development',
                        id: 'SENG 21253',
                        cd: 3,
                    }, {
                        name: 'Interactive Application Development',
                        id: 'SENG 21263',
                        cd: 3,
                        opt : '1'
                    }, {
                        name: 'Management for Software Engineering II',
                        id: 'SENG 21272',
                        cd: 2,
                    }, {
                        name: 'Computer Netwokrs',
                        id: 'SENG 24213',
                        cd: 3,
                    }]
                },
                {
                    sem: '4',
                    subs: [{
                        name: 'Software Architecture and Design',
                        id: 'SENG 22212',
                        cd: 3,
                    }, {
                        name: 'Human Computer Interaction',
                        id: 'SENG 22223',
                        cd: 3,
                    }, {
                        name: 'Software Verification and Validation',
                        id: 'SENG 22233',
                        cd: 3,
                    }, {
                        name: 'Mobile Application Development',
                        id: 'SENG 22243',
                        cd: 3,
                    }, {
                        name: 'Embedded Systems Development',
                        id: 'SENG 22253',
                        cd: 3,
                        opt : '1'
                    }, {
                        name: 'Mathematical Methods',
                        id: 'PMAT 22213',
                        cd: 3,
                        opt : '1'
                    }]
                }]
            },
            {
                year:'3', 
                sems: [{
                    sem: '5',
                    subs: [{
                        name: 'Add Soon',
                        id: '',
                        cd: 0,
                    }]
                },
                {
                    sem: '6',
                    subs: [{
                        name: 'Add Soon',
                        id: '',
                        cd: 0,
                    }]
                }]
            },{
                year:'4', 
                sems: [{
                    sem: '7',
                    subs: [{
                        name: 'Add Soon',
                        id: '',
                        cd: 0,
                    }]
                },
                {
                    sem: '8',
                    subs: [{
                        name: 'Add Soon',
                        id: '',
                        cd: 0,
                    }]
                }]
            }
        ];
    } else {
        $scope.subjects = JSON.parse($scope.savedSubjects);
        $scope.cgpa = JSON.parse($scope.savedGPA);
    }

    $scope.grades = [
        {name: 'A+' , val: 4.000000000000001},
        {name: 'A'  , val: 4.0},
        {name: 'A-' , val: 3.7}, 
        {name: 'B+' , val: 3.3}, 
        {name: 'B'  , val: 3.0}, 
        {name: 'B-' , val: 2.7}, 
        {name: 'C+' , val: 2.3}, 
        {name: 'C'  , val: 2.0}, 
        {name: 'C-' , val: 1.7}, 
        {name: 'D+' , val: 1.3}, 
        {name: 'D'  , val: 1.0}, 
        {name: 'D-' , val: 0.7}, 
        {name: 'E'  , val: 0.3},
        {name: '-'  , val: 0.0}
    ]

    $scope.reset = function reset() {
        localStorage.removeItem('subjects');
        localStorage.removeItem('cgpa');
        window.location.reload();
    }

    $scope.updateGPA = function updateGPA() {
        M.toast({html: 'Saving...',displayLength:500, classes: 'indigo'})
        var tgpa = 0;
        var tcd = 0;
        for (i = 0; i < $scope.subjects.length; i++) {
            var year = $scope.subjects[i];
            for(k = 0; k < year.sems.length; k++) {
                var sem = $scope.subjects[i].sems[k];
                var tsemGPA = 0;
                var tsemCD = 0;
                for (j = 0; j < sem.subs.length; j++) {
                    var sub = sem.subs[j];
                    if (sub.grade) {
                        tsemGPA += (sub.grade * sub.cd);
                        tsemCD += sub.cd;
                        tgpa += (sub.grade * sub.cd);
                        tcd += sub.cd;
                    }
                }
                sem.tCd = tsemCD;
                sem.semgpa = tsemGPA / tsemCD;
            }
            
        }
        $scope.cgpa = tgpa / tcd;
        localStorage.setItem('subjects', angular.toJson($scope.subjects));
        localStorage.setItem('cgpa', angular.toJson($scope.cgpa));
    }

});