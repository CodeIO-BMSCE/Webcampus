"use client";

import { currentStudent } from "@/app/(protected)/student/data/student";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@webcampus/ui/components/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@webcampus/ui/components/card";

export default function StudentProfilePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/micah/svg?seed=${currentStudent.name}`}
            alt="Profile"
          />
          <AvatarFallback>
            {currentStudent.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold">{currentStudent.name}</h2>
          <p className="text-muted-foreground text-sm">{currentStudent.usn}</p>
          <p className="text-muted-foreground text-sm">
            {currentStudent.email}
          </p>
          <p className="text-muted-foreground text-sm">
            {currentStudent.phone}
          </p>
        </div>
      </div>

      {/* Academic Details */}
      <Card>
        <CardHeader>
          <CardTitle>ACADEMIC DETAILS</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">#</th>
                <th className="border px-3 py-2">Academic Year</th>
                <th className="border px-3 py-2">Dept. Name</th>
                <th className="border px-3 py-2">Programme</th>
                <th className="border px-3 py-2">Semester</th>
                <th className="border px-3 py-2">Section</th>
              </tr>
            </thead>
            <tbody>
              {currentStudent.academicDetails?.map((row, index) => (
                <tr key={index}>
                  <td className="border px-3 py-2">{index + 1}</td>
                  <td className="border px-3 py-2">{row.academicYear}</td>
                  <td className="border px-3 py-2">{row.department}</td>
                  <td className="border px-3 py-2">{row.programme}</td>
                  <td className="border px-3 py-2">{row.semester}</td>
                  <td className="border px-3 py-2">{row.section}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Personal Details */}
      <Card>
        <CardHeader>
          <CardTitle>PERSONAL DETAILS</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          {[
            ["Date of Birth", currentStudent.dateOfBirth],
            ["Gender", currentStudent.gender],
            ["Blood Group", currentStudent.bloodGroup],
            ["Aided/Unaided", currentStudent.aidedOrUnaided],
            ["Category", currentStudent.category],
            ["Personal Email", currentStudent.email],
            ["Alt. Phone", currentStudent.alternatePhone],
            ["Aadhar Card", currentStudent.aadharNumber],
            ["Admission Quota", currentStudent.admissionQuota],
            ["Nationality", currentStudent.nationality],
            ["Passport No.", currentStudent.passportNumber],
            ["VISA Validity", currentStudent.visaValidity],
            ["Permanent Address", currentStudent.permanentAddress],
            ["Present Address", currentStudent.presentAddress],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <span className="text-muted-foreground">{label}:</span>
              <span className="font-semibold">{value || "-"}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Family Details */}
      <Card>
        <CardHeader>
          <CardTitle>FAMILY PARTICULARS</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Details</th>
                <th className="border px-3 py-2">Father / Guardian</th>
                <th className="border px-3 py-2">Mother</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Name", currentStudent.fatherName, currentStudent.motherName],
                [
                  "Occupation",
                  currentStudent.fatherOccupation,
                  currentStudent.motherOccupation,
                ],
                [
                  "Qualification",
                  currentStudent.fatherQualification,
                  currentStudent.motherQualification,
                ],
                [
                  "Mobile",
                  currentStudent.fatherMobile,
                  currentStudent.motherMobile,
                ],
                [
                  "Email",
                  currentStudent.fatherEmail,
                  currentStudent.motherEmail,
                ],
              ].map(([label, father, mother], i) => (
                <tr key={i}>
                  <td className="border px-3 py-2">{label}</td>
                  <td className="border px-3 py-2">{father || "-"}</td>
                  <td className="border px-3 py-2">{mother || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Education Details */}
      <Card>
        <CardHeader>
          <CardTitle>EDUCATION DETAILS</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">#</th>
                <th className="border px-3 py-2">Qualification</th>
                <th className="border px-3 py-2">Institute</th>
                <th className="border px-3 py-2">Year of Passing</th>
                <th className="border px-3 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {currentStudent.educationDetails?.map((e, idx) => (
                <tr key={idx}>
                  <td className="border px-3 py-2">{idx + 1}</td>
                  <td className="border px-3 py-2">{e.qualification}</td>
                  <td className="border px-3 py-2">{e.institute}</td>
                  <td className="border px-3 py-2">{e.yearOfPassing}</td>
                  <td className="border px-3 py-2">{e.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle>DOCUMENTS</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-start space-y-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src="https://api.dicebear.com/7.x/micah/svg?seed=Passport"
                alt="Passport"
              />
              <AvatarFallback>--</AvatarFallback>
            </Avatar>
            <button className="text-sm text-blue-600 underline">
              Download
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
