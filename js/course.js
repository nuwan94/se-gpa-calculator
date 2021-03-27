/* 

GPA Calculator by Nuwan94
https://github.com/nuwan94/se-gpa-calculator

*/


var courseName = "Software Engineering - University of Kelaniya";

var courseUnits = [{
    year: '1',
    sems: [{
        sem: '1',
        subs: [{
            name: 'Fundamentals of Computing',
            id: 'SENG 11213'
        }, {
            name: 'Programming Concepts',
            id: 'SENG 11223'
        }, {
            name: 'Engineering Foundation',
            id: 'SENG 11232'
        }, {
            name: 'Statistics',
            id: 'SENG 11243'
        }, {
            name: 'Discreet Mathematics for Computing I A',
            id: 'PMAT 11212'
        }, {
            name: 'English for Professionals',
            id: 'DELT 11212'
        }]
    },
    {
        sem: '2',
        subs: [{
            name: 'Data Structures and Algorithms',
            id: 'SENG 12213'
        }, {
            name: 'Database Design and Development',
            id: 'SENG 12223'
        }, {
            name: 'Object Oriented Programming',
            id: 'SENG 12233'
        }, {
            name: 'Management for Software Engineering I',
            id: 'SENG 12242'
        }, {
            name: 'Discreet Mathematics for Computing Ii B',
            id: 'PMAT 12212'
        }, {
            name: 'Communication Skills for Professionals',
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
            name: 'Computer Architecture and Operating Systems',
            id: 'SENG 21213'
        }, {
            name: 'Software Constructions',
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
            name: 'Management for Software Engineering II',
            id: 'SENG 21272'
        }, {
            name: 'Computer Networks',
            id: 'SENG 24213'
        }, {
            name: 'Interactive Application Development',
            id: 'SENG 21263',
            type: 'o'
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
        }, {
            id: "SENG 31282",
            name: "Computer Network Management",
            type: 'o'
        },

        // Not Available for 2015/16
        {
            id: "SENG 31272",
            name: "Internet of Things",
            type: 'o'
        }, {
            id: "SENG 31292",
            name: "Enterprise Information Systems",
            type: 'o'
        },
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
            name: "Medical Imaging and Biomedical Signal Processing",
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