"use client";

import { Button } from "@webcampus/ui/components/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Course {
  sno: number;
  courseCode: string;
  courseName: string;
  courseType: string;
  facultyName: string;
}

interface SemesterData {
  academicYear: string;
  semester: string;
  section: string;
  courses: Course[];
}

const semesters: SemesterData[] = [
  {
    academicYear: "2024-25 Even",
    semester: "4",
    section: "D",
    courses: [
      {
        sno: 1,
        courseCode: "23CS4ESCRP",
        courseName: "Cryptography",
        courseType: "PC",
        facultyName: "Syed Akram",
      },
      {
        sno: 2,
        courseCode: "23CS4PCSED",
        courseName: "Software Engineering",
        courseType: "PC",
        facultyName: "Sandhya A Kulkarni",
      },
      {
        sno: 3,
        courseCode: "23CS4PCADA",
        courseName: "Analysis And Design Of Algorithms",
        courseType: "PC",
        facultyName: "Namratha M",
      },
      {
        sno: 4,
        courseCode: "23CS4PCOPS",
        courseName: "Operating Systems",
        courseType: "PC",
        facultyName: "Dr. Selva Kumar S",
      },
      {
        sno: 5,
        courseCode: "23CS4PCTFC",
        courseName: "Theoretical Foundations Of Computations",
        courseType: "PC",
        facultyName: "Dr. Kavitha Sooda",
      },
      {
        sno: 6,
        courseCode: "23NCMC4PE2",
        courseName: "Physical Education-2",
        courseType: "NCMC",
        facultyName: "Nagaraja C",
      },
      {
        sno: 7,
        courseCode: "23MA4BSLAO",
        courseName: "Linear Algebra and Optimization",
        courseType: "BS",
        facultyName: "Dr Bandar Mallikarjuna",
      },
      {
        sno: 8,
        courseCode: "22MA4BSMAT",
        courseName: "Additional Mathematics-2",
        courseType: "BS",
        facultyName: "Dr Umesh V",
      },
      {
        sno: 9,
        courseCode: "22MA4AEUHV",
        courseName: "Universal Human Values",
        courseType: "AE",
        facultyName: "MEGHA J",
      },
      {
        sno: 10,
        courseCode: "23CS4AEMAD",
        courseName: "Mobile Application Development",
        courseType: "AE",
        facultyName: "Dr. Seema Patil",
      },
    ],
  },
  {
    academicYear: "2024-25 Odd",
    semester: "3",
    section: "D",
    courses: [
      {
        sno: 1,
        courseCode: "23CS3PCOOJ",
        courseName: "Object Oriented Java Programming",
        courseType: "PC",
        facultyName: "Vikrath B.M",
      },
      {
        sno: 2,
        courseCode: "23CS3PCLOD",
        courseName: "Logic Design",
        courseType: "PC",
        facultyName: "Sandhya A Kulkarni",
      },
      {
        sno: 3,
        courseCode: "23CS3PCDBM",
        courseName: "Database Management Systems",
        courseType: "PC",
        facultyName: "Rekha G S",
      },
      {
        sno: 4,
        courseCode: "23CS3PCDST",
        courseName: "Data Structures",
        courseType: "PC",
        facultyName: "Radhika A D",
      },
      {
        sno: 5,
        courseCode: "23CS3PCUSP",
        courseName: "Unix Shell Programming",
        courseType: "PC",
        facultyName: "Surabhi S",
      },
      {
        sno: 6,
        courseCode: "23NCMC3PE1",
        courseName: "Physical Education-1",
        courseType: "NCMC",
        facultyName: "Shivakumarswamy G V",
      },
      {
        sno: 7,
        courseCode: "23MA3BSSDM",
        courseName: "Statistics and Discrete Mathematics",
        courseType: "BS",
        facultyName: "Dr Umesh V",
      },
      {
        sno: 8,
        courseCode: "22MA3BSMAT",
        courseName: "Additional Mathematics - 1",
        courseType: "BS",
        facultyName: "Dr Chaitra V.",
      },
      {
        sno: 9,
        courseCode: "23CS3ESCOA",
        courseName: "Computer Organization And Architecture",
        courseType: "ES",
        facultyName: "Sneha S Bagalkot",
      },
      {
        sno: 10,
        courseCode: "23CS3AEFWD",
        courseName: "Full Stack Web Development",
        courseType: "AE",
        facultyName: "RAMYA K M",
      },
    ],
  },
];

function generatePDF(courses: Course[], title: string) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(`${title} - Course Report`, 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [
      ["S.NO", "COURSE CODE", "COURSE NAME", "COURSE TYPE", "FACULTY NAME"],
    ],
    body: courses.map((c) => [
      c.sno,
      c.courseCode,
      c.courseName,
      c.courseType,
      c.facultyName,
    ]),
  });

  doc.save(`${title.replace(/\s+/g, "_")}_Courses.pdf`);
}

export default function CoursesPage() {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-semibold">Courses</h2>

      {semesters.map((s) => (
        <div
          key={`${s.academicYear}-${s.semester}`}
          className="mb-8 rounded-md border border-gray-300 bg-white p-4 shadow-sm"
        >
          {/* Header */}
          <div className="mb-4 flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
            <div className="font-medium whitespace-nowrap text-blue-700">
              <span>{s.academicYear}</span> &nbsp;
              <span>BE-UG</span> &nbsp;
              <span>Semester:{s.semester}</span> &nbsp;
              <span>Section:{s.section}</span>
            </div>
            <Button
              variant="outline"
              className="w-full border-red-600 text-red-600 md:w-auto"
              onClick={() =>
                generatePDF(
                  s.courses,
                  `${s.academicYear} Semester ${s.semester}`
                )
              }
            >
              ⚙️ Course Registration Form
            </Button>
          </div>

          {/* Table wrapper */}
          <div className="overflow-x-auto">
            <table className="w-full rounded-md border border-gray-300 text-sm text-black">
              <thead className="bg-gray-100 text-black">
                <tr>
                  <th className="border p-2 whitespace-nowrap">S.NO</th>
                  <th className="border p-2 whitespace-nowrap">COURSE CODE</th>
                  <th className="border p-2 whitespace-nowrap">COURSE NAME</th>
                  <th className="border p-2 whitespace-nowrap">COURSE TYPE</th>
                  <th className="border p-2 whitespace-nowrap">FACULTY NAME</th>
                </tr>
              </thead>
              <tbody>
                {s.courses.map((course) => (
                  <tr key={course.courseCode}>
                    <td className="border p-2">{course.sno}</td>
                    <td className="border p-2">{course.courseCode}</td>
                    <td className="border p-2">{course.courseName}</td>
                    <td className="border p-2">{course.courseType}</td>
                    <td className="border p-2">{course.facultyName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
