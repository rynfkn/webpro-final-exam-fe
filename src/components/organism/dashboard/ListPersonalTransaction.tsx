import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transaction {
  id: string;
  owner: string;
  name: string;
  type: "income" | "expense";
  amount: number; 
  notes: string;
}

interface ListPersonalTransactionProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
}

export default function ListPersonalTransaction({
  transactions,
  onEdit,
}: ListPersonalTransactionProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="w-[5%]">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.name}</TableCell>
              <TableCell>
                {transaction.type === "income" ? "Income" : "Expense"}
              </TableCell>
              <TableCell>
                {transaction.amount.toLocaleString("id-ID")}
              </TableCell>
              <TableCell>{transaction.notes}</TableCell>
              <TableCell>
                <Button onClick={() => onEdit(transaction)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No transactions available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
