$(document).ready(function () {
    $('.tabs').tabs();
    $('select').formSelect();

});

var app = angular.module('app', []);

app.controller('gpaCtrl', function ($scope) {

    $scope.cgpa = 0.0;

    $scope.savedSubjects = localStorage.getItem('subjects');
    $scope.savedGPA = localStorage.getItem('cgpa');

    if ($scope.savedSubjects == undefined || ($scope.savedSubjects == null) || ($scope.savedSubjects == "undefined")) {
        $scope.subjects = [{
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
            }
        ];
    } else {
        $scope.subjects = JSON.parse($scope.savedSubjects);
        $scope.cgpa = JSON.parse($scope.savedGPA);
    }

    $scope.grades = [
        {name: 'A+' , val: 4.0},
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
    ]

    $scope.reset = function reset() {
        localStorage.removeItem('subjects');
        localStorage.removeItem('cgpa');
        window.location.reload();
    }

    $scope.updateGPA = function updateGPA() {
        var tgpa = 0;
        var tcd = 0;
        for (i = 0; i < $scope.subjects.length; i++) {
            var sem = $scope.subjects[i];
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
            sem.semgpa = tsemGPA / tsemCD;
        }
        $scope.cgpa = tgpa / tcd;
        localStorage.setItem('subjects', angular.toJson($scope.subjects));
        localStorage.setItem('cgpa', angular.toJson($scope.cgpa));
    }

});