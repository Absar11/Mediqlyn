import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Player } from "@lottiefiles/react-lottie-player";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaStar } from "react-icons/fa";

const Myappointments = () => {
  const navigate = useNavigate();
  const { backendurl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  // ⭐ Review Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[+dateArray[1]]} ${dateArray[2]}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const initPayment = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendurl}/api/user/verify-payment`,
            response,
            { headers: { token } }
          );
          if (data.success) {
            getUserAppointments();
            toast.success(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const payOnline = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/online-payment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPayment(data.order);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Doctor", "Date", "Time", "Status"];
    const tableRows = [];

    filteredAppointments.forEach((item) => {
      tableRows.push([
        item.docData.name,
        slotDateFormat(item.slotDate),
        item.slotsTime,
        item.cancel ? "Cancelled" : item.iscompleted ? "Completed" : "Upcoming",
      ]);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Appointments", 14, 15);
    doc.save("appointments.pdf");
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const filteredAppointments = appointments.filter((item) => {
    if (filter === "all") return true;
    if (filter === "cancelled") return item.cancel;
    if (filter === "completed") return item.iscompleted;
    if (filter === "unpaid") return !item.payment && !item.cancel;
    return true;
  });

  const lastIndex = currentPage * appointmentsPerPage;
  const firstIndex = lastIndex - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  // ⭐️ Open Review Modal
  const openReviewModal = (doctor) => {
    setSelectedDoctor(doctor);
    setRating(0);
    setHoverRating(0);
    setComment("");
    setShowModal(true);
  };

  const submitReview = async () => {
    if (!rating || !comment.trim()) {
      toast.error("Please provide both rating and comment.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/add-review/${selectedDoctor._id}`,
        { rating, comment },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        setShowModal(false);
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="pb-12">
      <div className="mt-10 border-b pb-3 flex justify-between items-center">
        <p className="font-semibold text-zinc-700">My Appointments</p>
        <div className="flex gap-3 text-sm">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border px-3 py-1 rounded">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="unpaid">Unpaid</option>
          </select>
          <button
            onClick={exportToPDF}
            className="border px-3 py-1 rounded bg-[#d1ebe3] text-sm hover:bg-green-200 transition"
          >
            Export PDF
          </button>
        </div>
      </div>

      {currentAppointments.length === 0 ? (
        <div className="w-80 mx-auto mt-20">
          <Player
            autoplay
            loop
            src="https://assets9.lottiefiles.com/packages/lf20_iwmd6pyr.json"
            style={{ height: "250px", width: "250px" }}
          />
          <p className="text-center text-gray-500 mt-2">You have no appointments</p>
        </div>
      ) : (
        currentAppointments.map((item, index) => (
          <div key={index} className="grid grid-cols-[1fr_2fr] sm:flex gap-4 sm:gap-6 py-4 border-b">
            <img src={item.docData.image} alt="" className="w-32 bg-[#d1ebe3]" />
            <div className="flex-1 text-sm text-zinc-600">
              <p className="font-semibold text-neutral-800">{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className="mt-1 font-medium text-zinc-700">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                Date & Time: <span className="text-sm font-medium text-neutral-700">{slotDateFormat(item.slotDate)} | {item.slotsTime}</span>
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancel && item.payment && !item.iscompleted && (
                <button className="sm:min-w-48 py-2 border text-stone-500 rounded bg-[#d1ebe3]">Paid</button>
              )}
              {!item.cancel && !item.payment && !item.iscompleted && (
                <>
                  <button onClick={() => payOnline(item._id)} className="text-sm py-2 border rounded-full hover:bg-primary hover:text-white transition">
                    Pay Online
                  </button>
                  <button onClick={() => cancelAppointment(item._id)} className="text-sm py-2 border rounded-full hover:bg-red-400 hover:text-white transition">
                    Cancel Appointment
                  </button>
                </>
              )}
              {item.cancel && <button className="sm:min-w-48 py-2 border border-red-500 text-red-500 rounded-sm">Cancelled</button>}
              {!item.cancel && item.iscompleted && (
                <>
                  <button className="sm:min-w-48 py-2 border text-stone-500 rounded bg-[#d1ebe3]">Completed</button>
                  {!item.docData.reviews?.some((rev) => rev.userId === item.userId) && (
                    <button onClick={() => openReviewModal(item.docData)} className="text-sm py-2 border rounded-full text-blue-600 hover:bg-blue-50">
                      Leave Review
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))
      )}

      {filteredAppointments.length > appointmentsPerPage && (
        <div className="flex justify-center mt-6 gap-3">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
          <span className="px-3 py-1">{currentPage} / {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
        </div>
      )}

      {/* ⭐️ Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Leave a Review for {selectedDoctor?.name}</h2>

            <div className="flex justify-center mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className="cursor-pointer text-2xl"
                  color={(hoverRating || rating) >= star ? "#facc15" : "#d1d5db"}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            <textarea
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
              className="w-full border px-3 py-2 rounded mb-4"
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={submitReview} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Myappointments;
