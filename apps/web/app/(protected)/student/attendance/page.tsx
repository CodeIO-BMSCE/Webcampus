"use client";

import React from "react";

export default function Page() {
  const attendanceData = [
    {
      sno: 1,
      code: "23CS4ESCRP",
      name: "Cryptography",
      faculty: "Syed Akram",
      total: 40,
      na: 0,
      present: 40,
      absent: 0,
      condonation: "--",
      percent: "100%",
    },
    {
      sno: 2,
      code: "23CS4PCSED",
      name: "Software Engineering",
      faculty: "Sandhya A Kulkarni",
      total: 40,
      na: 0,
      present: 40,
      absent: 0,
      condonation: "--",
      percent: "100%",
    },
    {
      sno: 3,
      code: "23CS4PCADA",
      name: "Analysis And Design Of Algorithms",
      faculty: "Namratha M",
      total: 40,
      na: 0,
      present: 40,
      absent: 0,
      condonation: "--",
      percent: "100%",
    },
    {
      sno: 4,
      code: "23CS4PCOPS",
      name: "Operating Systems",
      faculty: "Dr. Selva Kumar S",
      total: 40,
      na: 0,
      present: 40,
      absent: 0,
      condonation: "--",
      percent: "100%",
    },
    {
      sno: 5,
      code: "23CS4PCTFC",
      name: "Theoretical Foundations Of Computations",
      faculty: "Dr. Kavitha Sooda",
      total: 44,
      na: 0,
      present: 44,
      absent: 0,
      condonation: "--",
      percent: "100%",
    },
    {
      sno: 6,
      code: "23CS4PCADA",
      name: "Analysis And Design Of Algorithms [PRACTICAL]",
      faculty: "Anusha S",
      total: 9,
      na: 0,
      present: 9,
      absent: 0,
      condonation: "--",
      percent: "100%",
    },
    {
      sno: 7,
      code: "23CS4PCOPS",
      name: "Operating Systems [PRACTICAL]",
      faculty: "LEELAVATHI.B",
      total: 12,
      na: 0,
      present: 12,
      absent: 0,
      condonation: "--",
      percent: "100%",
    },
    {
      sno: 8,
      code: "23NCMC4PE2",
      name: "Physical Education-2",
      faculty: "Nagaraja C",
      total: 0,
      na: 0,
      present: 0,
      absent: 0,
      condonation: "--",
      percent: "0%",
    },
    {
      sno: 9,
      code: "23MA4BSLAO",
      name: "Linear Algebra and Optimization",
      faculty: "Dr Bandaru Mallikarjuna",
      total: 41,
      na: 0,
      present: 41,
      absent: 0,
      condonation: "--",
      percent: "100%",
    },
    {
      sno: 10,
      code: "22MA4BSMAT",
      name: "ADDITIONAL MATHEMATICS-2",
      faculty: "Dr. Umesh V",
      total: 0,
      na: 0,
      present: 0,
      absent: 0,
      condonation: "--",
      percent: "0%",
    },
    {
      sno: 11,
      code: "22MA4AEUHV",
      name: "Universal Human Values",
      faculty: "MEGHA J",
      total: 9,
      na: 0,
      present: 8,
      absent: 1,
      condonation: "--",
      percent: "89%",
    },
    {
      sno: 12,
      code: "23CS4AEAMD",
      name: "Mobile Application Development [PRACTICAL]",
      faculty: "Dr. Seema patil",
      total: 10,
      na: 0,
      present: 10,
      absent: 0,
      condonation: "--",
      percent: "100%",
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="mb-4 text-2xl font-semibold">Attendance</h2>

      <div className="mb-4 flex flex-col flex-wrap gap-2 text-sm font-semibold text-blue-600 sm:flex-row">
        <span>2024-25 Even</span>
        <span>BE-UG</span>
        <span>Semester:4</span>
        <span>Section:D</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border text-sm">
          <thead className="bg-gray-100 text-xs text-gray-600 uppercase">
            <tr>
              <th className="border px-3 py-2 whitespace-nowrap">S.NO</th>
              <th className="border px-3 py-2 whitespace-nowrap">
                COURSE CODE
              </th>
              <th className="border px-3 py-2 whitespace-nowrap">
                COURSE NAME
              </th>
              <th className="border px-3 py-2 whitespace-nowrap">
                FACULTY NAME
              </th>
              <th className="border px-3 py-2 whitespace-nowrap">TOTAL</th>
              <th className="border px-3 py-2 whitespace-nowrap">NA</th>
              <th className="border px-3 py-2 whitespace-nowrap">PRESENT</th>
              <th className="border px-3 py-2 whitespace-nowrap">ABSENT</th>
              <th className="border px-3 py-2 whitespace-nowrap">
                CONDONATION
              </th>
              <th className="border px-3 py-2 whitespace-nowrap">% PER.</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{row.sno}</td>
                <td className="border px-3 py-2">{row.code}</td>
                <td className="border px-3 py-2">{row.name}</td>
                <td className="border px-3 py-2">{row.faculty}</td>
                <td className="border px-3 py-2">{row.total}</td>
                <td className="border px-3 py-2">{row.na}</td>
                <td className="border px-3 py-2">{row.present}</td>
                <td className="border px-3 py-2">{row.absent}</td>
                <td className="border px-3 py-2">{row.condonation}</td>
                <td className="border px-3 py-2">
                  <span
                    className={`rounded px-2 py-1 text-xs font-bold text-white ${
                      row.percent === "100%"
                        ? "bg-green-500"
                        : parseInt(row.percent) >= 75
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  >
                    {row.percent}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
