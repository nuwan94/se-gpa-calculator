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

app.filter('getGradeClass', function () {
    return function (x) {
        var className = "";
        if (x > 4) {
            className = "light-green accent-3";
        } else if (x == 4) {
            className = "light-green accent-2";
        } else if (x >= 3) {
            className = "cyan accent-3";
        } else if (x >= 2) {
            className = "amber lighten-2";
        } else if (x >= 0.3) {
            className = "lime lighten-4";
        } else {
            className = ""
        }
        return className;
    };
});

app.controller('gpaCtrl', function ($scope) {

    $scope.cgpa = 0.0;

    $scope.savedSubjects = localStorage.getItem('subjects');
    $scope.savedGPA = localStorage.getItem('cgpa');

    $scope.subjects = [{
            year: '1',
            sems: [{
                    sem: '1',
                    subs: [{
                        name: 'FUNDAMENTALS OF COMPUTING',
                        id: 'SENG 11213'
                    }, {
                        name: 'PROGRAMMING CONCEPTS',
                        id: 'SENG 11223'
                    }, {
                        name: 'ENGINEERING FOUNDATION',
                        id: 'SENG 11232'
                    }, {
                        name: 'STATISTICS',
                        id: 'SENG 11243'
                    }, {
                        name: 'DISCREET MATHEMATICS FOR COMPUTING I A',
                        id: 'PMAT 11212'
                    }, {
                        name: 'ENGLISH FOR PROFESSIONALS',
                        id: 'DELT 11212'
                    }]
                },
                {
                    sem: '2',
                    subs: [{
                        name: 'DATA STRUCTURES AND ALGORITHMS',
                        id: 'SENG 12213'
                    }, {
                        name: 'DATABASE DESIGN AND DEVELOPMENT',
                        id: 'SENG 12223'
                    }, {
                        name: 'OBJECT ORIENTED PROGRAMMING',
                        id: 'SENG 12233'
                    }, {
                        name: 'MANAGEMENT FOR SOFTWARE ENGINEERING I',
                        id: 'SENG 12242'
                    }, {
                        name: 'DISCREET MATHEMATICS FOR COMPUTING II B',
                        id: 'PMAT 12212'
                    }, {
                        name: 'COMMUNICATION SKILLS FOR PROFESSIONALS',
                        id: 'DELT 12312'
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
                        id: 'SENG 21213'
                    }, {
                        name: 'SOFTWARE CONSTRUCTIONS',
                        id: 'SENG 21222'
                    }, {
                        name: 'Requirement Engineering',
                        id: 'SENG 21233'
                    }, {
                        name: 'Software Modelling',
                        id: 'SENG 21243'
                    }, {
                        name: 'Web Application Development',
                        id: 'SENG 21253'
                    }, {
                        name: 'Interactive Application Development',
                        id: 'SENG 21263',
                        type: 'o'
                    }, {
                        name: 'Management for Software Engineering II',
                        id: 'SENG 21272'
                    }, {
                        name: 'Computer Netwokrs',
                        id: 'SENG 24213'
                    }]
                },
                {
                    sem: '4',
                    subs: [{
                        name: 'Software Architecture and Design',
                        id: 'SENG 22212'
                    }, {
                        name: 'Human Computer Interaction',
                        id: 'SENG 22223'
                    }, {
                        name: 'Software Verification and Validation',
                        id: 'SENG 22233'
                    }, {
                        name: 'Mobile Application Development',
                        id: 'SENG 22243'
                    }, {
                        name: 'Embedded Systems Development',
                        id: 'SENG 22253',
                        type: 'o'
                    }, {
                        name: 'Mathematical Methods',
                        id: 'PMAT 22213',
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
                            name: "Software Quality"
                        }, {
                            id: "SENG 31222",
                            name: "Information Security"
                        }, {
                            id: "SENG 31232",
                            name: "Software Project Management"
                        }, {
                            id: "SENG 31242",
                            name: "System Design Project"
                        }, {
                            id: "SENG 31252",
                            name: "Professional Practices"
                        }, {
                            id: "SENG 31262",
                            name: "Research Methods"
                        },

                        // Not Available for 2015/16
                        // {
                        //     id: "SENG 31272",
                        //     name: "Internet of Things",
                        //     type: 'o'
                        // }, {
                        //     id: "SENG 31282",
                        //     name: "Computer Network Management",
                        //     type: 'o'
                        // }, {
                        //     id: "SENG 31292",
                        //     name: "Enterprise Information Systems",
                        //     type: 'o'
                        // }, 
                        {
                            id: "SENG 34222",
                            name: "Software Process"
                        }, {
                            id: "SENG 31313",
                            name: "Advanced Web Applications Development",
                            type: 'n'
                        }, {
                            id: "SENG 31323",
                            name: "Mobile Computing Technologies",
                            type: 'm'
                        }, {
                            id: "SENG 31333",
                            name: "Business Intelligence and Management Support Systems",
                            type: 'd'
                        }, {
                            id: "SENG 31343",
                            name: "Health Information Management",
                            type: 'h'
                        }, {
                            id: "SENG 31353",
                            name: "Game Development Technology",
                            type: 'g'
                        }, {
                            id: "SENG 31363",
                            name: "Business Systems Modelling and Optimization",
                            type: 'b'
                        }
                    ]
                },
                {
                    sem: '6',
                    subs: [{
                        id: "SENG 34213",
                        name: "Systems Development Project"
                    }, {
                        id: "SENG 32216",
                        name: "Internship"
                    }]
                }
            ]
        }, {
            year: '4',
            sems: [{
                    sem: '7',
                    subs: [{
                        name: 'Software Evolution',
                        id: 'SENG 41212'
                    }, {
                        name: 'Software Metrics and Measurements',
                        id: 'SENG 41222'
                    }, {
                        name: 'Digital Image Processing',
                        id: 'SENG 41233',
                        type: 'o'
                    }, {
                        name: 'Advanced Databases',
                        id: 'SENG 41242',
                        type: 'o'
                    }, {
                        name: 'Advanced Computer Networks',
                        id: 'SENG 41252',
                        type: 'o'
                    }, {
                        name: 'Speech Interfaces',
                        id: 'SENG 41262',
                        type: 'o'
                    }, {
                        name: 'Formal Methods',
                        id: 'SENG 41272',
                        type: 'o'
                    }, {
                        id: "SENG 41283",
                        name: "Distributed and Cloud Computing",
                        type: 'n'
                    }, {
                        id: "SENG 41293",
                        name: "Mobile Web Application Development",
                        type: 'm'
                    }, {
                        id: "SENG 41303",
                        name: "Big Data Infrastructure",
                        type: 'd'
                    }, {
                        id: "SENG 41313",
                        name: "Health Information Systems Design and Development",
                        type: 'h'
                    }, {
                        id: "SENG 41323",
                        name: "Games Design, Artwork, and Programming",
                        type: 'g'
                    }, {
                        id: "SENG 41333",
                        name: "Computer Based Operations Management",
                        type: 'b'
                    }]
                },
                {
                    sem: '8',
                    subs: [{
                        name: 'Software Safety and Reliability',
                        id: 'SENG 42212'
                    }, {
                        name: 'Software Engineering Research Project',
                        id: 'SENG 43216'
                    }, {
                        name: 'Usability Engineering',
                        id: 'SENG 42222',
                        type: 'o'
                    }, {
                        name: 'Software Management',
                        id: 'SENG 42232',
                        type: 'o'
                    }, {
                        name: 'Machine Learning',
                        id: 'SENG 42242',
                        type: 'o'
                    }, {
                        name: 'Computer Graphics',
                        id: 'SENG 42252',
                        type: 'o'
                    }, {
                        id: "SENG 42273",
                        name: "Semantic Web and Ontological Engineering",
                        type: 'n'
                    }, {
                        id: "SENG 42283",
                        name: "Mobile Networks",
                        type: 'm'
                    }, {
                        id: "SENG 42293",
                        name: "Big Data Analytics",
                        type: 'd'
                    }, {
                        id: "SENG 42303",
                        name: "Medical Imaging and Biomedial Signal Processing",
                        type: 'h'
                    }, {
                        id: "SENG 42313",
                        name: "Advanced Topics in Game Design and Animation",
                        type: 'g'
                    }, {
                        id: "SENG 42323",
                        name: "Business Process Engineering",
                        type: 'b'
                    }]
                }
            ]
        }
    ];

    $scope.updateGPA = function updateGPA() {
        M.toast({
            html: 'Saving...',
            displayLength: 500,
            classes: 'indigo'
        })

        var numOfsubjects = 0;
        var totalGpa = 0;
        var totalCredit = 0;
        var counter = [0, 0, 0];

        for (i = 0; i < $scope.subjects.length; i++) {

            var year = $scope.subjects[i];
            var yearGPA = 0;
            var yearCredit = 0;

            for (k = 0; k < year.sems.length; k++) {
                var sem = $scope.subjects[i].sems[k];

                var semesterGPA = 0;
                var semesterCredit = 0;

                for (j = 0; j < sem.subs.length; j++) {
                    var sub = sem.subs[j];

                    if (sub.grade) {

                        numOfsubjects += 1;

                        if (sub.grade > 4.0) {
                            counter[0] += 1;
                        } else if (sub.grade == 4.0) {
                            counter[1] += 1;
                        } else if (sub.grade < 2.0) {
                            counter[2] += 1;
                        }

                        subGPA = (sub.grade * sub.id.substr(-1));
                        subCredit = 1 * sub.id.substr(-1);

                        semesterGPA += subGPA;
                        yearGPA += subGPA;
                        totalGpa += subGPA;

                        semesterCredit += subCredit;
                        yearCredit += subCredit;
                        totalCredit += subCredit;
                    }

                }
                sem.totalCredit = semesterCredit;
                sem.semgpa = semesterGPA / semesterCredit;
            }

            year.ygpa = yearGPA / yearCredit;
        }

        $scope.AplusCount = counter[0];
        $scope.ACount = counter[1];
        $scope.RepeatCount = counter[2];

        $scope.numOfSubjects = numOfsubjects;
        $scope.totalCd = totalCredit;
        $scope.cgpa = totalGpa / totalCredit;

        localStorage.setItem('subjects', angular.toJson($scope.subjects));
        localStorage.setItem('cgpa', angular.toJson($scope.cgpa));
    }

    if ($scope.savedSubjects == undefined || ($scope.savedSubjects == null) || ($scope.savedSubjects == "undefined")) {

    } else {

        $scope.loadSubjects = JSON.parse($scope.savedSubjects);

        try {

            for (i = 0; i < $scope.subjects.length; i++) {
                var year = $scope.subjects[i];
                for (k = 0; k < year.sems.length; k++) {
                    var sem = $scope.subjects[i].sems[k];
                    for (j = 0; j < sem.subs.length; j++) {
                        sem.subs[j].grade = $scope.loadSubjects[i].sems[k].subs[j].grade;
                    }
                }
            }
            $scope.updateGPA();

        } catch (err) {
            $scope.reset();
            console.log(err);
        }


    }

    $scope.grades = [{
            name: 'A+',
            val: 4.0000000001
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
            val: 0
        }
    ]

    $scope.reset = function reset() {
        localStorage.removeItem('subjects');
        localStorage.removeItem('cgpa');
        window.location.reload();
    }

});