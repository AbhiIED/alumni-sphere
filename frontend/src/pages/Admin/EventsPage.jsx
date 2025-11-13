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
import autoTable from "jspdf-autotable";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    location: "",
    type: "Offline",
    link: "",
    description: "",
    image: "",
  });

  const [editEvent, setEditEvent] = useState({});

  // ✅ Fetch all events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/events");
        const data = await res.json();

        setEvents(
          data.map((e) => ({
            id: e.Event_ID,
            name: e.Event_Name,
            description: e.Event_Description,
            date: e.Event_Date,
            type: e.Event_Type === 1 ? "Online" : "Offline",
            link: e.Event_Link,
            location: e.Event_Location,
            image: e.Event_Image,
          }))
        );
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  // ✅ Auto-hide messages
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // ✅ Add Event
  const handleAddEvent = async () => {
    if (!newEvent.name || !newEvent.date || !newEvent.location) {
      setMessageType("error");
      setMessage("⚠️ Please fill all required fields!");
      return;
    }

    const token = localStorage.getItem("token");

    const eventData = {
      Event_ID: "EVT" + Date.now().toString().slice(-5),
      Event_Name: newEvent.name,
      Event_Description: newEvent.description,
      Event_Date: newEvent.date,
      Creation_Date: new Date().toISOString().split("T")[0],
      Event_Type: newEvent.type === "Online" ? 1 : 0,
      Event_Link: newEvent.type === "Online" ? newEvent.link : "",
      Event_Location: newEvent.location,
      Event_Image: newEvent.image || "",
    };

    try {
      const res = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });

      if (res.ok) {
        setEvents([...events, {
          id: eventData.Event_ID,
          name: newEvent.name,
          description: newEvent.description,
          date: newEvent.date,
          type: newEvent.type,
          link: newEvent.link,
          location: newEvent.location,
          image: newEvent.image,
        }]);
        setShowAddDialog(false);
        setNewEvent({ name: "", date: "", location: "", type: "Offline", link: "", description: "", image: "" });
        setMessageType("success");
        setMessage("🎉 Event added successfully!");
      } else {
        const data = await res.json();
        setMessageType("error");
        setMessage(data.error || "❌ Failed to add event.");
      }
    } catch (err) {
      console.error("Add Event Error:", err);
      setMessageType("error");
      setMessage("❌ Network error while adding event.");
    }
  };

  // ✅ Edit Event
  const handleEditSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:5000/events/${editEvent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Event_Name: editEvent.name,
          Event_Description: editEvent.description,
          Event_Date: editEvent.date,
          Event_Type: editEvent.type === "Online" ? 1 : 0,
          Event_Link: editEvent.link,
          Event_Location: editEvent.location,
          Event_Image: editEvent.image,
        }),
      });

      if (res.ok) {
        setEvents(events.map(e => e.id === editEvent.id ? editEvent : e));
        setShowEditDialog(false);
        setMessageType("success");
        setMessage("✅ Event updated successfully!");
      } else {
        const data = await res.json();
        setMessageType("error");
        setMessage(data.error || "❌ Failed to update event.");
      }
    } catch (err) {
      console.error("Update Event Error:", err);
      setMessageType("error");
      setMessage("❌ Network error while updating event.");
    }
  };

  // ✅ Delete Event
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/events/${selectedEvent.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setEvents(events.filter((e) => e.id !== selectedEvent.id));
        setShowDeleteDialog(false);
        setMessageType("success");
        setMessage("🗑️ Event deleted successfully!");
      } else {
        const data = await res.json();
        setMessageType("error");
        setMessage(data.error || "❌ Failed to delete event.");
      }
    } catch (err) {
      console.error("Delete Event Error:", err);
      setMessageType("error");
      setMessage("❌ Network error while deleting event.");
    }
  };

  // ✅ Export PDF
  const handleDownloadReport = (event) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("🎓 Event Summary Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Event Name: ${event.name}`, 14, 35);
    doc.text(`Date: ${event.date}`, 14, 42);
    doc.text(`Type: ${event.type}`, 14, 49);
    doc.text(`Location: ${event.location}`, 14, 56);
    if (event.link) doc.text(`Link: ${event.link}`, 14, 63);
    doc.text(`Description: ${event.description}`, 14, 70);
    doc.save(`${event.name}_Report.pdf`);
  };

  // ✅ Filter + Search
  const filteredEvents = events.filter((event) => {
    const matchesStatus =
      filterStatus === "All" || event.type === filterStatus;
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* ✅ Toast Message */}
      {message && (
        <div
          className={`fixed top-6 right-6 z-50 rounded-xl shadow-lg px-6 py-4 text-white font-medium transition-all duration-500 ${
            messageType === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message}
        </div>
      )}

      <Card className="max-w-6xl mx-auto shadow-lg">
        <CardHeader className="flex flex-col md:flex-row justify-between items-center gap-4">
          <CardTitle className="text-2xl font-semibold text-gray-800">🎉 Manage Events</CardTitle>

          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <Input
              placeholder="Search events..."
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
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
            <Button onClick={() => setShowAddDialog(true)} className="bg-green-600 hover:bg-green-700 text-white">
              + Add Event
            </Button>
          </div>
        </CardHeader>

        {/* Table */}
        <CardContent>
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>Event Id</TableHead>
                <TableHead>Event Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.length ? (
                filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.id}</TableCell>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                      <br />
                      <span className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={event.type === "Online" ? "default" : "secondary"}>
                        {event.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-3">
                        <Button size="sm" variant="outline" onClick={() => { setSelectedEvent(event); setShowViewDialog(true); }}>
                          View
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => { setEditEvent({ ...event }); setShowEditDialog(true); }}>
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => { setSelectedEvent(event); setShowDeleteDialog(true); }}>
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="6" className="text-center text-gray-500">
                    No events found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 🔹 View Event */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogHeader>
          <DialogTitle>{selectedEvent?.name}</DialogTitle>
          <DialogDescription>Event Details</DialogDescription>
        </DialogHeader>
        <DialogContent>
          {selectedEvent && (
            <div className="space-y-2 text-gray-700">
              <p><strong>Date:</strong> {selectedEvent.date}</p>
              <p><strong>Type:</strong> {selectedEvent.type}</p>
              <p><strong>Location:</strong> {selectedEvent.location}</p>
              {selectedEvent.link && <p><strong>Link:</strong> {selectedEvent.link}</p>}
              <p><strong>Description:</strong> {selectedEvent.description}</p>
              {selectedEvent.image && <img src={selectedEvent.image} alt="Event" className="rounded-lg mt-3" />}
            </div>
          )}
        </DialogContent>
        <DialogFooter>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => handleDownloadReport(selectedEvent)}>
            📄 Download Report
          </Button>
          <Button variant="outline" onClick={() => setShowViewDialog(false)}>Close</Button>
        </DialogFooter>
      </Dialog>

      {/* 🔹 Add Event */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <div className="space-y-3">
            <Input placeholder="Event Name" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
            <Input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
            <select value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })} className="w-full border rounded p-2">
              <option value="Offline">Offline</option>
              <option value="Online">Online</option>
            </select>
            <Input placeholder={newEvent.type === "Online" ? "Event Link" : "Venue"} value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} />
            <textarea placeholder="Description" className="w-full border rounded p-2" rows="3" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}></textarea>
            <Input type="text" placeholder="Image URL (optional)" value={newEvent.image} onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })} />
          </div>
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddEvent} className="bg-green-600 text-white">Add Event</Button>
        </DialogFooter>
      </Dialog>

      {/* 🔹 Edit Event */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <div className="space-y-3">
            <Input value={editEvent.name} onChange={(e) => setEditEvent({ ...editEvent, name: e.target.value })} />
            <Input type="date" value={editEvent.date} onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })} />
            <select value={editEvent.type} onChange={(e) => setEditEvent({ ...editEvent, type: e.target.value })} className="w-full border rounded p-2">
              <option value="Offline">Offline</option>
              <option value="Online">Online</option>
            </select>
            <Input value={editEvent.location} onChange={(e) => setEditEvent({ ...editEvent, location: e.target.value })} />
            <textarea className="w-full border rounded p-2" rows="3" value={editEvent.description} onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })}></textarea>
            <Input value={editEvent.image} onChange={(e) => setEditEvent({ ...editEvent, image: e.target.value })} />
          </div>
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditSave} className="bg-blue-600 text-white">Save</Button>
        </DialogFooter>
      </Dialog>

      {/* 🔹 Delete Confirmation */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <DialogDescription className="p-4">
          Are you sure you want to delete <strong>{selectedEvent?.name}</strong>? This action cannot be undone.
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
