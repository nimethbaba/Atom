// templates-script.js (Specific to the new templates.html page)

document.addEventListener('DOMContentLoaded', () => {

    // --- Template Data ---
    const templates = [
        {
            id: 'course-schedule',
            image: 'assets/illustrator/1.jpg',
            category: 'Education',
            title: 'Course Schedule',
            description: 'Organize your academic life with this comprehensive course schedule template. Keep track of classes, assignments, and deadlines with ease.',
            price: 'Free',
            link: 'template-details.html?id=course-schedule',
            keywords: 'course schedule university college student education academic planner notion template'
        },
        {
            id: 'crm-template',
            image: 'assets/illustrator/2.jpg',
            category: 'Work',
            title: 'CRM Template',
            description: 'A simple yet powerful CRM template for managing customer relationships, sales pipelines, and client interactions efficiently.',
            price: '$29',
            link: 'template-details.html?id=crm-template',
            keywords: 'crm customer relationship management sales business work client tracker notion template'
        },
        {
            id: 'goal-tracker',
            image: 'assets/illustrator/3.jpg',
            category: 'Productivity',
            title: 'Goal Tracker',
            description: 'Set, track, and achieve your personal and professional goals with this intuitive goal tracker template. Stay motivated and focused.',
            price: 'Free',
            link: 'template-details.html?id=goal-tracker',
            keywords: 'goal tracker personal development productivity habits motivation life planning notion template'
        },
        {
            id: 'homework-tracker',
            image: 'assets/illustrator/4.jpg',
            category: 'Education',
            title: 'Homework Tracker',
            description: 'Never miss a deadline again! This homework tracker helps students manage assignments, due dates, and study progress.',
            price: 'Free',
            link: 'template-details.html?id=homework-tracker',
            keywords: 'homework tracker assignments student school education study planner notion template'
        },
        {
            id: 'issue-tracker',
            image: 'assets/illustrator/5.jpg',
            category: 'Work',
            title: 'Issue Tracker',
            description: 'Streamline your project management with this issue tracker. Log, prioritize, and resolve issues efficiently within your team.',
            price: '$39',
            link: 'template-details.html?id=issue-tracker',
            keywords: 'issue tracker project management bug tracker software development team work notion template'
        },
        {
            id: 'job-application-tracker',
            image: 'assets/illustrator/6.jpg',
            category: 'Work',
            title: 'Job Application Tracker',
            description: 'Organize your job search with this comprehensive tracker. Keep tabs on applications, interviews, and follow-ups.',
            price: 'Free',
            link: 'template-details.html?id=job-application-tracker',
            keywords: 'job application tracker career job search employment interview resume notion template'
        },
        {
            id: 'travel-planner',
            image: 'assets/illustrator/7.jpg',
            category: 'Travel',
            title: 'Travel Planner',
            description: 'Plan your dream vacation with ease! This template helps you organize itineraries, bookings, budgets, and packing lists.',
            price: 'Free',
            link: 'template-details.html?id=travel-planner',
            keywords: 'travel planner vacation trip holiday itinerary adventure explore notion template'
        },
        {
            id: 'weekly-planner',
            image: 'assets/illustrator/8.jpg',
            category: 'Travel',
            title: 'Weekly Planner',
            description: 'Stay organized with this weekly planner template. Plan your week ahead, set priorities, and track your tasks effectively.',
            price: 'Free',
            link: 'template-details.html?id=weekly-planner',
            keywords: 'weekly planner organization time management productivity schedule tasks notion template'
        },
        {
            id: 'personal-dashboard',
            image: 'assets/illustrator/9.jpg',
            category: 'Productivity',
            title: 'Personal Dashboard',
            description: 'A customizable personal dashboard to manage all aspects of your life – tasks, notes, goals, and more – in one central place.',
            price: '$19',
            link: 'template-details.html?id=personal-dashboard',
            keywords: 'personal dashboard organization productivity life management daily planner notion template'
        }
    ];

    // --- DOM Elements (Updated to new class names) ---
    const templatesDisplayGrid = document.getElementById('templatesDisplayGrid'); // ID for the grid
    const filterButtons = document.querySelectorAll('.template-filter-btn'); // New class name
    const templateLoadMoreBtn = document.getElementById('templateLoadMoreBtn'); // New ID
    const templateSearchInputField = document.getElementById('templateSearchInputField'); // New ID
    const templateSearchResultsDropdown = document.getElementById('templateSearchResultsDropdown'); // New ID
    const templateSearchResultsList = document.getElementById('templateSearchResultsList'); // New ID for result list

    const templatesPerPage = 7;
    let currentDisplayedTemplates = templatesPerPage;
    let currentFilter = 'All';

    // --- Helper Functions ---

    // Function to render templates
    function renderTemplates(filteredTemplates) {
        templatesDisplayGrid.innerHTML = ''; // Clear existing templates
        const templatesToDisplay = filteredTemplates.slice(0, currentDisplayedTemplates);

        templatesToDisplay.forEach(template => {
            const card = document.createElement('a');
            card.href = template.link;
            card.classList.add('template-item-card'); // New class name
            card.setAttribute('data-category', template.category);
            card.setAttribute('data-id', template.id);
            card.innerHTML = `
                <img src="${template.image}" alt="${template.title}" class="template-item-image" onerror="this.onerror=null;this.src='https://placehold.co/400x200?text=Template+Image';">
                <div class="template-item-content">
                    <span class="template-item-category">${template.category}</span>
                    <h3 class="template-item-title">${template.title}</h3>
                    <p class="template-item-description">${template.description}</p>
                    <div class="template-item-price">${template.price === 'Free' ? 'Free' : `Rs. ${template.price}`}</div>
                </div>
            `;
            templatesDisplayGrid.appendChild(card);
        });

        // Show/hide Load More button
        if (currentDisplayedTemplates >= filteredTemplates.length) {
            templateLoadMoreBtn.style.display = 'none';
        } else {
            templateLoadMoreBtn.style.display = 'block';
        }
    }

    // Function to filter templates based on category and search query
    function filterAndSearchTemplates(category, query = '') {
        let filtered = templates;

        if (category !== 'All') {
            filtered = filtered.filter(template => template.category === category);
        }

        if (query) {
            const lowerCaseQuery = query.toLowerCase();
            filtered = filtered.filter(template =>
                template.title.toLowerCase().includes(lowerCaseQuery) ||
                template.description.toLowerCase().includes(lowerCaseQuery) ||
                template.keywords.toLowerCase().includes(lowerCaseQuery) || // Search keywords
                template.category.toLowerCase().includes(lowerCaseQuery)
            );
        }

        currentDisplayedTemplates = templatesPerPage; // Reset display count on filter/search
        renderTemplates(filtered);
    }

    // --- Event Listeners ---

    // Category Filter Buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.category;
            templateSearchInputField.value = ''; // Clear search input when changing category
            filterAndSearchTemplates(currentFilter);
            templateSearchResultsDropdown.classList.remove('show'); // Hide search results
        });
    });

    // Load More Button
    templateLoadMoreBtn.addEventListener('click', () => {
        currentDisplayedTemplates += templatesPerPage;
        filterAndSearchTemplates(currentFilter, templateSearchInputField.value);
    });

    // Search Input Field
    templateSearchInputField.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        
        if (query.length > 0) {
            templateSearchResultsDropdown.classList.add('show');
            displaySearchResults(query);
        } else {
            templateSearchResultsDropdown.classList.remove('show');
            filterAndSearchTemplates(currentFilter); // Re-apply current category filter if search is empty
        }
        filterAndSearchTemplates(currentFilter, query); // Always filter main templates based on search too
    });

    // Hide search results when clicking outside
    document.addEventListener('click', (event) => {
        if (!templateSearchInputField.contains(event.target) && !templateSearchResultsDropdown.contains(event.target)) {
            templateSearchResultsDropdown.classList.remove('show');
        }
    });

    // Function to display search results in the dropdown (Simplified for this page)
    function displaySearchResults(query) {
        const lowerCaseQuery = query.toLowerCase();
        templateSearchResultsList.innerHTML = ''; // Clear previous results

        const matchingTemplates = templates.filter(template =>
            template.title.toLowerCase().includes(lowerCaseQuery) ||
            template.description.toLowerCase().includes(lowerCaseQuery) ||
            template.keywords.toLowerCase().includes(lowerCaseQuery)
        );

        if (matchingTemplates.length > 0) {
            matchingTemplates.forEach(template => {
                const resultItem = document.createElement('a');
                resultItem.href = template.link;
                resultItem.classList.add('template-search-result-item');
                resultItem.innerHTML = `
                    <div class="item-title">${template.title}</div>
                    <div class="item-category">${template.category} Template</div>
                `;
                templateSearchResultsList.appendChild(resultItem);
            });
        } else {
            templateSearchResultsList.innerHTML = '<div class="no-results" style="padding: 10px 20px; color: #6B7280;">No templates found.</div>';
        }
    }

    // Initial render of templates on page load
    filterAndSearchTemplates(currentFilter);
});