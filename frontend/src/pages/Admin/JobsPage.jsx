import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import jsPDF from "jspdf";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
        const res = await fetch(`${API_BASE_URL}/jobs-api`);
        const data = await res.json();

        const today = new Date();
        const formattedJobs = data.map((j) => ({
          id: j.Job_ID,
          title: j.Job_Title,
          company: j.Company_Name,
          location: j.Location,
          description: j.Description,
          link: j.Application_Link,
          applyFrom: j.Apply_From,
          applyTo: j.Apply_To,
          createdAt: j.Created_At,
          status: new Date(j.Apply_To) >= today ? "Active" : "Closed",
        }));

        setJobs(formattedJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // DELETE FUNCTION
  const confirmDelete = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
      const res = await fetch(`${API_BASE_URL}/jobs-api/${jobToDelete.id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        setMessage("Failed to delete job.");
        setMessageType("error");
        return;
      }

      setJobs((prev) => prev.filter((job) => job.id !== jobToDelete.id));

      setMessage(result.message);
      setMessageType("success");
      setShowDeleteDialog(false);

    } catch (err) {
      console.error(err);
      setMessage("Error deleting job.");
      setMessageType("error");
    }
  };


  const handleDownloadPDF = (job) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("💼 Job Details Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Job Title: ${job.title}`, 14, 35);
    doc.text(`Company: ${job.company}`, 14, 42);
    doc.text(`Location: ${job.location}`, 14, 49);
    doc.text(`Apply From: ${job.applyFrom}`, 14, 56);
    doc.text(`Apply To: ${job.applyTo}`, 14, 63);
    doc.text(`Application Link: ${job.link}`, 14, 70);
    doc.text("Description:", 14, 80);
    doc.text(job.description || "No description provided", 14, 88, { maxWidth: 180 });
    doc.save(`${job.title}_Details.pdf`);
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);


  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {message && (
        <div
          className={`fixed top-6 right-6 z-50 rounded-xl shadow-lg px-6 py-4 text-white font-medium transition-all duration-500 ${messageType === "success" ? "bg-green-600" : "bg-red-600"
            }`}
        >
          {message}
        </div>
      )}

      <Card className="max-w-6xl mx-auto shadow-lg">
        <CardHeader className="flex flex-col md:flex-row justify-between items-center gap-4">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            💼 Manage Job Postings
          </CardTitle>

          <Input
            placeholder="Search by title, company, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded w-full md:w-80"
          />
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>Job ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Apply From</TableHead>
                <TableHead>Apply To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredJobs.length ? (
                filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.id}</TableCell>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.company}</TableCell>
                    <TableCell>{job.location}</TableCell>

                    <TableCell>{new Date(job.applyFrom).toLocaleString()}</TableCell>
                    <TableCell>{new Date(job.applyTo).toLocaleString()}</TableCell>

                    <TableCell>
                      <Badge variant={job.status === "Active" ? "default" : "secondary"}>
                        {job.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex justify-center gap-3">
                        <Button size="sm" variant="outline" onClick={() => { setSelectedJob(job); setShowViewDialog(true); }}>
                          View
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setJobToDelete(job);
                            setShowDeleteDialog(true);
                          }}
                        >
                          Delete
                        </Button>

                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="8" className="text-center text-gray-500">
                    No job postings found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{jobToDelete?.title}</strong>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogFooter>
      </Dialog>


      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogHeader>
          <DialogTitle>{selectedJob?.title}</DialogTitle>
          <DialogDescription>Job Details</DialogDescription>
        </DialogHeader>

        <DialogContent>
          {selectedJob && (
            <div className="space-y-2 text-gray-700">
              <p><strong>Company:</strong> {selectedJob.company}</p>
              <p><strong>Location:</strong> {selectedJob.location}</p>
              <p><strong>Apply Period:</strong> {selectedJob.applyFrom} - {selectedJob.applyTo}</p>
              <p><strong>Application Link:</strong>
                <a
                  href={selectedJob.link}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {selectedJob.link}
                </a>
              </p>
              <p><strong>Description:</strong></p>
              <p className="whitespace-pre-line">{selectedJob.description}</p>
            </div>
          )}
        </DialogContent>

        <DialogFooter>
          <Button className="bg-blue-600 text-white" onClick={() => handleDownloadPDF(selectedJob)}>
            📄 Download PDF
          </Button>
          <Button variant="outline" onClick={() => setShowViewDialog(false)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>

    </div>
  );
}
