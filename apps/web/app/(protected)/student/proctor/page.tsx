"use client";

// import { Badge } from "@webcampus/ui/components/badge";
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
import { GraduationCap, MapPin, Phone, User, Users } from "lucide-react";
import React from "react";

export default function ProctorPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-6">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/micah/svg?seed=${currentStudent.name}`}
              />
              <AvatarFallback>
                {currentStudent.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <CardTitle className="text-2xl font-bold">
                {currentStudent.name.toUpperCase()}
              </CardTitle>
              <div className="text-muted-foreground grid gap-1 text-sm">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Student ID: {currentStudent.usn}
                </div>
                <div className="flex items-center">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  {currentStudent.department}
                </div>
              </div>
            </div>

            <div className="space-y-1 text-right">
              {/* <Badge>{currentStudent.proctorDesignation}</Badge> */}
              <p className="text-lg font-semibold">
                <span className="text-gray-500">Proctor:</span>
                {currentStudent.proctorName}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="mr-2 h-5 w-5 text-blue-600" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <p>
            <strong>Phone:</strong> {currentStudent.phone}
          </p>
          <p>
            <strong>Email:</strong> {currentStudent.email}
          </p>
          <p>
            <strong>Date of Birth:</strong> {currentStudent.dateOfBirth}
          </p>
          <p>
            <strong>Blood Group:</strong> {currentStudent.bloodGroup}
          </p>
        </CardContent>
      </Card>

      {/* Academic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GraduationCap className="mr-2 h-5 w-5 text-purple-600" />
            Academic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <p>
            <strong>Department:</strong> {currentStudent.department}
          </p>
          <p>
            <strong>Semester:</strong> {currentStudent.semester}th Semester
          </p>
          <p>
            <strong>Mode of Admission:</strong> {currentStudent.modeOfAdmission}
          </p>
          <p>
            <strong>Accommodation:</strong> {currentStudent.accommodation}
          </p>
        </CardContent>
      </Card>

      {/* Addresses */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              <MapPin className="mr-2 inline h-5 w-5 text-green-600" />{" "}
              Permanent Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-green-800">
              {currentStudent.permanentAddress}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <MapPin className="mr-2 inline h-5 w-5 text-blue-600" /> Present
              Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-blue-800">
              {currentStudent.presentAddress}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Family Info */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Users className="mr-2 h-5 w-5 text-orange-600" /> Family
            Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          {/* Father */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-blue-800">
              Father / Guardian
            </h3>
            <p>
              <strong>Name:</strong> {currentStudent.fatherName}
            </p>
            <p>
              <strong>Occupation:</strong> {currentStudent.fatherOccupation}
            </p>
            <p>
              <strong>Qualification:</strong>{" "}
              {currentStudent.fatherQualification}
            </p>
            <p>
              <strong>Mobile:</strong> {currentStudent.fatherMobile}
            </p>
            <p>
              <strong>Email:</strong> {currentStudent.fatherEmail}
            </p>
          </div>

          {/* Mother */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-pink-800">Mother</h3>
            <p>
              <strong>Name:</strong> {currentStudent.motherName}
            </p>
            <p>
              <strong>Occupation:</strong> {currentStudent.motherOccupation}
            </p>
            <p>
              <strong>Qualification:</strong>{" "}
              {currentStudent.motherQualification}
            </p>
            <p>
              <strong>Mobile:</strong> {currentStudent.motherMobile}
            </p>
            <p>
              <strong>Email:</strong> {currentStudent.motherEmail}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
