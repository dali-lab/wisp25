import React, { useState, useEffect } from 'react';
import '../CourseSearch.css';
import checkIcon from '../assets/check_icon.svg';
import menuIcon from '../assets/menu_icon.svg';
import dropDownIcon from '../assets/drop_.svg';
import axios from 'axios';

const formatTime = (time: string | null | undefined) => {
  if (!time || typeof time !== 'string' || !time.includes(':')) {
    return 'TBD';
  }

  const [hour, minute] = time.split(':').map(Number);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
};


interface Instructor {
  is_primary: boolean;
  netid: string;
}

interface CrosslistedSection {
  id: string;
}

interface Crosslist {
  id: string;
  sections: CrosslistedSection[];
}

interface Section {
  id: string;
  course_id: string;
  name: string;
  subject_id: string;
  course_number: string;
  section_number: string;
  term: {
    id: string;
    sis_term_code: string;
  };
  crosslist: Crosslist | null;
  is_active: boolean;
  instructors: Instructor[];
  schedule?: {
    sessions: {
      class_days: { id: string }[];
      local_begin_time: string;
      local_end_time: string;
      location: {
        building: { name: string; code: string };
        room: string;
      };
    }[];
  };
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
  const [sections, setSections] = useState<Section[]>([]);
  const [filteredSections, setFilteredSections] = useState<Section[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openSubjects, setOpenSubjects] = useState<Record<string, boolean>>({});
  const [openCourses, setOpenCourses] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const termCode = "202503";
        let allSections: Section[] = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const response = await axios.get('/api/academic/sections', {
            headers: {
              Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJmMDA3OW4zIiwiYXVkIjoiaHR0cHM6Ly9hcGkuZGFydG1vdXRoLmVkdSIsImlzcyI6Imh0dHBzOi8vYXBpLmRhcnRtb3V0aC5lZHUvYXBpL2p3dCIsIm5hbWUiOiJCb3BoYSBNLiBVbSIsImV4cCI6MTc0Njc0MjAzMSwiaWF0IjoxNzQ2NzMxMjMxLCJlbWFpbCI6IkJvcGhhLk0uVW0uMjhAZGFydG1vdXRoLmVkdSJ9.U1mg4MVJhDmdHe2Bzd8WIIhcVaASi3prx3MQ_YL8dZdCaY4Nf6mTqyivpMm1UeHC6Ox8pol_6eSfVF27wCGjFyS_kVju09tBRRLdkUduLc9aduW1ZAPD7UZcbXyYL6dM47illgI3CQO6iSSfg2B5mCTwUxok_rrGMNCnfn6DTsdXSbCOBGcIX9oLwqHp43p6QCuWeP-j79-gPrbgJNOZrI0TJfaRwEp6Ney8fjg66Mk42Sv9w1q22oqN5Bb1IfqIvIude0Sz1FXYdciMDN4xT0sDF9KS0PQYEpyacLJfaXBuIHVe-fEZQmZJMFGjPajmGiNwscNs6MfLeRj5v3-O7Q`
            },
            params: {
              'term.sis_term_code': termCode,
              is_active: true,
              
              pagesize: 500,
              page,
              expand: 'schedule.sessions.location' // <- this is crucial

            }
          });

          const data: Section[] = response.data;
          if (data.length > 0) {
            allSections = [...allSections, ...data];
            page++;
          } else {
            hasMore = false;
          }
        }

        setSections(allSections);
      } catch (err) {
        console.error("Error fetching sections:", err);
      }
    };

    fetchSections();
  }, []);

  useEffect(() => {
    const filtered = sections.filter(section => {
      const subjectMatch =
        selectedSubjects.includes(section.subject_id);
      const isCrosslisted = section.crosslist?.sections?.some(s =>
        selectedSubjects.some(sub => s.id.startsWith(sub))
      );
      const isMainCourse = !isCrosslisted || section.subject_id === section.course_id.split('.')[0];

      const nameMatch = section.name.toLowerCase().includes(searchQuery.toLowerCase());
      return nameMatch && subjectMatch && isMainCourse;
    });

    setFilteredSections(filtered);
  }, [searchQuery, sections, selectedSubjects]);

  const toggleSubject = (subject: string) => {
    setOpenSubjects(prev => ({
      ...prev,
      [subject]: !prev[subject]
    }));
  };

  const toggleCourse = (courseId: string) => {
    setOpenCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const removeSubject = (subject: string) => {
    setSelectedSubjects(prev => prev.filter(s => s !== subject));
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
          <button key={subject} className="selected-subject-oval" onClick={() => removeSubject(subject)}>
            <h3 className='subject-tag'>{subject}</h3> <h3 className='remove'>✕</h3>
          </button>
        ))}
      </div>

      {selectedSubjects.map(subject => (
        <div key={subject} className='all-subject-container'>
          <button className={`subject-card ${openSubjects[subject] ? 'subject-card-open' : ''}`} onClick={() => toggleSubject(subject)}>
            <h3 className={`subject-title ${openSubjects[subject] ? 'subject-title-open' : ''}`}>{subject}</h3>
            <img src={dropDownIcon} alt="Dropdown" className={`drop-down ${openSubjects[subject] ? 'rotate' : ''}`} />
          </button>

          {openSubjects[subject] && (
            <div className="course-list">
              {filteredSections
  .filter(section => section.subject_id === subject)
  .map(section => {
    const hasSessions = section.schedule?.sessions?.length;
    const formattedSessions = hasSessions
      ? section.schedule!.sessions.map((session, idx) => {
          const dayMap: Record<string, string> = {
            M: "Mon", T: "Tue", W: "Wed", R: "Th", F: "Fri", S: "Sat", U: "Sun"
          };
          const days = session.class_days.map(d => dayMap[d.id] || d.id).join(" ");
          const begin = session.local_begin_time ? formatTime(session.local_begin_time) : "TBD";
          const end = session.local_end_time ? formatTime(session.local_end_time) : "TBD";
          return `${days} ${begin}–${end}`;
        }).join(" | ")
      : "TBD";

    const firstSessionWithLocation = section.schedule?.sessions?.find(s => s.location);
    const building = firstSessionWithLocation?.location?.building?.name || "TBD";
    const room = firstSessionWithLocation?.location?.room || "TBD";


    return (
      <React.Fragment key={section.id}>
        <button className='course-card' onClick={() => toggleCourse(section.id)}>
          <h1 className='course-title'>{section.name}</h1>
          {/* <h3>{section.course_id}</h3> */}
          <div className='credit-icon-column'>
            <h3 className='credit'>TLA</h3>
            <img
              src={dropDownIcon}
              alt="Dropdown"
              className={`drop-down ${openCourses[section.id] ? 'rotate' : ''}`}
            />
          </div>
        </button>

        {openCourses[section.id] && (
          <div className="Course-Info">
            <div className="Course-Info-Rectangle">
              <div className='courseinfoboxes'>
                <div className='infobox'><div className='infobox-title'>Instructor</div><div className='infobox-content'>Instructor</div></div>
                {/* <div className='infobox'>
                <div className='infobox-title'>Time</div>
                <div className='infobox-content'>
                  {section.schedule?.sessions?.length ? (
                    section.schedule.sessions.map((session, index) => {
                      const days = session.class_days.map(d => d.id).join('');
                      const start = formatTime(session.local_begin_time);
                      const end = formatTime(session.local_end_time);
                      return (
                        <div key={index}>
                          {days} {start}–{end}
                        </div>
                      );
                    })
                  ) : (
                    "N/A"
                  )}
                </div>
              </div> */}
              <div className='infobox'><div className='infobox-title'>Time</div><div className='infobox-content'>{formattedSessions}</div></div>
              <div className='infobox'><div className='infobox-title'>Building</div><div className='infobox-content'>{building}</div></div>
              <div className='infobox'><div className='infobox-title'>Room</div><div className='infobox-content'>{room}</div></div>
              <div className='infobox'><div className='infobox-title'>Pre Req</div><div className='infobox-content'>prereqs</div></div>
              <div className='infobox'><div className='infobox-title'>Credits</div><div className='infobox-content'>distribs</div></div>
              <div className='infobox'><div className='infobox-title'>NRO</div><div className='infobox-content'>nroOptions</div></div>
                {/* <div className='infobox'><div className='infobox-title'>CRN</div><div className='infobox-content'>{section.id}</div></div> */}
              </div>
              <h2 style={{ color: '#66451C', fontFamily:'Inter', fontSize:'20px', marginTop:'-65px' }}>{section.name}</h2>
              <p className="prereqs" style={{ marginTop: '0px', textDecoration:'underline', color:'#66451C', fontFamily:'Inter' }}>Prerequisites: prereqs</p>
              <p className="coursedescription" style={{ marginTop:'125px', width: '700px', fontFamily:'Inter', color:'#66451C' }}> courseDescription</p>
              <p className="crosslisted" style={{ marginTop:'30px', color:'#66451C', fontFamily:'Inter' }}>
                Cross-listed Courses: {section.crosslist?.sections?.map(s => s.id).join(', ') || 'None'}
              </p>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  })}

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

  const filteredSubjects = allSubjects.filter(subject =>
    subject.toLowerCase().includes(query.toLowerCase())
  );

  const formatSchedule = (section: Section): { timeStr: string; building: string; room: string } => {
    if (!section.schedule?.sessions || section.schedule.sessions.length === 0) {
      return { timeStr: "TBD", building: "TBD", room: "TBD" };
    }
  
    const formatDays = (days: string[]): string => {
      const dayMap: Record<string, string> = {
        M: "Mon",
        T: "Tue",
        W: "Wed",
        R: "Th",
        F: "Fri",
        S: "Sat",
        U: "Sun"
      };
      return days.map(d => dayMap[d] || d).join(" ");
    };
  
    const timeBlocks = section.schedule.sessions.map(session => {
      const days = formatDays(session.class_days.map(d => d.id));
      const start = session.local_begin_time ? formatTime(session.local_begin_time) : "TBD";
      const end = session.local_end_time ? formatTime(session.local_end_time) : "TBD";
      return `${days} ${start}–${end}`;
    });
  
    const firstLocation = section.schedule.sessions.find(s => s.location)?.location;
    return {
      timeStr: timeBlocks.join(" | "),
      building: firstLocation?.building?.name || "TBD",
      room: firstLocation?.room || "TBD"
    };
  };
  

  const columns = splitIntoColumns(filteredSubjects, 3);

  return isNextClicked ? (
    <CourseListSearch
      selectedSubjects={selectedSubjects}
      setSelectedSubjects={setSelectedSubjects}
    />
  ) : (
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
              {col.map(subject => (
                <label key={subject}>
                  <input
                    type="checkbox"
                    className="box"
                    checked={selectedSubjects.includes(subject)}
                    onChange={() => handleSubjectChange(subject)}
                  />
                  <div className="content">
                    <div className="dot"><img src={checkIcon} alt="check" className="check-icon" /></div>
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
            onClick={() => setIsNextClicked(true)}
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

