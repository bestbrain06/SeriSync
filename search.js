document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.querySelector(".search-box input");
    const searchButton = document.querySelector(".search-box button");

    // Stop if the page does not contain a search box
    if (!searchInput || !searchButton) {
        return;
    }

    // ==============================
    // SERI SYNC WEBSITE SEARCH INDEX
    // ==============================

    const pages = [

        {
            name: "Home",
            url: "index.html",
            keywords: [
                "home",
                "serisync",
                "seri sync",
                "mathematics",
                "math",
                "sequence",
                "series",
                "learning",
                "education"
            ]
        },

        {
            name: "About Us",
            url: "ABOUT US.html",
            keywords: [
                "about",
                "about us",
                "team",
                "members",
                "group",
                "developers",
                "teachers",
                "students"
            ]
        },

        {
            name: "Contact Us",
            url: "CONTACT US.html",
            keywords: [
                "contact",
                "contact us",
                "email",
                "phone",
                "telephone",
                "address",
                "reach us"
            ]
        },

        {
            name: "Interactive Learning",
            url: "INTERACTIVE LEARNING.html",
            keywords: [
                "interactive",
                "interactive learning",
                "learning",
                "activities",
                "interactive activities",
                "learn",
                "simulation"
            ]
        },

        {
            name: "Practice Activities",
            url: "PRACTICE ACTIVITIES.html",
            keywords: [
                "practice",
                "practice activities",
                "exercise",
                "exercises",
                "questions",
                "problems",
                "solve",
                "practice questions"
            ]
        },

        {
            name: "Lesson 1 - Introduction to Sequences and Series",
            url: "LESSON 1.html",
            keywords: [
                "lesson 1",
                "introduction",
                "intro",
                "sequence",
                "sequences",
                "series",
                "sequence and series",
                "arithmetic sequence",
                "geometric sequence",
                "real life application"
            ]
        },

        {
            name: "Lesson 2 - Saving and Investment Plans",
            url: "LESSON 2.html",
            keywords: [
                "lesson 2",
                "saving",
                "savings",
                "investment",
                "invest",
                "investment plans",
                "money",
                "finance",
                "financial",
                "bank",
                "interest",
                "compound interest",
                "simple interest"
            ]
        },

        {
            name: "Lesson 3 - Population Growth",
            url: "LESSON 3.html",
            keywords: [
                "lesson 3",
                "population",
                "population growth",
                "growth",
                "increase",
                "population model",
                "birth",
                "death",
                "population increase"
            ]
        },

        {
            name: "Lesson 4 - Depreciation",
            url: "LESSON 4.html",
            keywords: [
                "lesson 4",
                "depreciation",
                "depreciate",
                "depreciated",
                "value",
                "decrease in value",
                "asset",
                "car",
                "property",
                "resale value"
            ]
        },

        {
            name: "More Lessons",
            url: "MORE LESSONS.html",
            keywords: [
                "more lessons",
                "more lesson",
                "additional lessons",
                "other lessons",
                "lessons"
            ]
        },

        {
            name: "Quizzes",
            url: "QUIZZES.html",
            keywords: [
                "quiz",
                "quizzes",
                "test",
                "tests",
                "assessment",
                "revision",
                "questions"
            ]
        },

        {
            name: "Quiz 1",
            url: "QUIZ 1.html",
            keywords: [
                "quiz 1",
                "first quiz",
                "test 1",
                "quiz one"
            ]
        },

        {
            name: "Quiz 2",
            url: "QUIZ 2.html",
            keywords: [
                "quiz 2",
                "second quiz",
                "test 2",
                "quiz two"
            ]
        },

        {
            name: "Quiz 3",
            url: "QUIZ 3.html",
            keywords: [
                "quiz 3",
                "third quiz",
                "test 3",
                "quiz three"
            ]
        },

        {
            name: "Videos",
            url: "VIDEOS.html",
            keywords: [
                "video",
                "videos",
                "watch",
                "tutorial",
                "tutorials",
                "mathematics videos",
                "lesson videos"
            ]
        }
    ];


    // ==============================
    // NORMALIZE SEARCH TEXT
    // ==============================

    function normalize(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s]/g, "")
            .replace(/\s+/g, " ");
    }


    // ==============================
    // SEARCH FUNCTION
    // ==============================

    function performSearch() {

        const query = normalize(searchInput.value);

        if (query === "") {
            alert("Please type something to search!");
            searchInput.focus();
            return;
        }

        let bestPage = null;
        let highestScore = 0;

        pages.forEach(function (page) {

            let score = 0;

            const pageName = normalize(page.name);

            // Exact page-name match
            if (pageName === query) {
                score += 100;
            }

            // Page name contains search query
            if (pageName.includes(query)) {
                score += 50;
            }

            // Check every keyword
            page.keywords.forEach(function (keyword) {

                const normalizedKeyword = normalize(keyword);

                // Exact keyword match
                if (normalizedKeyword === query) {
                    score += 40;
                }

                // Keyword contains search query
                if (normalizedKeyword.includes(query)) {
                    score += 25;
                }

                // Search query contains keyword
                if (query.includes(normalizedKeyword)) {
                    score += 20;
                }
            });

            // Check individual words
            const queryWords = query.split(" ");

            queryWords.forEach(function (word) {

                if (word.length < 2) {
                    return;
                }

                if (pageName.includes(word)) {
                    score += 10;
                }

                page.keywords.forEach(function (keyword) {

                    if (normalize(keyword).includes(word)) {
                        score += 5;
                    }

                });

            });


            // Save the page with the highest score
            if (score > highestScore) {
                highestScore = score;
                bestPage = page;
            }

        });


        // ==============================
        // REDIRECT TO BEST RESULT
        // ==============================

        if (bestPage && highestScore > 0) {

            window.location.href = bestPage.url;

        } else {

            alert(
                'No results found for "' +
                searchInput.value +
                '".\n\nTry searching for:\n' +
                'sequences, savings, investment, population, depreciation, practice, quiz, interactive learning, or contact.'
            );

            searchInput.focus();
        }
    }


    // ==============================
    // SEARCH BUTTON
    // ==============================

    searchButton.addEventListener("click", performSearch);


    // ==============================
    // ENTER KEY
    // ==============================

    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            event.preventDefault();
            performSearch();
        }

    });

});