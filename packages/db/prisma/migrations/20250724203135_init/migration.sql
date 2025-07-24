-- CreateEnum
CREATE TYPE "SemesterType" AS ENUM ('even', 'odd');

-- CreateEnum
CREATE TYPE "CondonationStatus" AS ENUM ('NOT_REQUESTED', 'PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "EligibilityStatus" AS ENUM ('ELIGIBLE', 'NOT_ELIGIBLE');

-- CreateEnum
CREATE TYPE "AssignmentType" AS ENUM ('THEORY', 'LAB');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT,
    "displayUsername" TEXT,
    "banned" BOOLEAN,
    "banReason" TEXT,
    "banExpires" TIMESTAMP(3),
    "role" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Semester" (
    "id" TEXT NOT NULL,
    "type" "SemesterType" NOT NULL,
    "year" TEXT NOT NULL,
    "name" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isCurrent" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Semester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "impersonatedBy" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hodId" TEXT,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hod" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "departmentName" TEXT,

    CONSTRAINT "Hod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "departmentName" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Batch" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentSection" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "academicYear" TEXT NOT NULL,

    CONSTRAINT "StudentSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "usn" TEXT NOT NULL,
    "departmentName" TEXT NOT NULL,
    "currentSemester" INTEGER NOT NULL,
    "academicYear" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "departmentName" TEXT NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "departmentName" TEXT NOT NULL,
    "hasLab" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseAssignment" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "batchId" TEXT,
    "assignmentType" "AssignmentType" NOT NULL,
    "semester" INTEGER NOT NULL,
    "academicYear" TEXT NOT NULL,

    CONSTRAINT "CourseAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseRegistration" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "academicYear" TEXT NOT NULL,
    "hasDropped" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CourseRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "present" INTEGER NOT NULL,
    "absent" INTEGER NOT NULL,
    "condonationStatus" "CondonationStatus" NOT NULL DEFAULT 'NOT_REQUESTED',
    "percentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mark" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "cie1" DOUBLE PRECISION,
    "cie2" DOUBLE PRECISION,
    "cie3" DOUBLE PRECISION,
    "aat1" DOUBLE PRECISION,
    "aat2" DOUBLE PRECISION,
    "lab1" DOUBLE PRECISION,
    "lab2" DOUBLE PRECISION,
    "labTotal" DOUBLE PRECISION,
    "cieTotal" DOUBLE PRECISION,
    "status" "EligibilityStatus" NOT NULL,

    CONSTRAINT "Mark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Freeze" (
    "id" TEXT NOT NULL,
    "courseAssignmentId" TEXT NOT NULL,
    "cie1Frozen" BOOLEAN NOT NULL DEFAULT false,
    "cie2Frozen" BOOLEAN NOT NULL DEFAULT false,
    "cie3Frozen" BOOLEAN NOT NULL DEFAULT false,
    "cie1Deadline" TIMESTAMP(3),
    "cie2Deadline" TIMESTAMP(3),
    "cie3Deadline" TIMESTAMP(3),
    "facultyFrozen" BOOLEAN NOT NULL DEFAULT false,
    "hodFrozen" BOOLEAN NOT NULL DEFAULT false,
    "adminFrozen" BOOLEAN NOT NULL DEFAULT false,
    "facultyFrozenAt" TIMESTAMP(3),
    "hodFrozenAt" TIMESTAMP(3),
    "adminFrozenAt" TIMESTAMP(3),
    "frozenByFacultyId" TEXT,
    "frozenByHodId" TEXT,
    "frozenByAdminId" TEXT,
    "finalFrozen" BOOLEAN NOT NULL DEFAULT false,
    "finalDeadline" TIMESTAMP(3),
    "frozenAt" TIMESTAMP(3),
    "userId" TEXT,

    CONSTRAINT "Freeze_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BatchStudents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BatchStudents_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Semester_type_year_key" ON "Semester"("type", "year");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Department_hodId_key" ON "Department"("hodId");

-- CreateIndex
CREATE INDEX "Department_name_idx" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Hod_userId_key" ON "Hod"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Hod_departmentName_key" ON "Hod"("departmentName");

-- CreateIndex
CREATE INDEX "Section_departmentName_semester_idx" ON "Section"("departmentName", "semester");

-- CreateIndex
CREATE UNIQUE INDEX "Section_name_departmentName_semester_key" ON "Section"("name", "departmentName", "semester");

-- CreateIndex
CREATE UNIQUE INDEX "Batch_name_sectionId_key" ON "Batch"("name", "sectionId");

-- CreateIndex
CREATE INDEX "StudentSection_studentId_idx" ON "StudentSection"("studentId");

-- CreateIndex
CREATE INDEX "StudentSection_sectionId_idx" ON "StudentSection"("sectionId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentSection_studentId_sectionId_semester_academicYear_key" ON "StudentSection"("studentId", "sectionId", "semester", "academicYear");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_usn_key" ON "Student"("usn");

-- CreateIndex
CREATE INDEX "Student_departmentName_idx" ON "Student"("departmentName");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_userId_key" ON "Faculty"("userId");

-- CreateIndex
CREATE INDEX "Faculty_departmentName_idx" ON "Faculty"("departmentName");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_key" ON "Course"("code");

-- CreateIndex
CREATE INDEX "Course_code_idx" ON "Course"("code");

-- CreateIndex
CREATE INDEX "CourseAssignment_sectionId_semester_idx" ON "CourseAssignment"("sectionId", "semester");

-- CreateIndex
CREATE INDEX "CourseAssignment_batchId_idx" ON "CourseAssignment"("batchId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseAssignment_courseId_facultyId_sectionId_batchId_assig_key" ON "CourseAssignment"("courseId", "facultyId", "sectionId", "batchId", "assignmentType", "semester", "academicYear");

-- CreateIndex
CREATE INDEX "CourseRegistration_studentId_idx" ON "CourseRegistration"("studentId");

-- CreateIndex
CREATE INDEX "CourseRegistration_courseId_idx" ON "CourseRegistration"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseRegistration_studentId_courseId_semester_academicYear_key" ON "CourseRegistration"("studentId", "courseId", "semester", "academicYear");

-- CreateIndex
CREATE INDEX "Attendance_courseId_idx" ON "Attendance"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_studentId_courseId_key" ON "Attendance"("studentId", "courseId");

-- CreateIndex
CREATE INDEX "Mark_courseId_idx" ON "Mark"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Mark_studentId_courseId_key" ON "Mark"("studentId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Freeze_courseAssignmentId_key" ON "Freeze"("courseAssignmentId");

-- CreateIndex
CREATE INDEX "_BatchStudents_B_index" ON "_BatchStudents"("B");

-- AddForeignKey
ALTER TABLE "Semester" ADD CONSTRAINT "Semester_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_hodId_fkey" FOREIGN KEY ("hodId") REFERENCES "Hod"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hod" ADD CONSTRAINT "Hod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_departmentName_fkey" FOREIGN KEY ("departmentName") REFERENCES "Department"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSection" ADD CONSTRAINT "StudentSection_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSection" ADD CONSTRAINT "StudentSection_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_departmentName_fkey" FOREIGN KEY ("departmentName") REFERENCES "Department"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_departmentName_fkey" FOREIGN KEY ("departmentName") REFERENCES "Department"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_departmentName_fkey" FOREIGN KEY ("departmentName") REFERENCES "Department"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseAssignment" ADD CONSTRAINT "CourseAssignment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseAssignment" ADD CONSTRAINT "CourseAssignment_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseAssignment" ADD CONSTRAINT "CourseAssignment_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseAssignment" ADD CONSTRAINT "CourseAssignment_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseRegistration" ADD CONSTRAINT "CourseRegistration_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseRegistration" ADD CONSTRAINT "CourseRegistration_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mark" ADD CONSTRAINT "Mark_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mark" ADD CONSTRAINT "Mark_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Freeze" ADD CONSTRAINT "Freeze_courseAssignmentId_fkey" FOREIGN KEY ("courseAssignmentId") REFERENCES "CourseAssignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Freeze" ADD CONSTRAINT "Freeze_frozenByFacultyId_fkey" FOREIGN KEY ("frozenByFacultyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Freeze" ADD CONSTRAINT "Freeze_frozenByHodId_fkey" FOREIGN KEY ("frozenByHodId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Freeze" ADD CONSTRAINT "Freeze_frozenByAdminId_fkey" FOREIGN KEY ("frozenByAdminId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Freeze" ADD CONSTRAINT "Freeze_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatchStudents" ADD CONSTRAINT "_BatchStudents_A_fkey" FOREIGN KEY ("A") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatchStudents" ADD CONSTRAINT "_BatchStudents_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
