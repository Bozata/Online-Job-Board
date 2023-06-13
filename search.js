const searchForm = document.querySelector('#search-form');
const keywordInput = document.querySelector('#keyword-input');
const locationInput = document.querySelector('#location-input');
const categorySelect = document.querySelector('#category-select');
const searchJobListings = document.querySelector('#search-job-listings');
const pagination = document.querySelector('.pagination');

let jobs = [];
let filteredJobs = [];

const jobsPerPage = 5;
let currentPage = 1;

function displayJobs(jobsToDisplay) {
  searchJobListings.innerHTML = '';

  if (jobsToDisplay.length === 0) {
    const noJobsMessage = document.createElement('p');
    noJobsMessage.textContent = 'No jobs found for the selected category.';
    searchJobListings.appendChild(noJobsMessage);
    return;
  }

  filteredJobs = jobsToDisplay;

  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  paginatedJobs.forEach(job => {
    const jobListing = document.createElement('div');
    jobListing.classList.add('job-listing');

    const jobTitle = document.createElement('h3');
    jobTitle.textContent = job.title;

    const jobCompany = document.createElement('p');
    jobCompany.textContent = `Company: ${job.company}`;

    const jobLocation = document.createElement('p');
    jobLocation.textContent = `Location: ${job.location}`;

    const jobDescription = document.createElement('p');
    jobDescription.textContent = job.description;

    jobListing.appendChild(jobTitle);
    jobListing.appendChild(jobCompany);
    jobListing.appendChild(jobLocation);
    jobListing.appendChild(jobDescription);

    searchJobListings.appendChild(jobListing);
  });

  generatePagination(filteredJobs.length);
}

function generatePagination(totalJobs) {
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  pagination.innerHTML = '';

  const prevButton = document.createElement('a');
  prevButton.href = '#';
  prevButton.textContent = 'Prev';
  prevButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      displayJobs(filteredJobs);
    }
  });

  const nextButton = document.createElement('a');
  nextButton.href = '#';
  nextButton.textContent = 'Next';
  nextButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      displayJobs(filteredJobs);
    }
  });

  if (currentPage > 1) {
    pagination.appendChild(prevButton);
  }

  if (currentPage < totalPages) {
    pagination.appendChild(nextButton);
  }
}

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const keyword = keywordInput.value.trim().toLowerCase();
  const location = locationInput.value.trim().toLowerCase();

  filteredJobs = jobs.filter(job => {
    const jobTitle = job.title.toLowerCase();
    const jobDescription = job.description.toLowerCase();
    const jobLocation = job.location.toLowerCase();

    const keywordMatch = jobTitle.includes(keyword) || jobDescription.includes(keyword);
    const locationMatch = jobLocation.includes(location);

    return keywordMatch && locationMatch;
  });

  currentPage = 1;
  displayJobs(filteredJobs);
});

categorySelect.addEventListener('change', function () {
  const categoryId = categorySelect.value;
  filteredJobs = jobs.filter(job => categoryId === '' || job.categoryId === parseInt(categoryId));
  currentPage = 1;
  displayJobs(filteredJobs);
});

function fetchJobData() {
  fetch('mockdata.json')
    .then(response => response.json())
    .then(data => {
      jobs = data.jobs;

      const categories = data.categories;
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id.toString();
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });

      displayJobs(jobs);
    })
    .catch(error => {
      console.error('Error retrieving job data:', error);
    });
}

document.addEventListener('DOMContentLoaded', fetchJobData);