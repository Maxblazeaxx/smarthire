/**
 * generate-samples.js
 *
 * Generates 4 sample DOCX resumes for testing SmartHire.
 * Run: node generate-samples.js
 * 
 * Requires: npm install officegen
 * (Or just use the pre-made plain-text versions below)
 */

const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname);

/**
 * Sample resume contents (plain text — will be saved as .txt for easy testing)
 * You can also use real PDF/DOCX files in the same folder.
 */
const resumes = [
  {
    filename: 'alice_johnson.txt',
    content: `ALICE JOHNSON
Full Stack Developer
alice.johnson@email.com | github.com/alicejohnson | LinkedIn

SUMMARY
Experienced full stack developer with 4 years of experience building modern web applications.
Passionate about React.js, Node.js, and building scalable APIs.

SKILLS
- Frontend: React.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
- Backend: Node.js, Express.js, REST API, GraphQL
- Database: MongoDB, PostgreSQL, Redis
- Tools: Git, Docker, AWS, CI/CD, Webpack
- Testing: Jest, React Testing Library

EXPERIENCE
Senior Frontend Developer — TechCorp Inc. (2022–Present)
- Built a React.js dashboard used by 50,000+ users
- Integrated REST APIs and MongoDB for data storage
- Led CI/CD pipelines with GitHub Actions and Docker

Full Stack Developer — StartupHub (2020–2022)
- Developed Node.js/Express.js backend services
- Created GraphQL APIs and MongoDB schemas

EDUCATION
B.Sc. Computer Science — State University (2020)

CERTIFICATIONS
- AWS Certified Developer
- MongoDB Certified Developer
`,
  },
  {
    filename: 'bob_smith.txt',
    content: `BOB SMITH
Data Scientist & ML Engineer
bob.smith@email.com | github.com/bobsmith

SUMMARY
Data scientist with 3 years of experience in machine learning, Python, and statistical analysis.
Skilled at turning data into actionable insights.

SKILLS
- Languages: Python, R, SQL
- ML Frameworks: TensorFlow, Scikit-learn, Pandas, NumPy
- Visualization: Matplotlib, Seaborn, Tableau
- Big Data: Apache Spark, Hadoop
- Tools: Git, Jupyter Notebook, Docker

EXPERIENCE
Data Scientist — DataInsights Co. (2021–Present)
- Built machine learning models for fraud detection (95% accuracy)
- Used Pandas and NumPy for large-scale data analysis
- Deployed ML pipelines with Docker and AWS

Junior Data Analyst — Analytics Corp (2020–2021)
- SQL queries on PostgreSQL databases
- Created dashboards with Tableau

EDUCATION
M.Sc. Data Science — Tech University (2020)
B.Sc. Statistics — City College (2018)
`,
  },
  {
    filename: 'carol_white.txt',
    content: `CAROL WHITE
React Native & Mobile Developer
carol.white@email.com | github.com/carolwhite

SUMMARY
Mobile developer specializing in React Native and cross-platform app development.
4+ years building iOS and Android applications with TypeScript and Redux.

SKILLS
- Mobile: React Native, Expo, iOS, Android
- Frontend: React.js, JavaScript, TypeScript
- State: Redux, MobX, Context API
- Backend: Firebase, Node.js, REST API
- Tools: Git, Xcode, Android Studio, CI/CD

EXPERIENCE
Senior Mobile Developer — AppWorks Ltd (2021–Present)
- Built React Native apps with 100K+ downloads
- Integrated Firebase for real-time updates and authentication
- Used Redux for complex state management

Mobile Developer — MobileFirst (2020–2021)
- Cross-platform app development with TypeScript
- Implemented REST API integrations

EDUCATION
B.Sc. Software Engineering — National University (2020)

PROJECTS
- ShopEase: E-commerce React Native app (50K+ downloads)
- FitTrack: Health tracking app using React Native + Firebase
`,
  },
  {
    filename: 'david_brown.txt',
    content: `DAVID BROWN
DevOps Engineer & Cloud Architect
david.brown@email.com | linkedin.com/in/davidbrown

SUMMARY
DevOps engineer with 5 years of experience in cloud infrastructure, Kubernetes, Docker,
and CI/CD automation. AWS certified professional.

SKILLS
- Cloud: AWS (EC2, S3, RDS, Lambda), Azure, GCP
- Containers: Docker, Kubernetes, Helm
- CI/CD: Jenkins, GitHub Actions, GitLab CI
- IaC: Terraform, Ansible, CloudFormation
- Monitoring: Prometheus, Grafana, ELK Stack
- Scripting: Bash, Python

EXPERIENCE
Senior DevOps Engineer — CloudSystems Inc. (2021–Present)
- Managed Kubernetes clusters serving 10M+ requests/day
- Automated CI/CD pipelines reducing deploy time by 70%
- Infrastructure as Code with Terraform and AWS

DevOps Engineer — TechOps (2019–2021)
- Docker containerization of monolithic applications
- Jenkins and GitHub Actions pipeline setup
- AWS infrastructure management

EDUCATION
B.Sc. Computer Engineering — Engineering Institute (2019)

CERTIFICATIONS
- AWS Certified Solutions Architect
- Certified Kubernetes Administrator (CKA)
- HashiCorp Terraform Associate
`,
  },
];

// Write plain text files
resumes.forEach(({ filename, content }) => {
  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Created: ${filename}`);
});

console.log('\n📁 Sample resumes created in:', outputDir);
console.log('💡 Tip: Rename .txt files to .pdf for testing (backend handles text fallback)');
console.log('   Or convert to real PDF using any online converter.\n');
