import React, { useState ,useEffect} from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import {useParams} from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"; // Icons for visibility toggle
import { Tooltip } from "react-tooltip";
import { FaBuilding, FaGlobe, FaCalendarAlt } from "react-icons/fa";

const Sidebar = ({ setActivePage }: { setActivePage: (page: string) => void }) => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-6 space-y-4 fixed">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <button className="w-full text-left p-3 rounded-lg hover:bg-gray-700" onClick={() => setActivePage("company")}>
        Company
      </button>
      <button className="w-full text-left p-3 rounded-lg hover:bg-gray-700" onClick={() => setActivePage("queries")}>
        Queries
      </button>
      <button className="w-full text-left p-3 rounded-lg hover:bg-gray-700" onClick={() => setActivePage("api")}>
        API Tester
      </button>
    </div>
  );
};

const CompanyDetails = () => {
  const [company, setCompany] = useState<{ name: string; websiteUrl: string; createdAt: string; updatedAt: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {webId}=useParams();
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/website/${webId}`); // Replace dynamically
        setCompany(response.data);
      } catch (err) {
        setError("Failed to load company details");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyDetails();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="max-w-3xl w-full border border-gray-300 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Company Details</h1>

        {company && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition">
              <FaBuilding className="text-2xl text-gray-600" />
              <p className="text-lg font-medium text-gray-800">{company.name}</p>
            </div>

            <div className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition">
              <FaGlobe className="text-2xl text-gray-600" />
              <a href={company.websiteUrl} target="_blank" className="text-lg text-blue-600 hover:underline">
                {company.websiteUrl}
              </a>
            </div>

            <div className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition">
              <FaCalendarAlt className="text-2xl text-gray-600" />
              <p className="text-lg text-gray-700">Created: {new Date(company.createdAt).toLocaleString()}</p>
            </div>

            <div className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition">
              <FaCalendarAlt className="text-2xl text-gray-600" />
              <p className="text-lg text-gray-700">Updated: {new Date(company.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


const PastQueries = () => {
  const [queries, setQueries] = useState<
    { _id: string; query: string; response: { subject: string; body: string; status: string }; createdAt: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const {webId}=useParams();
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/query/${webId}`); // Replace with dynamic webId
        setQueries(response.data.queries);
      } catch (err) {
        setError("Failed to load queries");
      } finally {
        setLoading(false);
      }
    };
    fetchQueries();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Past Queries</h1>

      {queries.length === 0 ? (
        <p className="text-gray-600">No past queries found.</p>
      ) : (
        <div className="border border-gray-300 rounded-lg shadow-lg p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left p-3">Query</th>
                <th className="text-left p-3">Response Subject</th>
                <th className="text-left p-3">Response Body</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((q) => (
                <tr key={q._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">{q.query}</td>
                  <td className="p-3 font-medium">{q.response?.subject || "No subject"}</td>
                  <td className="p-3 text-gray-700">{q.response?.body || "No response body"}</td>
                  <td className={`p-3 font-medium ${q.response?.status === "resolved" ? "text-green-600" : "text-red-600"}`}>
                    {q.response?.status || "Pending"}
                  </td>
                  <td className="p-3 text-gray-600">{new Date(q.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};



const ApiTester = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<{ subject: string; body: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
const {webId}=useParams();
const [visible, setVisible] = useState(false);

  const fetchQueryResponse = async () => {
    if (!webId || !query) {
      alert("Please enter an API Key and Query");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/query",
        { query, userId: "12345" },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": webId,
          },
        }
      );
      setResponse(res.data.response);
      setIsOpen(true);
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse(null);
    }
    setLoading(false);
  };

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold">Fancy Query Tester</h1>
      <div className="mt-4 flex flex-col space-y-4">
        
     <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 border border-gray-300 w-full max-w-lg">
      {/* Left Side - Label & Web ID */}
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-gray-700">Web ID:</span>
        <input
          type={visible ? "text" : "password"}
          value={webId}
          readOnly
          className="bg-transparent border-none outline-none text-gray-800 font-mono w-40"
        />
        <button
          onClick={() => setVisible(!visible)}
          className="text-gray-500 hover:text-gray-700 transition"
          data-tooltip-id="toggle-visibility"
        >
          {visible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        <Tooltip id="toggle-visibility">{visible ? "Hide" : "Show"}</Tooltip>
      </div>

      {/* Right Side - Last Updated */}
     
    </div>
        <input
          type="text"
          placeholder="Enter Query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-3 text-black rounded-lg border bg-white bg-opacity-70 placeholder-gray-500  focus:ring-2 focus:ring-blue-400"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchQueryResponse}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-xl shadow-lg transition-all w-[100px] mx-auto"
        >
          {loading ? "Loading..." : "Test"}
        </motion.button>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex items-center justify-center bg-transparent">
          <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-6 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-gray-900">Response</h2>
            <div className="mt-4 text-gray-800">
              {response ? (
                <>
                  <p className="font-bold text-lg">Subject: {response.subject}</p>
                  <p className="mt-2">{response.body}</p>
                </>
              ) : (
                <p>No response received</p>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

const Testing= () => {
  const [activePage, setActivePage] = useState("company");

  return (
    <div className="flex">
      <Sidebar setActivePage={setActivePage} />
      <div className="ml-64 w-full p-6">
        {activePage === "company" && <CompanyDetails />}
        {activePage === "queries" && <PastQueries />}
        {activePage === "api" && <ApiTester />}
      </div>
    </div>
  );
};

export default Testing;
