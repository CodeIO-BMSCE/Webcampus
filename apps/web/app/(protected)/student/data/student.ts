export interface EducationDetail {
  qualification: string;
  institute: string;
  yearOfPassing: string;
  score: string;
}

export interface AcademicDetail {
  academicYear: string;
  department: string;
  programme: string;
  semester: number;
  section: string;
}

export interface Student {
  id: string;
  usn: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  accommodation: string;
  modeOfAdmission: string;
  semester: number;
  department: string;
  permanentAddress: string;
  presentAddress: string;
  proctorName: string;
  proctorDesignation: string;

  // New personal fields
  nationality: string;
  passportNumber: string;
  visaValidity: string;
  alternatePhone: string;
  aadharNumber: string;
  admissionQuota: string;
  category: string;
  aidedOrUnaided: string;

  // Parents
  fatherName: string;
  fatherOccupation: string;
  fatherQualification: string;
  fatherMobile: string;
  fatherEmail: string;
  motherName: string;
  motherOccupation: string;
  motherQualification: string;
  motherMobile: string;
  motherEmail: string;

  // New sections
  educationDetails: EducationDetail[];
  academicDetails: AcademicDetail[];
}

export const currentStudent: Student = {
  id: "1",
  usn: "1BM24CS416",
  name: "Prajwal K S",
  email: "prajwalks.cs24@bmsce.ac.in",
  phone: "9876543210",
  dateOfBirth: "05-09-2005",
  gender: "Male",
  bloodGroup: "O+",
  accommodation: "-",
  modeOfAdmission: "DCET (COLLEGE CODE- E048)",
  semester: 4,
  department: "Computer Science Engineering",
  permanentAddress:
    "T-13 Balaji Apartments ,2nd main Hegganahalli near KTG school,Bengaluru",
  presentAddress:
    "T-13 Balaji Apartments ,2nd main Hegganahalli near KTG school,Bengaluru",
  proctorName: "Dr Shashikala",
  proctorDesignation: "Assistant Professor",

  nationality: "Indian",
  passportNumber: "-",
  visaValidity: "-",
  alternatePhone: "9845321xxx",
  aadharNumber: "XXXX-XX-XXX-XXX",
  admissionQuota: "DCET",
  category: "General",
  aidedOrUnaided: "Unaided",

  fatherName: "Sureshappa N",
  fatherOccupation: "Senior Supervisor",
  fatherQualification: "B.A",
  fatherMobile: "9844531xxx",
  fatherEmail: "sureshappa@gmail.com",
  motherName: "Sujata B J",
  motherOccupation: "Architect",
  motherQualification: "B .Arch",
  motherMobile: "9741228xxx",
  motherEmail: "sujata@gmail.com",

  academicDetails: [
    {
      academicYear: "2023-24 Odd",
      department: "Computer Science and Engineering",
      programme: "BE - UG",
      semester: 3,
      section: "D",
    },
    {
      academicYear: "2024-25 Even",
      department: "Computer Science and Engineering",
      programme: "BE - UG",
      semester: 4,
      section: "D",
    },
  ],

  educationDetails: [
    {
      qualification: "Class X / SSLC",
      institute: "Podar International School",
      yearOfPassing: "2021",
      score: "83.5",
    },
    {
      qualification: "Diploma",
      institute: "DS Dinakar Polytechnic (DTE Code: 502)",
      yearOfPassing: "2024",
      score: "88%",
    },
  ],
};
