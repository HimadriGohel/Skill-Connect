import React, { useEffect, useState, useMemo } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../components/ui/Table/table.jsx";
import { Popover, PopoverTrigger, PopoverContent } from "../../components/ui/Popover/popover.jsx";
import { MoreHorizontal } from "lucide-react";
import "../../components/ui/Table/Table.css";
import axios from "axios";

const App = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [openPopoverId, setOpenPopoverId] = useState(null); // ✅ Track which popover is open

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/v1/workers/fetchRequest",
                    { withCredentials: true }
                );
                console.log("API Response:", response.data);
                setData(response.data?.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [updateTrigger]);

    const statusHandler = async (status, workerId, userId) => {
        if (!userId) {
            console.error("Missing userId", userId);
        }
        if (!workerId) {
            console.error("Missing workerId");
        }

        console.log("Updating status for:", { workerId, userId, status });

        try {
            const formattedStatus = status.toLowerCase();
            const res = await axios.post(
                "http://localhost:8000/api/v1/hiring/updateHireRequest",
                { workerId, userId, status: formattedStatus },
                { withCredentials: true }
            );

            if (res.data.success) {
                console.log("Status updated successfully:", res.data.message);
                setUpdateTrigger((prev) => !prev);
                setOpenPopoverId(null); 
            }
        } catch (error) {
            console.error("Error updating status:", error.response?.data || error);
        }
    };

    const shortListingStatus = useMemo(() => ["Accepted", "Rejected"], []);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Fullname</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? (
                    <TableRow>
                        <TableCell colSpan="7" className="text-center">Loading...</TableCell>
                    </TableRow>
                ) : data.length > 0 ? (
                    data.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item.user?.fullName || "N/A"}</TableCell>
                            <TableCell>{item.user?.email || "N/A"}</TableCell>
                            <TableCell>{item.user?.phone || "N/A"}</TableCell>
                            <TableCell>{item.user?.address || "N/A"}</TableCell>
                            <TableCell>{item.status || "Pending"}</TableCell>
                            <TableCell>{new Date(item.requestDate).toISOString().split("T")[0]}</TableCell>
                            <TableCell>
                                <Popover className="popover-content" open={openPopoverId === item._id} onOpenChange={() => setOpenPopoverId(openPopoverId === item._id ? null : item._id)}>
                                    <PopoverTrigger onClick={() => setOpenPopoverId(item._id)}>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        {shortListingStatus.map((status, index) => (
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    console.log("Full item object:", item);
                                                    statusHandler(status, item.worker?._id, item.user?._id);
                                                }}
                                                style={{ cursor: "pointer", padding: "5px 10px" }}
                                            >
                                                <span>{status}</span>
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan="7" className="text-center">No data available</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default App;