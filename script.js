const latestJobListings = document.querySelector('#latest-job-listings');
const newsUpdates = document.querySelector('#news-updates');
const backToTopButton = document.querySelector('#back-to-top');

function displayLatestJobListings(jobsToDisplay) {
  latestJobListings.innerHTML = '';

  if (jobsToDisplay.length === 0) {
    const noJobsMessage = document.createElement('p');
    noJobsMessage.textContent = 'No jobs found.';
    latestJobListings.appendChild(noJobsMessage);
    return;
  }

  jobsToDisplay.forEach(job => {
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

    latestJobListings.appendChild(jobListing);
  });
}

function displayNewsUpdates(newsToDisplay) {
  newsUpdates.innerHTML = '';

  if (newsToDisplay.length === 0) {
    const noNewsMessage = document.createElement('p');
    noNewsMessage.textContent = 'No news found.';
    newsUpdates.appendChild(noNewsMessage);
    return;
  }

  newsToDisplay.forEach(news => {
    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item');

    const newsTitle = document.createElement('h3');
    newsTitle.textContent = news.title;

    const newsContent = document.createElement('p');
    newsContent.textContent = news.content;

    newsItem.appendChild(newsTitle);
    newsItem.appendChild(newsContent);

    newsUpdates.appendChild(newsItem);
  });
}

function handleBackToTopVisibility() {
  const scrollPosition = window.pageYOffset;

  if (scrollPosition > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

window.addEventListener('scroll', handleBackToTopVisibility);
backToTopButton.addEventListener('click', scrollToTop);

fetch('mockdata.json')
  .then(response => response.json())
  .then(data => {
    const jobs = data.jobs;
    displayLatestJobListings(jobs);
  })
  .catch(error => {
    console.error('Error retrieving mock jobs data:', error);
  });

fetch('news.json')
  .then(response => response.json())
  .then(data => {
    const news = data.news;
    displayNewsUpdates(news);
  })
  .catch(error => {
    console.error('Error retrieving news data:', error);
  });

const jobPostingForm = document.querySelector('#job-posting-form');
if (jobPostingForm) {
  jobPostingForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const jobTitle = document.querySelector('#job-title').value;
    const jobDescription = document.querySelector('#job-description').value;
    const jobType = document.querySelector('#job-type').value;
    const jobLocation = document.querySelector('#job-location').value;
    const salaryRange = document.querySelector('#salary-range').value;
    const companyName = document.querySelector('#company-name').value;
    const applicationEmailUrl = document.querySelector('#application-email-url').value;

    console.log('Job Title:', jobTitle);
    console.log('Job Description:', jobDescription);
    console.log('Job Type:', jobType);
    console.log('Location:', jobLocation);
    console.log('Salary Range:', salaryRange);
    console.log('Company Name:', companyName);
    console.log('Application Email/URL:', applicationEmailUrl);

    jobPostingForm.reset();
  });
}