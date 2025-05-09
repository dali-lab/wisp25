import React from "react";
import "./List.css";

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  prereqs: string;
  crossListed: string;
  time: string;
  credits: string;
  nro: string;
  crn: string;
}

interface ListProps {
  viewMode: "grid" | "list";
  onSelectCourse: (course: Course) => void;
}

const dummyCourses: Course[] = [
  {
    id: 1,
    title: "COSC 50: Software Design and Implementation",
    description:
      "Techniques for building large, reliable, maintainable, and understandable software systems.",
    instructor: "Prof. Smith",
    prereqs: "COSC 10",
    crossListed: "ENGS 050",
    time: "3A",
    credits: "TLA",
    nro: "Eligible",
    crn: "32011",
  },
  {
    id: 2,
    title: "COSC 30: Discrete Mathematics",
    description:
      "Foundations of mathematics relevant to computer science, including logic, sets, and functions.",
    instructor: "Dr. Johnson",
    prereqs: "MATH 8 or equivalent",
    crossListed: "MATH 30",
    time: "10A",
    credits: "TLA",
    nro: "Eligible",
    crn: "31022",
  },
  {
    id: 3,
    title: "COSC 60: Computer Networks",
    description:
      "Covers network protocols, architecture, applications, and security.",
    instructor: "Prof. Lee",
    prereqs: "COSC 50",
    crossListed: "ENGS 060",
    time: "2A",
    credits: "TLA",
    nro: "Ineligible",
    crn: "33045",
  },
  {
    id: 4,
    title: "COSC 70: Machine Learning",
    description:
      "An introduction to the theory and practice of machine learning and data mining.",
    instructor: "Dr. Patel",
    prereqs: "COSC 30, COSC 50",
    crossListed: "QSS 70",
    time: "12",
    credits: "TLA",
    nro: "Eligible",
    crn: "34089",
  },
];
const List: React.FC<ListProps> = ({ viewMode, onSelectCourse }) => {
  return (
    <div className={`course-list ${viewMode}`}>
      {dummyCourses.map((course) => (
        <button
          key={course.id}
          className="course-card course-list-item"
          onClick={() => onSelectCourse(course)}
        >
          {course.title}
        </button>
      ))}
    </div>
  );
};

export default List;
