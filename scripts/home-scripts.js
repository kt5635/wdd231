// Menu

const menuText = document.getElementById('menu-text');
const menu = document.getElementById('menu');

menuText.addEventListener('click', function() {
    menu.classList.toggle('active');
});

// course array 

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

// create cards

const cardContainer = document.getElementById("course-card-container");
const filterAll = document.getElementById("all-courses");
const filterCSE = document.getElementById("cse-courses");
const filterWDD = document.getElementById("wdd-courses");
const creditDisplay = document.getElementById("total-credits")

function createCard(course) {
    const card = document.createElement("div");
    card.classList.add("course-card");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const subject = document.createElement("p");
    subject.textContent = `${course.subject} ${course.number}`;
    cardBody.appendChild(subject);


    // change background color if course is complete

    if (course.completed) {
        card.classList.add('completed');
    }
    else {
        card.classList.add('incomplete');
    }

    card.appendChild(cardBody);
    return card;
}

// credit counter

function calculateTotalCredits(coursesArray) {
    return coursesArray.reduce((total, course) => total + course.credits, 0);
}

function displayTotalCredits(coursesArray) {
    const totalCredits = calculateTotalCredits(coursesArray);
    creditDisplay.textContent = `Total Credits: ${totalCredits}`;
}

function renderCourses(coursesArray) {
    cardContainer.innerHTML = "";
    coursesArray.forEach(course => {
        const cardElement = createCard(course);
        cardContainer.appendChild(cardElement);
    });

    displayTotalCredits(coursesArray);
}

renderCourses(courses);

filterAll.addEventListener("click", function(e) {
    e.preventDefault();
    renderCourses(courses);
});

filterCSE.addEventListener("click", function(e) {
    e.preventDefault();
    const filteredCSE = courses.filter(courses => courses.subject =="CSE");
    renderCourses(filteredCSE);
})

filterWDD.addEventListener("click", function(e) {
    e.preventDefault();
    const filteredWDD = courses.filter(courses => courses.subject =="WDD");
    renderCourses(filteredWDD);
})


// gets current date
const d = new Date();
let year = d.getFullYear();
document.getElementById("currentyear").innerHTML = year;

// last modified date

const date = new Date(document.lastModified);
document.getElementById("lastModified").innerHTML = date;

