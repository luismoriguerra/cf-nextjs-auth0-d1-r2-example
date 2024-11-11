'use client';
import React, { useEffect } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import DataTableCrud from "@/components/ui/data-table-crud";

export default function UsersPage() {
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch("/api/v1/management/users", {
                cache: "no-store",
            });
            const users: any = await res.json();
            setUsers(users.data);
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <DataTableCrud />
            {/* <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user: any) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table> */}
        </div>
    );
}
