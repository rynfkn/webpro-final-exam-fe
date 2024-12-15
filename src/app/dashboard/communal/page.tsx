"use client";

import Navbar from "@/components/molecules/navbar/NavBar";
import ListCommunalTransaction from "@/components/organism/dashboard/ListCommunalTransaction";
import TransactionModal from "@/components/organism/dashboard/TransactionModal";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

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

export default function CommunalPage() {
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
  return (
    <div className=" h-screen flex flex-col mx-auto gap-8">
      <Navbar />

      <section className="container mx-auto">
        <h1 className="text-4xl font-bold mt-10 text-left">
          Communal Transaction
        </h1>
      </section>

      <section className="container mx-auto">
        <Button onClick={() => setShowModal(true)}>Create Transaction</Button>
      </section>

      <section className="container mx-auto">
        <ListCommunalTransaction
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
  );
}
