// src/pages/Admin/ProjectsPage.jsx
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";


function WideDialogContent({ children }) {
  return (
    <DialogContent
      // important: force wide sizes via utility classes & inline styles (tailwind !important not required)
      className="!w-[92vw] !max-w-[1300px] !h-[85vh] flex flex-col rounded-2xl overflow-hidden bg-white shadow-2xl border"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "92vw",
        maxWidth: "1300px",
        height: "85vh",
      }}
    >
      {children}
    </DialogContent>
  );
}

/** Simple Toast component */
function Toast({ message, type = "success", onClose }) {
  const bg = type === "success" ? "bg-green-600" : "bg-red-600";
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [message]);
  if (!message) return null;
  return (
    <div className={`fixed top-6 right-6 z-50 rounded-xl px-5 py-3 text-white font-medium ${bg} shadow-lg`}>
      {message}
    </div>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // Dialog state
  const [showTransactionDialog, setShowTransactionDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Forms / UI state
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    target: "",
    category: "",
    image: "",
    startDate: "",
    endDate: "",
  });

  const [editData, setEditData] = useState({
    id: null,
    title: "",
    description: "",
    target: "",
    category: "",
    image: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // toast
  const [toast, setToast] = useState({ msg: null, type: "success" });

  // category list (customize as needed)
  const categories = ["Education", "Health", "Environment", "Welfare", "Infrastructure", "Other"];

  // ------------ Helpers & API calls ------------
  const API_BASE = "http://localhost:5000"; // adjust if different

  // Normalizer - converts returned project objects into consistent shape
  const normalizeProjects = (data = []) =>
    data.map((p) => ({
      id: p.id ?? p.Project_ID ?? p.projectId,
      title: p.title ?? p.Project_title ?? p.projectTitle ?? "",
      description: p.description ?? p.Project_Description ?? "",
      target: Number(p.target ?? p.Funds_Required ?? p.FundsRequired ?? 0),
      raised: Number(p.raised ?? p.Fund_Raised ?? p.FundRaised ?? 0),
      category: p.category ?? p.Category ?? "",
      status: p.status ?? p.Project_Status ?? "Ongoing",
      image: p.image ?? p.Image ?? null,
      startDate: p.Start_Date ?? p.startDate ?? null,
      endDate: p.End_Date ?? p.endDate ?? null,
    }));

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin-projects/projects`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(normalizeProjects(data));
    } catch (err) {
      console.error(err);
      setToast({ msg: "Failed to fetch projects", type: "error" });
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchTransactions = async (projectId) => {
    try {
      const res = await fetch(`${API_BASE}/admin-projects/${projectId}/transactions`);
      if (!res.ok) {
        // if 404 or empty result, set empty list
        console.warn("Transactions fetch failed", res.status);
        setTransactions([]);
        return;
      }
      const data = await res.json();
      // normalize Payment_Time field if necessary
      const normalized = data.map((t) => ({
        ...t,
        Payment_Time: t.Payment_Time ?? t.paymentTime ?? t.Payment_Time,
      }));
      setTransactions(normalized);
    } catch (err) {
      console.error("Error fetching transactions", err);
      setTransactions([]);
      setToast({ msg: "Failed to load transactions", type: "error" });
    }
  };

  // open transactions dialog
  const handleViewTransactions = async (project) => {
    setSelectedProject(project);
    await fetchTransactions(project.id);
    setShowTransactionDialog(true);
  };

  // Create new project
  const handleAddProject = async () => {
    if (!newProject.title || !newProject.target || !newProject.category) {
      setToast({ msg: "Please fill required fields", type: "error" });
      return;
    }

    const payload = {
      Project_title: newProject.title,
      Project_Description: newProject.description,
      Funds_Required: Number(newProject.target),
      Fund_Raised: 0,
      Category: newProject.category,
      Image: newProject.image || null,
      Start_Date: newProject.startDate || null,
      End_Date: newProject.endDate || null,
    };

    try {
      const res = await fetch(`${API_BASE}/admin-projects/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || "Failed to add project");
      }

      setToast({ msg: "Project added", type: "success" });
      setShowAddDialog(false);
      setNewProject({ title: "", description: "", target: "", category: "", image: "", startDate: "", endDate: "" });
      await fetchProjects();
    } catch (err) {
      console.error("Add project error", err);
      setToast({ msg: err.message || "Failed to add project", type: "error" });
    }
  };

  // Open edit dialog and load data
  const openEditDialog = (project) => {
    setEditData({
      id: project.id,
      title: project.title,
      description: project.description,
      target: project.target,
      category: project.category,
      image: project.image,
      status: project.status,
      raised: project.raised,  
      startDate: project.startDate ?? "",
      endDate: project.endDate ?? "",
    });
    setSelectedProject(project);
    setShowEditDialog(true);
  };

  // Save edited project (PUT)
  const handleEditSave = async () => {
  const id = editData.id;
  if (!id) {
    setToast({ msg: "Missing project id", type: "error" });
    return;
  }

  // Convert empty strings into NULL
  const safeDate = (d) => (d && d.trim() !== "" ? d : null);

  const payload = {
    Project_title: editData.title,
    Project_Description: editData.description,
    Funds_Required: Number(editData.target),
    Fund_Raised: Number(editData.raised),  // MUST come from existing project
    Category: editData.category,
    Image: editData.image || null,
    Project_Status: editData.status || "Ongoing",
    Start_Date: safeDate(editData.startDate),
    End_Date: safeDate(editData.endDate),
  };

  try {
    const res = await fetch(`${API_BASE}/admin-projects/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.error || "Failed to update project");
    }

    setToast({ msg: "Project updated", type: "success" });
    setShowEditDialog(false);
    await fetchProjects();
  } catch (err) {
    console.error("Update error", err);
    setToast({ msg: err.message || "Failed to update", type: "error" });
  }
};


  // Delete project
  const handleDeleteProject = async () => {
    if (!selectedProject) return;
    try {
      const res = await fetch(`${API_BASE}/admin-projects/${selectedProject.id}`, {
        method: "DELETE",
        headers: { ...getAuthHeaders() },
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || "Failed to delete");
      }
      setToast({ msg: "Project deleted", type: "success" });
      setShowDeleteDialog(false);
      await fetchProjects();
    } catch (err) {
      console.error("Delete error", err);
      setToast({ msg: err.message || "Failed to delete", type: "error" });
    }
  };

  // Export PDF
  const handleDownloadReport = (project, transactionsList = []) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("🎓 Project Donation Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Project: ${project?.title || ""}`, 14, 35);
    doc.text(`Target: ₹${project?.target ?? 0}`, 14, 42);
    doc.text(`Raised: ₹${project?.raised ?? 0}`, 14, 49);
    const progress = project?.target ? ((project.raised / project.target) * 100).toFixed(1) : "0.0";
    doc.text(`Progress: ${progress}%`, 14, 56);

    if ((transactionsList || []).length > 0) {
      autoTable(doc, {
        startY: 70,
        head: [["Donor", "Amount", "Mode", "Status", "Date"]],
        body: transactionsList.map((t) => [
          t.Donor_Name || t.name || "Anonymous",
          `₹${t.Amount ?? t.amount ?? 0}`,
          t.Payment_Mode ?? t.paymentMode ?? "",
          t.Payment_Status ?? t.paymentStatus ?? "",
          new Date(t.Payment_Time ?? t.paymentTime ?? t.Donation_Date ?? Date.now()).toLocaleDateString(),
        ]),
      });
    }

    doc.save(`${(project?.title || "project")}_Report.pdf`);
  };

  // ------------ Filtering ------------
  const filteredProjects = projects.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q || (p.title || "").toLowerCase().includes(q) || (p.category || "").toLowerCase().includes(q);
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Completed" && Number(p.raised) >= Number(p.target)) ||
      (filterStatus === "Active" && Number(p.raised) < Number(p.target));
    return matchesSearch && matchesStatus;
  });

  // UI helpers
  const clearToast = () => setToast({ msg: null, type: "success" });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Toast message={toast.msg} type={toast.type} onClose={clearToast} />

      <Card className="max-w-6xl mx-auto shadow-lg">
        <CardHeader className="flex flex-col md:flex-row justify-between items-center gap-4">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            🎯 Manage Fundraising Projects
          </CardTitle>

          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <Input
              placeholder="Search by title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 rounded"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => setShowAddDialog(true)}
            >
              + Add Project
            </Button>
          </div>
        </CardHeader>

        {/* Projects Table */}
        <CardContent>
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Raised</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredProjects.length ? (
                filteredProjects.map((project) => {
                  const progress = project.target ? (project.raised / project.target) * 100 : 0;
                  const status = progress >= 100 ? "Completed" : "Active";
                  return (
                    <TableRow key={project.id}>
                      <TableCell>{project.id}</TableCell>
                      <TableCell>{project.title}</TableCell>
                      <TableCell>₹{Number(project.target).toLocaleString()}</TableCell>
                      <TableCell>₹{Number(project.raised).toLocaleString()}</TableCell>
                      <TableCell className="w-40">
                        <Progress value={progress} />
                        <p className="text-xs text-gray-600 mt-1">{progress.toFixed(1)}%</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant={status === "Active" ? "default" : "secondary"}>
                          {status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex flex-wrap justify-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedProject(project);
                              setShowViewDialog(true);
                            }}
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => openEditDialog(project)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            className="bg-blue-600 text-white hover:bg-blue-700"
                            onClick={() => handleViewTransactions(project)}
                          >
                            View Transactions
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setSelectedProject(project);
                              setShowDeleteDialog(true);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan="7" className="text-center text-gray-500">
                    No projects found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* TRANSACTIONS DIALOG */}
      <Dialog open={showTransactionDialog} onOpenChange={setShowTransactionDialog}>
        <WideDialogContent>
          <DialogHeader className="flex-shrink-0 border-b pb-3 bg-gray-50">
            <DialogTitle className="text-2xl font-semibold text-gray-800">
              {selectedProject?.title}
            </DialogTitle>
            <DialogDescription className="text-gray-500">💸 Donation Transactions</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-4 py-4 bg-white">
            {transactions.length > 0 ? (
              <div className="border rounded-lg shadow-sm overflow-x-auto">
                <Table className="min-w-full text-sm">
                  <TableHeader className="bg-gray-100 sticky top-0 z-10">
                    <TableRow>
                      <TableHead>Donor Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Mode</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((txn) => (
                      <TableRow key={txn.Donation_ID || txn.donationId || `${txn.transaction_id}-${txn.Amount}`}>
                        <TableCell className="font-medium">
                          {txn.Donor_Name ?? txn.User_Fname ?? txn.name ?? "Anonymous"} {txn.Donor_LName ?? ""}
                        </TableCell>
                        <TableCell>{txn.Donor_Email ?? txn.User_Email ?? "N/A"}</TableCell>
                        <TableCell className="text-right">₹{Number(txn.Amount ?? txn.amount ?? 0).toLocaleString()}</TableCell>
                        <TableCell>{txn.Payment_Mode ?? txn.paymentMode ?? "-"}</TableCell>
                        <TableCell>
                          <Badge variant={(txn.Payment_Status ?? txn.paymentStatus) === "Success" ? "default" : "secondary"}>
                            {txn.Payment_Status ?? txn.paymentStatus ?? "-"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(txn.Payment_Time ?? txn.paymentTime ?? txn.Donation_Date ?? Date.now()).toLocaleDateString()}</TableCell>
                        <TableCell className="max-w-[350px] truncate">{txn.Message ?? txn.message ?? "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-6">No transactions found for this project.</p>
            )}
          </div>

          <DialogFooter className="flex-shrink-0 border-t pt-3 pb-2 bg-gray-50 justify-end sticky bottom-0">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6" onClick={() => handleDownloadReport(selectedProject, transactions)}>
              📄 Download Report
            </Button>
            <Button variant="outline" onClick={() => setShowTransactionDialog(false)}>Close</Button>
          </DialogFooter>
        </WideDialogContent>
      </Dialog>

      {/* VIEW PROJECT DIALOG */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <WideDialogContent>
          <DialogHeader className="flex-shrink-0 border-b pb-3 bg-gray-50">
            <DialogTitle className="text-2xl font-semibold text-gray-800">{selectedProject?.title}</DialogTitle>
            <DialogDescription className="text-gray-500">Project Details</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {selectedProject ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <p><strong>Category:</strong> {selectedProject.category}</p>
                  <p><strong>Status:</strong> {selectedProject.status}</p>
                  <p><strong>Target:</strong> ₹{Number(selectedProject.target).toLocaleString()}</p>
                  <p><strong>Raised:</strong> ₹{Number(selectedProject.raised).toLocaleString()}</p>
                </div>

                <div className="pt-4">
                  <p className="pt-2"><strong>Description:</strong></p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedProject.description}</p>
                </div>

                {selectedProject.image && (
                  <img src={selectedProject.image} alt="Project" className="rounded-lg w-full mt-4" />
                )}
              </>
            ) : (
              <p>No details available.</p>
            )}
          </div>

          <DialogFooter className="flex-shrink-0 border-t pt-3 pb-2 bg-gray-50 justify-end sticky bottom-0">
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>Close</Button>
          </DialogFooter>
        </WideDialogContent>
      </Dialog>

      {/* EDIT PROJECT DIALOG */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <WideDialogContent>
          <DialogHeader className="flex-shrink-0 border-b pb-3 bg-gray-50">
            <DialogTitle className="text-2xl font-semibold text-gray-800">Edit Project</DialogTitle>
            <DialogDescription className="text-gray-500">Update project details</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Title</label>
                <Input value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} className="w-full border rounded p-2">
                  <option value="">Select category</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Target Amount</label>
                <Input type="number" value={editData.target} onChange={(e) => setEditData({ ...editData, target: e.target.value })} />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })} className="w-full border rounded p-2">
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Start Date</label>
                <Input type="date" value={editData.startDate ?? ""} onChange={(e) => setEditData({ ...editData, startDate: e.target.value })} />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">End Date</label>
                <Input type="date" value={editData.endDate ?? ""} onChange={(e) => setEditData({ ...editData, endDate: e.target.value })} />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Image URL</label>
                <Input value={editData.image} onChange={(e) => setEditData({ ...editData, image: e.target.value })} />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea className="w-full border rounded p-2" rows={4} value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />
              </div>
            </div>
          </div>

          <DialogFooter className="flex-shrink-0 border-t pt-3 pb-2 bg-gray-50 justify-end sticky bottom-0">
            <Button className="bg-blue-600 text-white" onClick={handleEditSave}>Save</Button>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
          </DialogFooter>
        </WideDialogContent>
      </Dialog>

      {/* ADD PROJECT DIALOG */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <WideDialogContent>
          <DialogHeader className="flex-shrink-0 border-b pb-3 bg-gray-50">
            <DialogTitle className="text-2xl font-semibold text-gray-800">➕ Add New Project</DialogTitle>
            <DialogDescription className="text-gray-500">Fill in the details to create a new fundraising project.</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Project Title *</label>
                <Input placeholder="Project title" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select value={newProject.category} onChange={(e) => setNewProject({ ...newProject, category: e.target.value })} className="w-full border rounded p-2">
                  <option value="">Select category</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <Input type="date" value={newProject.startDate || ""} onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })} />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">End Date</label>
                <Input type="date" value={newProject.endDate || ""} onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })} />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Target Amount (₹) *</label>
                <Input type="number" placeholder="Required funds" value={newProject.target} onChange={(e) => setNewProject({ ...newProject, target: e.target.value })} />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <Input placeholder="Image link (optional)" value={newProject.image} onChange={(e) => setNewProject({ ...newProject, image: e.target.value })} />
              </div>
            </div>

            <div className="mt-5">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Project Description</label>
              <textarea placeholder="Detailed description..." className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={5} value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
            </div>
          </div>

          <DialogFooter className="flex-shrink-0 border-t pt-4 pb-3 bg-gray-50 justify-end sticky bottom-0">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6" onClick={handleAddProject}>➕ Add Project</Button>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
          </DialogFooter>
        </WideDialogContent>
      </Dialog>

      {/* DELETE CONFIRM DIALOG */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <WideDialogContent>
          <DialogHeader className="flex-shrink-0 border-b pb-3 bg-gray-50">
            <DialogTitle className="text-xl font-semibold text-gray-800">Confirm Delete</DialogTitle>
            <DialogDescription className="text-gray-500">This will permanently delete the project.</DialogDescription>
          </DialogHeader>

          <div className="flex-1 px-4 py-4">
            <p>Are you sure you want to delete <strong>{selectedProject?.title}</strong> (ID: {selectedProject?.id})?</p>
          </div>

          <DialogFooter className="flex-shrink-0 border-t pt-3 pb-2 bg-gray-50 justify-end sticky bottom-0">
            <Button variant="destructive" onClick={handleDeleteProject}>Delete</Button>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          </DialogFooter>
        </WideDialogContent>
      </Dialog>
    </div>
  );
}
