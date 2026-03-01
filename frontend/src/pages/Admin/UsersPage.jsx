import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from "@/components/ui/dialog";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddAdminDialog, setShowAddAdminDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");

  const [newAdmin, setNewAdmin] = useState({
    fname: "",
    lname: "",
    gender: "Male",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    role: "Administrator",
  });

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
      const res = await fetch(`${API_BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleViewUser = async (id) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
      const res = await fetch(`${API_BASE_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSelectedUser(data);
      setShowViewDialog(true);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
      await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u.User_ID !== id));
      setShowDeleteDialog(false);
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleAddAdmin = async () => {
    if (!newAdmin.fname || !newAdmin.lname || !newAdmin.email || !newAdmin.password || !newAdmin.confirmPassword)
      return alert("Please fill all fields");
    if (newAdmin.password !== newAdmin.confirmPassword)
      return alert("Passwords do not match");

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
      const res = await fetch(`${API_BASE_URL}/users/add-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAdmin),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Admin added successfully!");
        setShowAddAdminDialog(false);
        fetchUsers();
      } else {
        alert(data.error || "Failed to add admin");
      }
    } catch (err) {
      console.error("Error adding admin:", err);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesType = filterType === "All" || user.User_Type === filterType;
    const matchesSearch =
      user.User_Fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.Email_ID.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-6xl mx-auto shadow-lg">
        <CardHeader className="flex flex-col md:flex-row justify-between items-center gap-4">
          <CardTitle className="text-2xl font-semibold text-gray-800">👥 Manage Users</CardTitle>

          <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 border rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="All">All Types</option>
              <option value="Alumni">Alumni</option>
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
            </select>

            <Button onClick={() => setShowAddAdminDialog(true)} className="bg-green-600 hover:bg-green-700 text-white">
              + Add Admin
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length ? (
                filteredUsers.map((u) => (
                  <TableRow key={u.User_ID}>
                    <TableCell>{u.User_ID}</TableCell>
                    <TableCell>{`${u.User_Fname} ${u.User_Lname}`}</TableCell>
                    <TableCell>{u.Email_ID}</TableCell>
                    <TableCell>{u.Gender}</TableCell>
                    <TableCell>
                      <Badge variant={u.User_Type === "Admin" ? "destructive" : u.User_Type === "Student" ? "secondary" : "default"}>
                        {u.User_Type}
                      </Badge>
                    </TableCell>
                    <TableCell>{u.Phone_no}</TableCell>
                    <TableCell>{u.Address}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-3">
                        <Button size="sm" variant="outline" onClick={() => handleViewUser(u.User_ID)}>
                          View
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => { setSelectedUser(u); setShowDeleteDialog(true); }}>
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="8" className="text-center text-gray-500">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>All details from the database</DialogDescription>
        </DialogHeader>
        <DialogContent>
          {selectedUser ? (
            <div className="space-y-2">
              <p><strong>ID:</strong> {selectedUser.User_ID}</p>
              <p><strong>Name:</strong> {selectedUser.User_Fname} {selectedUser.User_Lname}</p>
              <p><strong>Email:</strong> {selectedUser.Email_ID}</p>
              <p><strong>Gender:</strong> {selectedUser.Gender}</p>
              <p><strong>Phone:</strong> {selectedUser.Phone_no}</p>
              <p><strong>Address:</strong> {selectedUser.Address}</p>
              <p><strong>Type:</strong> {selectedUser.User_Type}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowViewDialog(false)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{selectedUser?.User_Fname}</strong>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button variant="destructive" onClick={() => handleDeleteUser(selectedUser.User_ID)}>Delete</Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={showAddAdminDialog} onOpenChange={setShowAddAdminDialog}>
        <DialogHeader>
          <DialogTitle>Add New Admin</DialogTitle>
          <DialogDescription>Enter admin details below</DialogDescription>
        </DialogHeader>
        <DialogContent>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="First Name" value={newAdmin.fname} onChange={(e) => setNewAdmin({ ...newAdmin, fname: e.target.value })} className="border p-2 rounded" />
            <input placeholder="Last Name" value={newAdmin.lname} onChange={(e) => setNewAdmin({ ...newAdmin, lname: e.target.value })} className="border p-2 rounded" />
            <select value={newAdmin.gender} onChange={(e) => setNewAdmin({ ...newAdmin, gender: e.target.value })} className="border p-2 rounded">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input placeholder="Phone Number" value={newAdmin.phone} onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })} className="border p-2 rounded" />
            <input placeholder="Email" value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} className="border p-2 rounded col-span-2" />
            <input type="password" placeholder="Password" value={newAdmin.password} onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })} className="border p-2 rounded" />
            <input type="password" placeholder="Confirm Password" value={newAdmin.confirmPassword} onChange={(e) => setNewAdmin({ ...newAdmin, confirmPassword: e.target.value })} className="border p-2 rounded" />
            <textarea placeholder="Address" value={newAdmin.address} onChange={(e) => setNewAdmin({ ...newAdmin, address: e.target.value })} className="border p-2 rounded col-span-2" />
          </div>
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowAddAdminDialog(false)}>Cancel</Button>
          <Button onClick={handleAddAdmin} className="bg-green-600 hover:bg-green-700 text-white">Add Admin</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
