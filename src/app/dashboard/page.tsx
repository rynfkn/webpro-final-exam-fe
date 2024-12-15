"use client";

import Navbar from "@/components/molecules/navbar/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ListPersonalTransaction from "@/components/organism/dashboard/ListPersonalTransaction";
import { useEffect, useState } from "react";
import TransactionModal from "@/components/organism/dashboard/TransactionModal";

import axios from "axios";

interface Transaction {
  id: string;
  owner: string;
  name: string;
  type: "income" | "expense";
  amount: number;
  notes: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: {
    count: number;
    data: Transaction[];
  };
}

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  const [listTransaction, setListTransaction] = useState<Transaction[]>([]);
  useEffect(() => {
    getListTransaction();
  }, []);

  //Get list of transactions
  const getListTransaction = async () => {
    const token = localStorage.getItem("userToken");
    try {
      const response = await axios.get<ApiResponse>(`/api/transaction/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const transactions = response.data.data.data;
        calculateNetWorth(transactions);
        console.log(transactions);

        if (transactions && transactions.length > 0) {
          setListTransaction(transactions);
        } else {
          console.log("No transactions available");
          setListTransaction([]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // calculate
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalNetWorth, setTotalNetWorth] = useState(0);

  const calculateNetWorth = (transactions: Transaction[]) =>  {
    let income = 0;
    let expenses = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        income += transaction.amount;
      } else {
        expenses += transaction.amount;
      }
    });

    setTotalIncome(income);
    setTotalExpenses(expenses);
    setTotalNetWorth(income - expenses);
  }


  return (
    <div className="h-screen">
      <Navbar />
      <div className="container flex flex-col mx-auto space-y-8">
        <h1 className="text-4xl font-bold mt-10">Welcome!</h1>
        <section className="w-full flex flex-row gap-5">
          <Card className="w-1/3">
            <CardHeader>
              <CardTitle>INCOME</CardTitle>
            </CardHeader>
            <CardContent>Rp. {totalIncome.toLocaleString("id-ID")}</CardContent>
          </Card>
          <Card className="w-1/3">
            <CardHeader>
              <CardTitle>EXPENSES</CardTitle>
            </CardHeader>
            <CardContent>Rp. {totalExpenses.toLocaleString("id-ID")}</CardContent>
          </Card>
          <Card className="w-1/3">
            <CardHeader>
              <CardTitle>NET WORTH</CardTitle>
            </CardHeader>
            <CardContent>Rp. {totalNetWorth.toLocaleString("id-ID")}</CardContent>
          </Card>
        </section>

        <section>
          <Button onClick={() => setShowModal(true)}>Create Transaction</Button>
        </section>

        <section>
          <ListPersonalTransaction
            transactions={listTransaction}
            onEdit={handleEditTransaction}
          />
        </section>

        <TransactionModal
          showModal={showModal}
          setShowModal={setShowModal}
          editingTransaction={editingTransaction}
          setEditingTransaction={setEditingTransaction}
          onSubmit={() => {}}
          onDelete={() => {}}
        />
      </div>
    </div>
  );
}
