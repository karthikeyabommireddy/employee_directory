// Mock employee data
const mockEmployees = [
    {
        id: 1,
        firstName: 'Karthikeya',
        lastName: 'Teddy',
        email: 'k.r@company.com',
        phone: '923415678',
        department: 'Marketing',
        role: 'Content Strategist',
        hiredDate: 'May 16, 2021'
    },
    {
        id: 2,
        firstName: 'Gowtham',
        lastName: 'varma',
        email: 'g.v@company.com',
        phone: '9988554477',
        department: 'Engineering',
        role: 'Frontend Developer',
        hiredDate: 'Jan 9, 2023'
    },
    {
        id: 3,
        firstName: 'Siva',
        lastName: 'Krishna',
        email: 's.k@company.com',
        phone: '7788445577',
        department: 'Finance',
        role: 'Accountant',
        hiredDate: 'Mar 28, 2022'
    },
    {
        id: 4,
        firstName: 'Chandu',
        lastName: 'Muppuri',
        email: 'ChanduM@company.com',
        phone: '7744557788',
        department: 'HR',
        role: 'HR Manager',
        hiredDate: 'Jul 15, 2020'
    },
    {
        id: 5,
        firstName: 'Hari',
        lastName: 'Yadav',
        email: 'hariyadava@company.com',
        phone: '8844557744',
        department: 'Engineering',
        role: 'Backend Developer',
        hiredDate: 'Sep 3, 2021'
    },
    {
        id: 6,
        firstName: 'Bhanu',
        lastName: 'Prakash',
        email: 'bhanu@company.com',
        phone: '7744558895',
        department: 'Design',
        role: 'Designer',
        hiredDate: 'Nov 12, 2022'
    },
    {
        id: 7,
        firstName: 'Hemanth',
        lastName: 'Komma',
        email: 'hemanthK@company.com',
        phone: '9874584778',
        department: 'Sales',
        role: 'Sales Manager',
        hiredDate: 'Feb 28, 2021'
    },
    {
        id: 8,
        firstName: 'Avinash',
        lastName: 'kanaparthi',
        email: 'avinash@company.com',
        phone: '8547547884',
        department: 'Marketing',
        role: 'Marketing Manager',
        hiredDate: 'Aug 7, 2020'
    },
    {
        id: 9,
        firstName: 'James',
        lastName: 'anna',
        email: 'james@company.com',
        phone: '7845123698',
        department: 'Engineering',
        role: 'DevOps Engineer',
        hiredDate: 'Apr 14, 2022'
    },
    {
        id: 10,
        firstName: 'prasad',
        lastName: 'pilla',
        email: 'prasad@company.com',
        phone: '7878451236',
        department: 'Finance',
        role: 'Financial Analyst',
        hiredDate: 'Dec 5, 2021'
    },
    
];

// Departments and roles for filtering
const departments = ['Engineering', 'Marketing', 'Finance', 'HR', 'Sales', 'Design', 'Operations'];
const roles = [
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer',
    'Product Manager', 'Designer', 'Marketing Manager', 'Content Strategist',
    'Accountant', 'Financial Analyst', 'HR Manager', 'Recruiter',
    'Sales Manager', 'Sales Representative', 'Operations Manager'
];