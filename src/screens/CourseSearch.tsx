import React, { useState, useEffect } from 'react';
import '../CourseSearch.css';
import checkIcon from '../assets/check_icon.svg';
import menuIcon from '../assets/menu_icon.svg';
import dropDownIcon from '../assets/drop_.svg';
import axios from 'axios';
import { saveCourse, isCourseSaved } from '@/utils/courseStorage';

interface Course {
  id: string;
  name: string;
  subject_id: string;
}

interface CourseListSearchProps {
  selectedSubjects: string[];
  setSelectedSubjects: React.Dispatch<React.SetStateAction<string[]>>;
}

const allSubjects: string[] = [
  "AAAS", "ANTH", "ARAB", "ARTH", "ASCL", "ASTR", "BIOL", "CHEM", "CHIN", "CLST",
  "COCO", "COGS", "COLT", "COSC", "CRWT", "EARS", "ECON", "EDUC", "EEER", "ENGL",
  "ENGS", "ENVS", "FILM", "FREN", "FRIT", "FYS", "GEOG", "GERM", "GOVT", "GRK",
  "HEBR", "HIST", "HUM", "INTS", "ITAL", "JAPN", "JWST", "LACS", "LAT", "LATS",
  "LING", "MATH", "MES", "MUS", "NAIS", "PBPL", "PHIL", "PHYS", "PORT", "PSYC",
  "QSS", "REL", "RUSS", "SART", "SOCY", "SPAN", "SPEE", "THEA", "TUCK", "UKRA",
  "WGSS", "WRIT"
];

const splitIntoColumns = (items: string[], numCols: number): string[][] => {
  const colLength = Math.ceil(items.length / numCols);
  return Array.from({ length: numCols }, (_, i) =>
    items.slice(i * colLength, (i + 1) * colLength)
  );
};

const CourseListSearch: React.FC<CourseListSearchProps> = ({ selectedSubjects, setSelectedSubjects }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openSubjects, setOpenSubjects] = useState<Record<string, boolean>>({});

  useEffect(() => {
    axios.get('/api/academic/courses', {
      headers: {
        "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJmMDA3OTY0IiwiYXVkIjoiaHR0cHM6Ly9hcGkuZGFydG1vdXRoLmVkdSIsImlzcyI6Imh0dHBzOi8vYXBpLmRhcnRtb3V0aC5lZHUvYXBpL2p3dCIsIm5hbWUiOiJHYWVsbGUgRS4gVmFsbWlyIiwiZXhwIjoxNzQ2NzU0NjA3LCJpYXQiOjE3NDY3NDM4MDcsImVtYWlsIjoiR2FlbGxlLkUuVmFsbWlyLjI4QGRhcnRtb3V0aC5lZHUifQ.ij2jML0CCcnnApWXeCch72ztLvWYL2amTGYjnAVKusOsVVOKtLK1jlHukxgkF7BoFcVXk9mM-Yywp1uPFTEjAxMHy3ckLADsEqoWuH0hVi4WJLLDWKJ7IBLjwl1AabgwsT3g1rMYA92dL0arPCjSVAtZkPnq5XDX4xTfj_EmQsyTGbg7ZI5q1-2Cc0jEdVeKSqYakIcvXKZETeOKFbd1k94Oa1_ZjiNaYWpgAqqAStyMwvbhwfGh5gvleua5ZhAwIXvDDl7DhdzgclSmDi04MrqNmD-jtQxiFNIFtdAiB0S7oXyFmT1je4VQ2X6pOlGoxuwH3fTdVrvNLTYxJcCedQ`
      }
    })
    .then((response) => {
      // Validate if the response is an array before setting the state
      if (Array.isArray(response.data)) {
        setCourses(response.data);
      } else {
        console.error("Invalid response format:", response.data);
      }
    })
    .catch((error) => {
      console.error("API Error:", error);
    });
  }, []);

  useEffect(() => {
    const filtered = courses.filter((course) => {
      const isSubjectMatch = selectedSubjects.length === 0 || selectedSubjects.includes(course.subject_id);
      const isNameMatch = course.name.toLowerCase().includes(searchQuery.toLowerCase());
      return isNameMatch && isSubjectMatch;
    });
    setFilteredCourses(filtered);
  }, [searchQuery, courses, selectedSubjects]);

  const toggleSubject = (subject: string) => {
    setOpenSubjects(prev => ({
      ...prev,
      [subject]: !prev[subject]
    }));
  };

  const handleSaveCourse = (course: Course) => {
    saveCourse(course);
    alert(`${course.name} saved!`);
  };

  const removeSubject = (subjectToRemove: string) => {
    setSelectedSubjects(prev => prev.filter(subject => subject !== subjectToRemove));
  };

  return (
    <div>
      <div className="menu-bar">
        <img src={menuIcon} alt="Menu" className="menu-icon" />
        <input
          className='course-search-bar'
          type="text"
          placeholder="Search for course"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="selected-subjects-container">
        {selectedSubjects.map(subject => (
          <button
            key={subject}
            className="selected-subject-oval"
            onClick={() => removeSubject(subject)}
          >
            <h3 className='subject-tag'>{subject}</h3> <h3 className='remove'>✕</h3>
          </button>
        ))}
      </div>

      {selectedSubjects.map((subject) => (
        <div key={subject} className='all-subject-container'>
          <button
            className={`subject-card ${openSubjects[subject] ? 'subject-card-open' : ''}`}
            onClick={() => toggleSubject(subject)}
          >
            <h3 className={`subject-title ${openSubjects[subject] ? 'subject-title-open' : ''}`}>{subject}</h3>
            <img src={dropDownIcon} alt="Dropdown" className={`drop-down ${openSubjects[subject] ? 'rotate' : ''}`} />
          </button>

          {openSubjects[subject] && (
            <div className="course-list">
              {filteredCourses
                .filter(course => course.subject_id === subject)
                .map(course => (
                  <button className='course-card' key={course.id}>
                    <h1 className='course-title'>{course.name}</h1>
                    <div className='credit-icon-column'>
                      <h3 className='credit'>TLA</h3>
                      <img src={dropDownIcon} alt="Dropdown" className='drop-down' />
                    </div>
                    <button
                        disabled={isCourseSaved(course.id)}
                        onClick={() => handleSaveCourse(course)}
                    >
                        {isCourseSaved(course.id) ? 'Saved' : 'Save'}
                    </button>
                  </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
  };

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isNextClicked, setIsNextClicked] = useState(false);

  const handleSubjectChange = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject) ? prev.filter(s => s !== subject) : [...prev, subject]
    );
  };

  const filteredSubjects = allSubjects
    .filter(subject => subject.toLowerCase().includes(query.toLowerCase()))
    .sort();

  const columns = splitIntoColumns(filteredSubjects, 3);

  const handleNextClick = () => {
    if (selectedSubjects.length === 0) {
      alert("Select at least one subject before proceeding.");
      return;
    }
    setIsNextClicked(true);
  };

  if (isNextClicked) {
    return (
      <CourseListSearch
        selectedSubjects={selectedSubjects}
        setSelectedSubjects={setSelectedSubjects}
      />
    );
  }

  return (
    <div>
      <div className="menu-bar">
        <img src={menuIcon} alt="Menu" className="menu-icon" />
        <div className="menu-title">Subjects</div>
      </div>

      <div className="subject-box">
        <input
          type="text"
          placeholder="Search subjects here"
          className="search-bar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="column-layout">
          {columns.map((col, colIndex) => (
            <div className="column" key={colIndex}>
              {col.map((subject, index) => (
                <label key={index}>
                  <input 
                    type="checkbox" 
                    className="box" 
                    checked={selectedSubjects.includes(subject)} 
                    onChange={() => handleSubjectChange(subject)} 
                  />
                  <div className="content">
                    <div className="dot">
                      <img src={checkIcon} alt="check" className="check-icon" />
                    </div>
                    <div className="text">{subject}</div>
                  </div>
                </label>
              ))}
            </div>
          ))}
        </div>

        <div className="next-button-wrapper">
          <button 
            className="next-button" 
            onClick={handleNextClick} 
            disabled={selectedSubjects.length === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
