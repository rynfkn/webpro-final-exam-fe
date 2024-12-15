"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";

interface Transaction {
  id: string;
  owner: string;
  name: string;
  type: "income" | "expense";
  amount: number; 
  notes: string;
}

type TransactionModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  editingTransaction: Transaction | null;
  setEditingTransaction: (transaction: Transaction | null) => void;
  onSubmit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
};

export default function TransactionModal({
  showModal,
  setShowModal,
  editingTransaction,
  setEditingTransaction,
  onSubmit,
  onDelete,
}: TransactionModalProps) {
  const [transaction, setTransaction] = useState<Transaction>({
    id : "",
    owner: "",
    name: "",
    notes: "",
    amount: 0,
    type: "income",
  });

  useEffect(() => {
    if (editingTransaction) {
      setTransaction(editingTransaction);
    }
  }, [editingTransaction]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) =>  {
    e.preventDefault();

    if (!transaction.name || !transaction.amount || !transaction.type) {
      console.error("Please fill out all required fields");
      return;
    }

    try {
      // editing transaction
      if (editingTransaction) {
        const response = await axios.put<Transaction>(`/api/transaction/${transaction.id}`, transaction, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        console.log(response.data);
      }
      
      // new transaction
      else {
        const response = await axios.post<Transaction>("/api/transaction", transaction,  {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
          },
        });

        console.log(response.data);
      }

      setShowModal(false);
      setEditingTransaction(null);
      onSubmit(transaction);
    }
    catch (error)  {
      console.error(error);
    }
  }

  // delete transaction
  const handleDelete = async () => {
    if (!editingTransaction) return;

    try {
      const response = await axios.delete(`/api/transaction/${editingTransaction.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      console.log("Transaction deleted:", response.data);

      onDelete(editingTransaction.id);
      setShowModal(false);
      setEditingTransaction(null);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };


  return (
    showModal && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg w-1/3">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">
              {editingTransaction ? "Edit Transaction" : "Create New Transaction"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="name"
                  value={transaction.name}
                  onChange={handleChange}
                  placeholder="Enter transaction title"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <input
                  type="text"
                  name="notes"
                  value={transaction.notes}
                  onChange={handleChange}
                  placeholder="Enter transaction description"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={transaction.amount}
                  onChange={handleChange}
                  placeholder="Enter transaction amount"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Category</label>
                <select
                  name="categories"
                  value={transaction.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="income">Income</option>
                  <option value="expenses">Expenses</option>
                </select>
              </div>
              <div className="flex justify-end">
                {editingTransaction && (
                  <Button
                    type="button"
                    className="mr-2 bg-red-500 text-white"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                )}
                <Button type="button" className="mr-2" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingTransaction ? "Save Changes" : "Create"}</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
}