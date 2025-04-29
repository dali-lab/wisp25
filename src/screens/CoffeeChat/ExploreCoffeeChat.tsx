import React, { useState } from 'react';
import '../../styles/CoffeeChat.css';
import { useNavigate } from 'react-router-dom';

interface Student {
  id: number;
  name: string;
  major: string;
  bio: string;
}

interface StudentCardProps {
  student: Student;
}
 
const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const navigate = useNavigate();

  const handleConnectClick = () => {
    console.log(`Connecting with student ${student.id}`);
    navigate('/contact', {
      state: {
        name: student.name,
        studentId: student.id,
      },
    });
  };

  return (
    <div className="student-card">
      <div className="student-topbar">
        <h3 className="student-name">{student.name}</h3>
        <div className="student-major">{student.major}</div>
      </div>
      <div className="student-info">
        <p className="student-bio">{student.bio}</p>
        <button className="connect-button" onClick={handleConnectClick}>
          <span>Connect Now</span>
        </button>
      </div>
    </div>
  );
};
 
const ExploreCoffeeChat: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
 
  const students: Student[] = [
    {
      id: 1,
      name: 'Student #1',
      major: 'Mathematics',
      bio: 'I am currently studying math with a potential minor in International Relations. On campus, I am a tour guide and involved with the writing center.',
    },
    {
      id: 2,
      name: 'Student #2',
      major: 'Spanish',
      bio: 'I am currently studying Spanish and planning on studying abroad through the Barcelona program next term.',
    },
    {
      id: 3,
      name: 'Student #3',
      major: 'Undecided',
      bio: 'Although I am undecided about my major, I am taking classes in both the Philosophy and Physics departments.',
    },
    {
      id: 4,
      name: 'Student #4',
      major: 'Psychology',
      bio: 'Psychology major with a focus on developmental psychology. Looking to connect with other students interested in research opportunities and study groups.',
    },
    {
      id: 5,
      name: 'Student #5',
      major: 'Computer Science',
      bio: 'Junior CS major focusing on AI and machine learning. Currently working on a research project about neural networks and seeking collaboration partners.',
    },
    {
      id: 6,
      name: 'Student #6',
      major: 'Art History',
      bio: 'Art History major with a minor in Museum Studies. Looking to discuss Renaissance art and potential internships at local galleries or museums.',
    },
  ];
  
  const categories = ['All', 'Mathematics', 'Spanish', 'Philosophy', 'Physics', 'International Relations', 'Study Abroad', 'Psychology', 'Computer Science', 'Art History', 'Undecided'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = searchQuery === '' ||
  student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  student.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
  student.bio.toLowerCase().includes(searchQuery.toLowerCase());
 
    const matchesCategory = activeCategory === 'All' || student.major === activeCategory;
 
    return matchesSearch && matchesCategory;
  });
 
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
 
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };
 
  return (
    <div>
      <header>
        <h1>Coffee Chat Connection</h1>
      </header>
      <div className="container">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search by subject, major, or interest"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
  
        <div className="categories">
          {categories.map(category => (
            <div
              key={category}
              className={`category ${category === activeCategory ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          ))}
        </div>
  
        <div className="students-list">
          {filteredStudents.map(student => (
            <StudentCard
              key={student.id}
              student={student}
            />
          ))}
        </div>
      </div>
      </div>
  );
};
 
export default ExploreCoffeeChat;