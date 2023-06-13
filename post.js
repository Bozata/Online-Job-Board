const postForm = document.querySelector('#post-form');
const jobListings = document.querySelector('#job-listings');

postForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const title = document.querySelector('#title-input').value;
  const company = document.querySelector('#company-input').value;
  const location = document.querySelector('#location-input').value;
  const description = document.querySelector('#description-input').value;

  const jobListing = document.createElement('div');
  jobListing.classList.add('job-listing');

  const jobTitle = document.createElement('h3');
  jobTitle.textContent = title;

  const jobCompany = document.createElement('p');
  jobCompany.textContent = `Company: ${company}`;

  const jobLocation = document.createElement('p');
  jobLocation.textContent = `Location: ${location}`;

  const jobDescription = document.createElement('p');
  jobDescription.textContent = description;

  jobListing.appendChild(jobTitle);
  jobListing.appendChild(jobCompany);
  jobListing.appendChild(jobLocation);
  jobListing.appendChild(jobDescription);

  jobListings.appendChild(jobListing);

  postForm.reset();
});