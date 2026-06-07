import React, { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const SymptomChecker = () => {
    // 1. Available symptoms ki list
    // Update this array in SymptomChecker.jsx
    const allSymptoms = [
        "Fever", "Cough", "Chest Pain", "Shortness of Breath",
        "Stomach Ache", "Acidity", "Vomiting",
        "Skin Rash", "Acne", "Hair Fall",
        "Severe Headache", "Dizziness", "Memory Loss",
        "Irregular Periods", "Child Fever"
    ];
    const { userData, setUserData, token, backendURL, loadUserProfileData } = useContext(AppContext);

    const navigate = useNavigate();

    // 2. User ne jo select kiya uski state
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [prediction, setPrediction] = useState("");
    const [loading, setLoading] = useState(false);

    // Checkbox toggle logic
    const handleToggle = (symptom) => {
        if (selectedSymptoms.includes(symptom)) {
            setSelectedSymptoms(selectedSymptoms.filter(item => item !== symptom));
        } else {
            setSelectedSymptoms([...selectedSymptoms, symptom]);
        }
    };

    // 3. API Call to Node.js Backend
    const getPrediction = async () => {
        if (selectedSymptoms.length === 0) return toast.error("Please select symptoms!");

        setLoading(true);
        setPrediction(''); // Purani prediction clear kar do

        try {
            // Node.js backend par request bhej rahe hain
            const { data } = await axios.post(`${backendURL}/api/ai/predict-specialist`, {
                symptoms: selectedSymptoms
            });

            if (data.success) {
                setPrediction(data.specialist);
            } else {
                toast.error(data.message || "Failed to get prediction");
            }
        } catch (error) {
            toast.error("Server Error. Please try again later.");
        }
        setLoading(false);
    };

    return (
        // 🌟 YEH HAI WO MAIN PARENT DIV JO MISSING THA 🌟
        <div className="p-5 max-w-4xl mx-auto min-h-[60vh]">
            <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">What are you feeling?</h2>

            {/* Display Checkboxes (3 Columns & Pro UI) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                {allSymptoms.map((sym, index) => {
                    const isSelected = selectedSymptoms.includes(sym);
                    return (
                        <label
                            key={index}
                            className={`flex items-center gap-3 cursor-pointer border p-4 rounded-xl transition-all duration-200
                                ${isSelected
                                    ? 'bg-primary/10 border-primary/20 text-primary shadow-sm'
                                    : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-secondary/30 hover:shadow-md'
                                }
                            `}
                        >
                            <input
                                type="checkbox"
                                className="w-5 h-5 accent-primary cursor-pointer"
                                checked={isSelected}
                                onChange={() => handleToggle(sym)}
                            />
                            <span className="font-medium text-sm">{sym}</span>
                        </label>
                    );
                })}
            </div>

            {/* Find Specialist Button */}
            <div className="flex justify-center">
                <button
                    onClick={getPrediction}
                    disabled={loading}
                    className="bg-primary text-white px-10 py-3 rounded-full cursor-pointer hover:bg-secondary hover:scale-105 hover:shadow-lg transition-all duration-300 text-lg"
                >
                   {loading ? 'Analyzing Symptoms...' : 'Find Specialist'}
                </button>
            </div>

            {/* Display Result & Redirect Button */}
            {prediction && (
                <div className="mt-12 p-8 bg-primary/10 border border-primary/20 rounded-2xl text-center shadow-sm max-w-2xl mx-auto">
                    <p className="text-gray-600 mb-2 text-lg">Based on your symptoms, our AI recommends:</p>
                    <p className="text-3xl font-bold text-primary mb-6">{prediction}</p>

                    <button
                        onClick={() => navigate(`/doctors/${prediction}`)}
                        className="bg-primary text-white px-8 py-3 rounded-full hover:bg-secondary transition-all shadow-md text-lg cursor-pointer"
                    >
                        Book Appointment with {prediction}
                    </button>
                </div>
            )}
        </div>
    );

};

export default SymptomChecker;