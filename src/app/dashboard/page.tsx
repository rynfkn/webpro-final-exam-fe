"use client";

import Navbar from "@/components/molecules/navbar/NavBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="container flex flex-col mx-auto space-y-8">
        <h1 className="text-4xl font-bold mt-10">Welcome!</h1>
        <section className="w-full flex flex-row gap-5">
          <Card className="w-1/3">
            <CardHeader>
              <CardTitle>Net Worth</CardTitle>
            </CardHeader>
            <CardContent>Rp. 10.000.000</CardContent>
          </Card>
          <Card className="w-1/3">
            <CardHeader>
              <CardTitle>Net Worth</CardTitle>
            </CardHeader>
            <CardContent>Rp. 10.000.000</CardContent>
          </Card>
          <Card className="w-1/3">
            <CardHeader>
              <CardTitle>Net Worth</CardTitle>
            </CardHeader>
            <CardContent>Rp. 10.000.000</CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
