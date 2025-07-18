"use client";

import { Button } from "@webcampus/ui/components/button";
import jsPDF from "jspdf";
import React from "react";

const courses = [
  {
    code: "23CS4ESCRP",
    name: "Cryptography",
    type: "Professional Core Course (PC)",
    faculty: "Syed Akram",
  },
  {
    code: "23CS4PCSED",
    name: "Software Engineering",
    type: "Professional Core Course (PC)",
    faculty: "Sandhya A Kulkarni",
  },
  {
    code: "23CS4PCADA",
    name: "Analysis And Design Of Algorithms",
    type: "Professional Core Course (PC)",
    faculty: "Namratha M",
  },
  {
    code: "23CS4PCOPS",
    name: "Operating Systems",
    type: "Professional Core Course (PC)",
    faculty: "Dr. Selva Kumar S",
  },
  {
    code: "23CS4PCTFC",
    name: "Theoretical Foundations Of Computations",
    type: "Professional Core Course (PC)",
    faculty: "Dr. Kavitha Sooda",
  },
  {
    code: "23NCMC4PE2",
    name: "Physical Education-2",
    type: "Non-Credit Mandatory Course (NCMC)",
    faculty: "Nagaraja C",
  },
  {
    code: "23MA4BSLAO",
    name: "Linear Algebra and Optimization",
    type: "Basic Science Courses (BS)",
    faculty: "Dr Bandar Mallikarjuna",
  },
  {
    code: "22MA4BSMAT",
    name: "ADDITIONAL MATHEMATICS-2",
    type: "Basic Science Courses (BS)",
    faculty: "Dr. Umesh V",
  },
  {
    code: "22MA4AEUHV",
    name: "Universal Human Values",
    type: "Ability Enhancement Courses (AE)",
    faculty: "MEGHA J",
  },
  {
    code: "23CS4AEMAD",
    name: "Mobile Application Development",
    type: "Ability Enhancement Courses (AE)",
    faculty: "Dr. Seema patil",
  },
];

export default function CoursesPage() {
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("REGULAR COURSE REGISTRATION FORM", 60, 20);
    doc.text("Name of the Student : PRAJWAL K S", 10, 30);
    doc.text("USN : 1BM24CS416", 150, 30);
    doc.text("Degree : BE", 10, 40);
    doc.text("Department : Computer Science and Engineering", 60, 40);
    doc.text("Semester : 4", 150, 40);
    doc.text("Course Details", 10, 50);

    let y = 60;
    courses.forEach((course, i) => {
      doc.text(`${i + 1}`, 10, y);
      doc.text(course.name, 20, y);
      doc.text(course.code, 100, y);
      doc.text("CS", 140, y);
      doc.text("4", 150, y);
      doc.text("3", 160, y); // Static credit; update if needed
      y += 10;
    });

    doc.text("Date : 18/07/2025", 10, y + 10);
    doc.text("Total Credits : 22", 150, y + 10);

    doc.text("Signature of the Student", 10, y + 30);
    doc.text("Signature of the Mentor", 80, y + 30);
    doc.text("Signature of the HOD", 150, y + 30);

    doc.save("1BM24CS416-Course_Report.pdf");
  };

  return (
    <div className="p-6 text-sm">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Button onClick={downloadPdf}>Download Report</Button>
      </div>
      <table className="w-full border-collapse border text-sm">
        <thead className="bg-light text-sm uppercase">
          <tr className="bg-gray-500">
            <th className="border px-2 py-1">S.NO</th>
            <th className="border px-2 py-1">COURSE CODE</th>
            <th className="border px-2 py-1">COURSE NAME</th>
            <th className="border px-2 py-1">COURSE TYPE</th>
            <th className="border px-2 py-1">FACULTY NAME</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, idx) => (
            <tr key={idx} className="border-b">
              <td className="border px-2 py-1 text-center">{idx + 1}</td>
              <td className="border px-2 py-1">{course.code}</td>
              <td className="border px-2 py-1">{course.name}</td>
              <td className="border px-2 py-1">{course.type}</td>
              <td className="border px-2 py-1">{course.faculty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
