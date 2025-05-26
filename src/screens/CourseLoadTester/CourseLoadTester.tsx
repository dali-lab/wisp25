import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useState } from 'react';
import '../screens/CourseLoadTester.css';

type Course = {
  id: string;
  name: string;
}

const initialCourses = [
  { id: 'course-1', name: 'Course 1' },
  { id: 'course-2', name: 'Course 2' },
  { id: 'course-3', name: 'Course 3' },
  { id: 'course-4', name: 'Course 4' },
];

const CourseLoadTester = () => {
  const [savedCourses, setSavedCourses] = useState<Course[]>(initialCourses);
  const [courseLoad, setCourseLoad] = useState<Course[]>([]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
  
    if (source.droppableId === destination.droppableId) {
      const items = Array.from(
        source.droppableId === 'saved' ? savedCourses : courseLoad
      );
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);
  
      if (source.droppableId === 'saved') {
        setSavedCourses(items);
      } else {
        setCourseLoad(items);
      }
    } else {
      const sourceItems = Array.from(
        source.droppableId === 'saved' ? savedCourses : courseLoad
      );
      const destItems = Array.from(
        destination.droppableId === 'saved' ? savedCourses : courseLoad
      );
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);
  
      if (source.droppableId === 'saved') {
        setSavedCourses(sourceItems);
        setCourseLoad(destItems);
      } else {
        setSavedCourses(destItems);
        setCourseLoad(sourceItems);
      }
    }
  };

  const renderCourseLoadMessage = () => {
    if (courseLoad.length < 2) {
      return (
        <div className="warning red">
          Minimum of Two Courses is needed
          <div className="warning-icon">⚠️</div>
        </div>
      );
    } else if (courseLoad.length <= 3) {
      return (
        <div className="warning green">
          Balanced Course Load<br />
          Optional: Add one more course
          <div className="info-icon">ℹ️</div>
        </div>
      );
    } else {
      return (
        <div className="warning red">
          Maximum Course Load<br />
          <div className="warning-icon">⚠️</div>
        </div>
      );
    }
  };

  return (
    <div className="container">
      <h2 className="title">Course Load Tester ⓘ</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          <Droppable droppableId="saved">
            {(provided) => (
              <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
                <h3>Saved Courses</h3>
                {savedCourses.map((course, index) => (
                  <Draggable draggableId={course.id} index={index} key={course.id}>
                    {(provided) => (
                      <div
                        className="card" 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                        style={{...provided.draggableProps.style}}>
                        <div className="card-title">{course.name}</div>
                        <div className="book">📖</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="load">
            {(provided) => (
              <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
                <h3>Course Load</h3>
                {courseLoad.map((course, index) => (
                  <Draggable draggableId={course.id} index={index} key={course.id}>
                    {(provided) => (
                      <div
                        className="card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{...provided.draggableProps.style}}>
                        <div className="card-title">{course.name}</div>
                        <div className="book">📖</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {renderCourseLoadMessage()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default CourseLoadTester;