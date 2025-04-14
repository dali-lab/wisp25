/* eslint-disable max-len */
import { Outlet, Link } from 'react-router-dom';
import FigmaIcon1 from '../../figma-42.svg?react';
import FigmaIcon2 from '../../figma-9.svg?react';
import '../../coursesearchcomponent.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const CoffeeChat = () => {
  const [courses, setCourses] = useState( [] );
  
  useEffect(() => {
    console.log('use effect is running');
    axios.get('/api/academic/courses', {
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJmMDA3YjAyIiwiYXVkIjoiaHR0cHM6Ly9hcGkuZGFydG1vdXRoLmVkdSIsImlzcyI6Imh0dHBzOi8vYXBpLmRhcnRtb3V0aC5lZHUvYXBpL2p3dCIsIm5hbWUiOiJDb2xsZWVuIEMuIENyYW5uYSIsImV4cCI6MTc0NDY3MDA0OSwiaWF0IjoxNzQ0NjU5MjQ5LCJlbWFpbCI6IkNvbGxlZW4uQy5DcmFubmEuMjhAZGFydG1vdXRoLmVkdSJ9.JgVrGJ84dONAWKFH4pI9mfCXw1q9heSg-Uqv6lDTC-0ngzOw4U7swrWn4_YkXizobUyBfhrR3GbdYpMo60lmXczFhwjkTNUrpQQ0XcfxyhlOAE0GuPx3LDPsasl7e1hnO2zgEraQXAhStKjQYJyxaT7nqIrzpP7p34LTF83PHgan5vtvb7BSHHakIuW9Mj__l1JXeUJdO-MYgas0r-LKOQMEnqCluS1uFELUgMfu7yMeNoPyXo3v_qXvP1-zvITAJw5_DB1l6Til1UQeE8wsSCIe_a-Xq5rPyfoaj9Mo_V3IX88XBcUdGo97jnZ7vZ2zaahu_SbGWJN7WlBO7ZLvtw',
      },
    })
      .then((response) => {
        console.log(response.data); 
        setCourses(response.data);
        console.log(courses[500]);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  
  }, []);

  const course = courses[502];
  const departmentID = course?.department_id;
  const courseName = course?.orc_title;
  const courseDescription = course?.orc_description;
  const nroOptions = course?.non_recording_options?.length
    ? course.non_recording_options.map(opt => opt?.id ?? 'N/A').join(', ')
    : 'N/A';
  const prereqs = course?.prerequisites?.map(opt => opt.description).join(', ') || 'N/A';
  const crosslists = course?.valid_crosslists?.length
    ? course.valid_crosslists.map(opt => opt?.id ?? 'N/A').join(', ')
    : 'N/A';
  const distribs = course?.distributives?.length
    ? course.distributives.map(opt => opt?.id ?? 'N/A').join(', ')
    : 'N/A';
  
  return (
    <div className="Course-Info">
      <div>
        <div className="Course-Header-Rectangle">
          <h2 style={{ fontSize:'30px', marginTop:'10px', fontFamily:'Helvetica' }}> {departmentID} </h2>
          <FigmaIcon1 className='figma-icon1' />
        </div>
        <div className="Course-Info-Rectangle">
          <FigmaIcon2 className='figma-icon2'/>
          <div className='courseinfoboxes'>
            <div className='infobox'>
              <div className='infobox-title'>Instructor</div>
              <div className='infobox-content'>Instructor</div>
            </div>
            <div className='infobox'>
              <div className='infobox-title'>Time</div>
              <div className='infobox-content'>3A</div>
            </div>
            <div className='infobox'>
              <div className='infobox-title'>Credits</div>
              <div className='infobox-content'>{distribs}</div>
            </div>
            <div className='infobox'>
              <div className='infobox-title'>NRO</div>
              <div className='infobox-content'>{nroOptions} </div>
            </div>
            <div className='infobox'>
              <div className='infobox-title'>CRN</div>
              <div className='infobox-content'>32011</div>
            </div>
            <div className='infobox'>
              <div className='infobox-title'>Pre Req</div>
              <div className='infobox-content'>{prereqs}</div>
            </div>
          </div>
          <h2 style={{ color: '#66451C', fontFamily:'Inter', fontSize:'20px', marginTop:'-65px' }}>{courseName}</h2>
          <p className="prereqs" style={{ marginTop: '0px', textDecoration:'underline', color:'#66451C', fontFamily:'Inter' }}>Prerequisites: {prereqs} </p>
          <p className="coursedescription" style={{ marginTop:'125px', width: '700px', fontFamily:'Inter', color:'#66451C' }}> {courseDescription} </p>
          <p className="crosslisted" style={{ marginTop:'30px', color:'#66451C', fontFamily:'Inter' }} > Cross-listed Courses: {crosslists}</p>
        </div>
      </div>
  
   
    </div>

  );
};
export default CoffeeChat;



