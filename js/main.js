$(document).ready(function () {
    $('.tabs').tabs();
    $('select').formSelect();
    $('.loader').delay(1000).fadeOut();
});

var app = angular.module('app', []);

app.filter('getType', function () {
    return function (x) {
        switch (x) {
            case 'o':
                return 'Optional';
            case 'n':
                return "Net";
            case 'm':
                return "Mobile";
            case 'd':
                return "Data";
            case 'h':
                return "Health";
            case 'b':
                return "Business";
            case 'g':
                return "Gaming";
        }
    }
})


app.filter('getClass', function () {
    return function (x) {
        var className = "";
        if (x >= 4) {
            className = "Green";
        } else if (x >= 3) {
            className = "Blue";
        } else if (x >= 2) {
            className = "Orange";
        } else {
            className = "Grey";
        }
        return className;
    };
});

app.controller('gpaCtrl', function ($scope) {

    $scope.cgpa = 0.0;

    $scope.savedSubjects = localStorage.getItem('subjects');
    $scope.savedGPA = localStorage.getItem('cgpa');

    if ($scope.savedSubjects == undefined || ($scope.savedSubjects == null) || ($scope.savedSubjects == "undefined")) {
        $scope.subjects = [{
                year: '1',
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
                    }
                ]
            },
            {
                year: '2',
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
                            type: 'o'
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
                            type: 'o'
                        }, {
                            name: 'Mathematical Methods',
                            id: 'PMAT 22213',
                            cd: 3,
                            type: 'o'
                        }]
                    }
                ]
            },
            {
                year: '3',
                sems: [{
                        sem: '5',
                        subs: [{
                            id: "SENG 31212",
                            name: "Software Quality",
                            cd: 2
                        }, {
                            id: "SENG 31232",
                            name: "Information Security",
                            cd: 2
                        }, {
                            id: "SENG 31212",
                            name: "Software Project Management",
                            cd: 2
                        }, {
                            id: "SENG 31252",
                            name: "Professional Practices",
                            cd: 2
                        }, {
                            id: "SENG 31262",
                            name: "Research Methods",
                            cd: 2
                        }, {
                            id: "SENG 31272",
                            name: "Internet of Things",
                            cd: 2
                        }, {
                            id: "SENG 31282",
                            name: "Computer Network Management",
                            cd: 2
                        }, {
                            id: "SENG 31292",
                            name: "Enterprise Information Systems",
                            cd: 2
                        }, {
                            id: "SENG 34213",
                            name: "Systems Development Project",
                            cd: 3
                        }, {
                            id: "SENG 34222",
                            name: "Software Process",
                            cd: 2
                        }, {
                            id: "SENG 31313",
                            name: "Advanced Web Applications Development",
                            cd: 3,
                            type: 'n'
                        },{
                            id: "SENG 31323",
                            name: "Mobile Computing Technologies",
                            cd: 3,
                            type: 'm'
                        },{
                            id: "SENG 31333",
                            name: "Business Intelligence and Management Support Systems",
                            cd: 3,
                            type: 'd'
                        },{
                            id: "SENG 31343",
                            name: "Health Information Management",
                            cd: 3,
                            type: 'h'
                        },{
                            id: "SENG 31353",
                            name: "Game Development Technology",
                            cd: 3,
                            type: 'g'
                        },{
                            id: "SENG 31363",
                            name: "Business Systems Modelling and Optimization",
                            cd: 3,
                            type: 'b'
                        }]
                    },
                    {
                        sem: '6',
                        subs: [{
                            id: "SENG 32216",
                            name: "Internship",
                            cd: 6
                        }]
                    }
                ]
            }, {
                year: '4',
                sems: [{
                        sem: '7',
                        subs: [{
                            name: 'Software Evolution',
                            id: 'SENG 41212',
                            cd: 2,
                        }, {
                            name: 'Software Metrics and Measurements',
                            id: 'SENG 41222',
                            cd: 2,
                        }, {
                            name: 'Digital Image Processing',
                            id: 'SENG 41233',
                            cd: 3,
                            type: 'o'
                        }, {
                            name: 'Advanced Databases',
                            id: 'SENG 41242',
                            cd: 2,
                            type: 'o'
                        }, {
                            name: 'Advanced Computer Networks',
                            id: 'SENG 41252',
                            cd: 2,
                            type: 'o'
                        }, {
                            name: 'Speech Interfaces',
                            id: 'SENG 41262',
                            cd: 2,
                            type: 'o'
                        }, {
                            name: 'Formal Methods',
                            id: 'SENG 41272',
                            cd: 2,
                            type: 'o'
                        }, {
                            id: "SENG 41283",
                            name: "Distributed and Cloud Computing",
                            cd: 3,
                            type: 'n'
                        },{
                            id: "SENG 41293",
                            name: "Mobile Web Application Development",
                            cd: 3,
                            type: 'm'
                        },{
                            id: "SENG 41303",
                            name: "Big Data Infrastructure",
                            cd: 3,
                            type: 'd'
                        },{
                            id: "SENG 41313",
                            name: "Health Information Systems Design and Development",
                            cd: 3,
                            type: 'h'
                        },{
                            id: "SENG 41323",
                            name: "Games Design, Artwork, and Programming",
                            cd: 3,
                            type: 'g'
                        },{
                            id: "SENG 41333",
                            name: "Computer Based Operations Management",
                            cd: 3,
                            type: 'b'
                        }]
                    },
                    {
                        sem: '8',
                        subs: [{
                            name: 'Software Safety and Reliability',
                            id: 'SENG 42212',
                            cd: 2,
                        }, {
                            name: 'Usability Engineering',
                            id: 'SENG 42222',
                            cd: 2,
                            type: 'o'
                        }, {
                            name: 'Software Management',
                            id: 'SENG 42232',
                            cd: 2,
                            type: 'o'
                        }, {
                            name: 'Machine Learning',
                            id: 'SENG 42242',
                            cd: 2,
                            type: 'o'
                        }, {
                            name: 'Computer Graphics',
                            id: 'SENG 42252',
                            cd: 2,
                            type: 'o'
                        }, {
                            name: 'Software Engineering Research Project',
                            id: 'SENG 43216',
                            cd: 6,
                        }, {
                            id: "SENG 42273",
                            name: "Semantic Web and Ontological Engineering",
                            cd: 3,
                            type: 'n'
                        },{
                            id: "SENG 42283",
                            name: "Mobile Networks",
                            cd: 3,
                            type: 'm'
                        },{
                            id: "SENG 42293",
                            name: "Big Data Analytics",
                            cd: 3,
                            type: 'd'
                        },{
                            id: "SENG 42303",
                            name: "Medical Imaging and Biomedial Signal Processing",
                            cd: 3,
                            type: 'h'
                        },{
                            id: "SENG 42313",
                            name: "Advanced Topics in Game Design and Animation",
                            cd: 3,
                            type: 'g'
                        },{
                            id: "SENG 42323",
                            name: "Business Process Engineering",
                            cd: 3,
                            type: 'b'
                        }]
                    }
                ]
            }
        ];
    } else {
        $scope.subjects = JSON.parse($scope.savedSubjects);
        $scope.cgpa = JSON.parse($scope.savedGPA);
    }

    $scope.grades = [{
            name: 'A+',
            val: 4.000000000000001
        },
        {
            name: 'A',
            val: 4.0
        },
        {
            name: 'A-',
            val: 3.7
        },
        {
            name: 'B+',
            val: 3.3
        },
        {
            name: 'B',
            val: 3.0
        },
        {
            name: 'B-',
            val: 2.7
        },
        {
            name: 'C+',
            val: 2.3
        },
        {
            name: 'C',
            val: 2.0
        },
        {
            name: 'C-',
            val: 1.7
        },
        {
            name: 'D+',
            val: 1.3
        },
        {
            name: 'D',
            val: 1.0
        },
        {
            name: 'D-',
            val: 0.7
        },
        {
            name: 'E',
            val: 0.3
        },
        {
            name: '-',
            val: 0.0
        }
    ]

    $scope.reset = function reset() {
        localStorage.removeItem('subjects');
        localStorage.removeItem('cgpa');
        window.location.reload();
    }

    $scope.updateGPA = function updateGPA() {
        M.toast({
            html: 'Saving...',
            displayLength: 500,
            classes: 'indigo'
        })
        var tgpa = 0;
        var tcd = 0;
        for (i = 0; i < $scope.subjects.length; i++) {
            var year = $scope.subjects[i];
            for (k = 0; k < year.sems.length; k++) {
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