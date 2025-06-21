import React from 'react';
import JobCard from '../components/common/JobCard.js';
import ApplicationCard from '../components/candidate/ApplicationCard.js';


const mockJob = {
  title: "Frontend Developer",
  description: `We are looking for a coding fanatic who is interested in working upon and learning new technologies. A person who will closely work with our Software team to accomplish the operational excellence of the various website. This involves writing clean, efficient, and maintainable code in HTML, CSS, and JavaScript, as well as utilizing various front-end frameworks and libraries.

Collaboration with back-end developers and designers is crucial to ensure the seamless integration of the front-end with the back-end, as well as to refine the user interface for optimal user engagement. If you think you have the niche for new technologies to work on, you will be our choice to go.

Roles and Responsibilities: Front-end Developer

- Writing clean and well-structured HTML, CSS, and JavaScript code to create layout, style, and functionality of webpages.
- Adding and improving functionalities to the various domains of websites.
- Developing new user-facing features using various front-end libraries and frameworks (e.g., React, Angular, Vue.js) to enhance user engagement and functionality.
- Building reusable components and front-end libraries for future use.
- Collaborating closely with UI/UX designers to translate design mockups and wireframes into functional web interfaces, paying attention to detail and design consistency.
- Optimizing components for maximum performance across a vast array of web-capable devices and browsers.
- Using version control systems like Git to manage code changes, collaborate with team members, and maintain a clean and organized codebase.
- Effectively communicating with designers, back-end developers, project managers, and other team members to ensure seamless integration of front-end components with the overall project.
- Understanding business requirements and translating them into technical requirements.`,
  company: "HireBizz",
  location: "Remote",
  skills: ["React", "Tailwind", "API"],
  compensation: 900000,
  status: "Open",
  isActive: true,
  createdBy: "Employer123",
  createdAt: new Date(),
};


const fakeApp = {
  job: { title: "React Developer", company: "TechieCorp", location: "Remote" },
  applicant: {
    _id: "681ccf57c10e9dab988d8041",
    name: "Aman Kumar Pandey",
    email: "amanpandey1910@gmail.com"
  },
  coverLetter:"Collaboration with back-end developers and designers is crucial to ensure the seamless integration of the front-end with the back-end, as well as to refine the user interface for optimal user engagement. If you think you have the niche for new technologies to work on, you will be our choice to go. We are looking for a coding fanatic who is interested in working upon and learning new technologies. A person who will closely work with our Software team to accomplish the operational excellence of the various website. This involves writing clean, efficient, and maintainable code in HTML, CSS, and JavaScript, as well as utilizing various front-end frameworks and libraries.",
  status: "accepted",
  appliedAt: new Date(),
  resumeURL: "https://example.com/resume.pdf",
};


const DevPlayground = () => {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Component Preview</h1>
      <ApplicationCard application={fakeApp} onViewClick={() => alert("Clicked")} />
    </div>
  );
};

export default DevPlayground;
