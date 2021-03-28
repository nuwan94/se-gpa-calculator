var app = angular.module('app', []);

angular.element(function () {
    $('.tabs').tabs();
    $('select').formSelect();
    $('.loader').delay(500).fadeOut();
    $('.sidenav').sidenav();
    $('.modal').modal();
    $('.tooltipped').tooltip();
});

app.run(function ($rootScope) {
    $rootScope.courseTitle = courseName;
});

app.filter('getType', function () {
    return function (x) {
        let types = {
            o: 'Optional',
            n: 'Net',
            m: 'Mobile',
            d: 'Data',
            h: 'Health',
            b: 'Business',
            g: 'Gaming'
        };
        return types[x];
    }
});


app.filter('getGradeClass', function () {
    return function (x) {
        let className = "";
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

    $scope.grades = gradeValues;
    $scope.subjects = courseUnits;
    $scope.savedSubjects = localStorage.getItem('subjects');

    $scope.reset = function reset() {
        localStorage.removeItem('subjects');
        window.location.reload();
    }

    $scope.downloadResult = function downloadResult() {
        let data = JSON.stringify($scope.subjects);
        let name_date = new Date().toISOString().split("T")[0];
        let href = "data:text/json;charset=utf-8," + encodeURIComponent(data),
            anchor = document.createElement('a'),
            filename = 'gpa-calc-export - ' + name_date + '.json';
        anchor.setAttribute("href", href);
        anchor.setAttribute("download", filename);
        anchor.setAttribute("type", "json");
        anchor.click();
    }

    $scope.uploadResult = function uploadResult(fileEl) {
        var files = fileEl.files;
        var file = files[0];
        var reader = new FileReader();
        reader.onloadend = function (evt) {
            if (evt.target.readyState === FileReader.DONE) {
                $scope.$apply(function () {
                    $scope.subjects = JSON.parse(evt.target.result);
                    $scope.updateGPA();
                });
            }
        };
        reader.readAsText(file);
    }

    function calGPA(sumOfGPA, sumOfCredits) {
        return (sumOfCredits > 0) ? (sumOfGPA / sumOfCredits) : 0;
    }

    function findEligibility(gpa, results, sumGPA, credits) {

        let greetingsText = 'Hello',
            eligibilityText = 'World',
            style = 'green-text';

        if (gpa >= 3.70) {
            style = 'green-text';
            greetingsText = 'Brilliant!'
            eligibilityText = 'You are maintaining "First Class" degree. Keep it up!'
        } else if (gpa >= 3.30) {
            style = 'teal-text';
            greetingsText = 'Very Good!'
            eligibilityText = 'Currently you are in "Second Upper" degree level. Try little bit more to go to the "First Class".'

        } else if (gpa >= 3.00) {
            style = 'blue-text';
            greetingsText = 'Good!'
            eligibilityText = 'Currently you are in "Second Lower" degree level. Keep going.'

        } else if (gpa >= 2.00) {
            style = 'grey-text';
            greetingsText = 'Hmmm...'
            eligibilityText = 'Is "General Degree" enough for you? Work Hard! You can do better.'

        } else {
            style = 'red-text';
            greetingsText = 'Sorry!'
            eligibilityText = 'Currently you are not eligible for the degree.'
        }

        return {
            greetingsMsg: greetingsText,
            eligibilityMsg: eligibilityText,
            style: style
        };
    }

    $scope.updateGPA = function updateGPA() {
        M.toast({
            html: 'Saving...',
            displayLength: 500,
            classes: 'indigo'
        })

        let myResults = [];
        let myGPASubjectResults = [];
        let mySubjects = 0,
            totalNumOfSubjects = 0;
        let myTotalGPA = 0,
            myTotalCredit = 0,
            totalCourseCredit = 0;

        for (i = 0; i < $scope.subjects.length; i++) {

            let currentYear = $scope.subjects[i],
                yearGPA = 0,
                yearCredit = 0;

            for (k = 0; k < currentYear.sems.length; k++) {

                let semester = $scope.subjects[i].sems[k];

                let semesterGPA = 0,
                    semesterCredit = 0,
                    totalSemesterCredit = 0;

                for (j = 0; j < semester.subs.length; j++) {

                    let currentSubject = semester.subs[j];
                    let subjectCredit = (1 * currentSubject.id.substr(-1));

                    totalNumOfSubjects += 1;

                    if (currentSubject.grade) {

                        myResults.push(currentSubject.grade);
                        mySubjects += 1;

                        if (!currentSubject.type) {
                            myGPASubjectResults.push(currentSubject.grade);
                        }

                        let subjectGPA = (currentSubject.grade * currentSubject.id.substr(-1));

                        semesterGPA += subjectGPA;
                        yearGPA += subjectGPA;
                        myTotalGPA += subjectGPA;

                        semesterCredit += subjectCredit;
                        yearCredit += subjectCredit;
                        myTotalCredit += subjectCredit;
                    }
                    totalCourseCredit += subjectCredit;
                    totalSemesterCredit += subjectCredit;
                }

                semester.semesterCredit = semesterCredit;
                semester.totalSemesterCredit = totalSemesterCredit;
                semester.semesterGPA = calGPA(semesterGPA, semesterCredit);

            }

            currentYear.yearGPA = yearGPA / yearCredit;
            currentYear.yearCredit = yearCredit;
        }

        $scope.results = myResults.reduce((acc, e) => acc.set(e, acc.get(e) + 1 || 1), new Map());

        $scope.mySubjects = mySubjects;
        $scope.totalNumOfSubjects = totalNumOfSubjects;
        $scope.myTotalCredit = myTotalCredit;
        $scope.totalCourseCredit = totalCourseCredit;
        $scope.myGPA = calGPA(myTotalGPA, myTotalCredit)

        console.log(myGPASubjectResults);

        const {
            greetingsMsg,
            eligibilityMsg,
            style
        } = findEligibility($scope.myGPA, myGPASubjectResults, myTotalGPA, myTotalCredit);

        $scope.greetingsText = greetingsMsg;
        $scope.eligibilityText = eligibilityMsg;
        $scope.eligibleStyle = style;

        // if ( ((mySubjects/2) <= ($scope.results.get(4.0) + $scope.results.get(4.0000000001))) &&  $scope.myGPA >= 3.7 ) {
        //     $scope.greetingsText = "Congrats!";
        //     $scope.eligiblityText = "You are eligible for a First Class Honors Degree.";
        // }else{
        //     $scope.greetingsText = "";
        //     $scope.eligiblityText = "You are now in General Degree. Focus more!";
        // }


        localStorage.setItem('subjects', angular.toJson($scope.subjects));
        localStorage.setItem('myGPA', angular.toJson($scope.myGPA));
    }


    if ($scope.savedSubjects != undefined) {
        $scope.loadSubjects = JSON.parse($scope.savedSubjects);

        try {
            for (i = 0; i < $scope.subjects.length; i++) {
                let year = $scope.subjects[i];
                for (k = 0; k < year.sems.length; k++) {
                    let sem = $scope.subjects[i].sems[k];
                    for (j = 0; j < sem.subs.length; j++) {
                        sem.subs[j].grade = $scope.loadSubjects[i].sems[k].subs[j].grade;
                    }
                }
            }
            $scope.updateGPA();

        } catch (err) {
            $scope.reset();
            console.log("resetting...\n" + err);
        }

    }

});