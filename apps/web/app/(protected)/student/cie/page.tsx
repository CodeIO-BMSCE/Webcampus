"use client";

import { Card, CardContent } from "@webcampus/ui/components/card";
import { Separator } from "@webcampus/ui/components/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@webcampus/ui/components/table";

const cieData = [
  {
    course: "Software Engineering (23CS4PCSED)",
    faculty: "Sandhya A Kulkarni",
    cie1: "12.75/20",
    cie2: "ab",
    cie3: "10.25/20",
    aat1: "4.25/5",
    aat2: "1.75/5",
    total: "29(50)",
    lab1: "-",
    lab2: "-",
    labTotal: "-",
    cieTotal: "29(50)",
    status: "ELIGIBLE",
  },
  {
    course: "Cryptography (23CS4ESCRP)",
    faculty: "Syed Akram",
    cie1: "5.25/20",
    cie2: "9.50/20",
    cie3: "11.00/20",
    aat1: "2.00/5",
    aat2: "-",
    total: "28(50)",
    lab1: "-",
    lab2: "-",
    labTotal: "-",
    cieTotal: "28(50)",
    status: "ELIGIBLE",
  },
  {
    course: "Analysis And Design Of Algorithms (23CS4PCADA)",
    faculty: "Namratha M",
    cie1: "9.25/10",
    cie2: "7.75/10",
    cie3: "5.50/10",
    aat1: "4.50/5",
    aat2: "-",
    total: "23(25)",
    lab1: "23.00/25",
    lab2: "-",
    labTotal: "23(25)",
    cieTotal: "46(50)",
    status: "ELIGIBLE",
  },
  {
    course: "Operating Systems (23CS4PCOPS)",
    faculty: "Dr. Selva Kumar S",
    cie1: "6.25/10",
    cie2: "8.00/10",
    cie3: "9.00/10",
    aat1: "3.50/5",
    aat2: "2.00/5",
    total: "22(25)",
    lab1: "25.00/25",
    lab2: "-",
    labTotal: "25(25)",
    cieTotal: "47(50)",
    status: "ELIGIBLE",
  },
  {
    course: "Theoretical Foundations Of Computations (23CS4PCTFC)",
    faculty: "Dr. Kavitha Sooda",
    cie1: "15.50/20",
    cie2: "17.75/20",
    cie3: "18.25/20",
    aat1: "3.00/5",
    aat2: "2.50/5",
    total: "41(50)",
    lab1: "-",
    lab2: "-",
    labTotal: "-",
    cieTotal: "41(50)",
    status: "ELIGIBLE",
  },
  {
    course: "Linear Algebra and Optimization (23MA4BSLAO)",
    faculty: "Dr Bandaru Mallikarjuna",
    cie1: "4.25/20",
    cie2: "13.50/20",
    cie3: "9.00/20",
    aat1: "1.25/5",
    aat2: "0.50/5",
    total: "28(50)",
    lab1: "-",
    lab2: "-",
    labTotal: "-",
    cieTotal: "28(50)",
    status: "ELIGIBLE",
  },
  {
    course: "Universal Human Values (22MA4AEUHV)",
    faculty: "MEGHA J",
    cie1: "-",
    cie2: "-",
    cie3: "-",
    aat1: "-",
    aat2: "-",
    total: "-",
    lab1: "-",
    lab2: "-",
    labTotal: "-",
    cieTotal: "46",
    status: "ELIGIBLE",
  },
  {
    course: "Mobile Application Development (23CS4AEMAD)",
    faculty: "Dr. Seema Patil",
    cie1: "-",
    cie2: "-",
    cie3: "-",
    aat1: "-",
    aat2: "-",
    total: "-",
    lab1: "-",
    lab2: "-",
    labTotal: "-",
    cieTotal: "43",
    status: "ELIGIBLE",
  },
  {
    course: "Physical Education-2 (23NCMC4PE2)",
    faculty: "Nagaraja C",
    cie1: "-",
    cie2: "-",
    cie3: "-",
    aat1: "-",
    aat2: "-",
    total: "-",
    lab1: "-",
    lab2: "-",
    labTotal: "-",
    cieTotal: "PP",
    status: "ELIGIBLE",
  },
  {
    course: "Additional Mathematics-2 (22MA4BSMAT)",
    faculty: "Dr. Umesh V",
    cie1: "-",
    cie2: "-",
    cie3: "-",
    aat1: "-",
    aat2: "-",
    total: "-",
    lab1: "-",
    lab2: "-",
    labTotal: "-",
    cieTotal: "PP",
    status: "ELIGIBLE",
  },
];

export default function CiePage() {
  return (
    <main className="space-y-4 p-4 sm:p-6">
      <h1 className="text-2xl font-bold">CIE Report - Semester 4</h1>
      <Separator />
      <Card>
        <CardContent className="overflow-x-auto p-4">
          <div className="min-w-[1000px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.NO</TableHead>
                  <TableHead>COURSE</TableHead>
                  <TableHead>CIE-1</TableHead>
                  <TableHead>CIE-2</TableHead>
                  <TableHead>CIE-3</TableHead>
                  <TableHead>AAT-1</TableHead>
                  <TableHead>AAT-2</TableHead>
                  <TableHead>TOTAL</TableHead>
                  <TableHead>LAB-1</TableHead>
                  <TableHead>LAB-2</TableHead>
                  <TableHead>LAB TOTAL</TableHead>
                  <TableHead>CIE TOTAL MARKS</TableHead>
                  <TableHead>STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cieData.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      <div className="font-semibold">{item.course}</div>
                      <div className="text-muted-foreground text-sm">
                        {item.faculty}
                      </div>
                    </TableCell>
                    <TableCell>{item.cie1}</TableCell>
                    <TableCell>{item.cie2}</TableCell>
                    <TableCell>{item.cie3}</TableCell>
                    <TableCell>{item.aat1}</TableCell>
                    <TableCell>{item.aat2}</TableCell>
                    <TableCell>{item.total}</TableCell>
                    <TableCell>{item.lab1}</TableCell>
                    <TableCell>{item.lab2}</TableCell>
                    <TableCell>{item.labTotal}</TableCell>
                    <TableCell>{item.cieTotal}(50)</TableCell>
                    <TableCell
                      className={`font-medium ${
                        item.status === "ELIGIBLE"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
