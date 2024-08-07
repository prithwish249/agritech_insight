import React, { useState ,useRef} from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import appleImage from "../images/apple.jpg";
import papayaImage from "../images/papaya.jpg";
import bananaImage from "../images/banana.jpg";
import orangeImage from "../images/orange.jpg";
import riceImage from "../images/rice.jpg";
import maizeImage from "../images/maize.jpg";
import chickpeaImage from "../images/chickpea.jpg";
import kidneybeansImage from "../images/kidneybeans.jpg";
import pigeonpeasImage from "../images/pigeonpeas.jpg";
import mothbeansImage from "../images/mothbeans.jpg";
import mungbeanImage from "../images/mungbean.jpg";
import blackgramImage from "../images/blackgram.jpg";
import lentilImage from "../images/lentil.jpg";
import pomegranateImage from "../images/pomegranate.jpg";
import watermelonImage from "../images/watermelon.jpg";
import muskmelonImage from "../images/muskmelon.jpg";
import coconutImage from "../images/coconut.jpg";
import cottonImage from "../images/cotton.jpg";
import juteImage from "../images/jute.jpg";
import coffeeImage from "../images/coffee.jpg";
import mangoImage from "../images/mango.jpg";
import grapesImage from "../images/grapes.jpg";

const CropPrediction = () => {
  const [ph, setPh] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [hydration, setHydration] = useState("");
  const [rainfall, setRainfall] = useState(""); // New input state for rainfall
  const [temperature, setTemperature] = useState(""); // New input state for temperature
  const [cropResult, setCropResult] = useState("");
  const [error, setError] = useState("");
  const componentRef = useRef();

  const handleDownloadPDF = () => {
    html2pdf(componentRef.current, {
      margin: 0.5,
      filename: "crop_prediction.pdf",
      jsPDF: {
        unit: "in",
        format: "A4",
        orientation: "portrait",
      },
      html2canvas: {
        scale: 2,
      },
    });
  };
  const handleSubmit = async () => {
    try {
      if (
        !nitrogen ||
        !phosphorus ||
        !potassium ||
        !temperature ||
        !hydration ||
        !ph ||
        !rainfall
      ) {
        setError("Please fill in all the fields.");
        return;
      }
      if (
        isNaN(parseFloat(nitrogen)) ||
        isNaN(parseFloat(phosphorus)) ||
        isNaN(parseFloat(potassium)) ||
        isNaN(parseFloat(temperature)) ||
        isNaN(parseFloat(hydration)) ||
        isNaN(parseFloat(ph)) ||
        isNaN(parseFloat(rainfall)) ||
        parseFloat(nitrogen) < 0 ||
        parseFloat(nitrogen) > 100 ||
        parseFloat(phosphorus) < 0 ||
        parseFloat(phosphorus) > 100 ||
        parseFloat(potassium) < 0 ||
        parseFloat(potassium) > 100 ||
        parseFloat(temperature) < 0 ||
        parseFloat(temperature) > 55 ||
        parseFloat(hydration) < 0 ||
        parseFloat(ph) < 0 ||
        parseFloat(ph) > 14 ||
        parseFloat(rainfall) < 0 ||
        parseFloat(rainfall) > 1000
      ) {
        setError(
          "Please fill in all the fields with valid values. Be careful! Nitrogen, Phosphorus, Potassium, Humidity, and Rainfall values should be between 0-100. Temperature should be between 0-55. pH value should be between 0-14."
        );

        return;
      }

      // Construct the JSON data object
      const data = {
        N: nitrogen,
        P: phosphorus,
        K: potassium,
        temperature: temperature,
        humidity: hydration,
        ph: ph,
        rainfall: rainfall,
      };

      // Make a POST request to the Flask API endpoint
      const response = await axios.post(
        "https://crop-prediction-api-h3sn.onrender.com/predict",
        data
      );

      // Set the predicted crop result received from the API response
      setCropResult(response.data.predicted_label);

      // Clear any previous errors
      setError("");
    } catch (error) {
      // Handle error and set error state
      setError(
        "An error occurred while processing your request. Please try again."
      );
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4"ref={componentRef}>
      <h1 className="text-3xl  font-mono font-semibold text-center  mb-4">
        CROP PREDICTION
      </h1>
      <div className="bg-blue-200   border border-blue-700 p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="ph">
              pH Value:
            </label>
            <input
              type="text"
              id="ph"
              placeholder="Enter pH Value (1-14)"
              className="w-full border border-black bg-white rounded-lg p-2 outline-none"
              value={ph}
              onChange={(e) => setPh(e.target.value)}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="nitrogen"
            >
              Nitrogen Value:
            </label>
            <input
              type="text"
              id="nitrogen"
              placeholder="Enter Nitrogen Value (%)"
              className="w-full  border border-black bg-white rounded-lg p-2 outline-none"
              value={nitrogen}
              onChange={(e) => setNitrogen(e.target.value)}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phosphorus"
            >
              Phosphorus Value:
            </label>
            <input
              type="text"
              id="phosphorus"
              placeholder="Enter Phosphorus Value (%)"
              className="w-full  border border-black bg-white rounded-lg p-2 outline-none"
              value={phosphorus}
              onChange={(e) => setPhosphorus(e.target.value)}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="potassium"
            >
              Potassium Value:
            </label>
            <input
              type="text"
              id="potassium"
              placeholder="Enter Potassium Value (%)"
              className="w-full  border border-black bg-white rounded-lg p-2 outline-none"
              value={potassium}
              onChange={(e) => setPotassium(e.target.value)}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="rainfall"
            >
              Rainfall (mm):
            </label>
            <input
              type="text"
              id="rainfall"
              placeholder="Enter Rainfall in mm"
              className="w-full  border border-black bg-white rounded-lg p-2 outline-none"
              value={rainfall}
              onChange={(e) => setRainfall(e.target.value)}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="temperature"
            >
              Temperature (°C):
            </label>
            <input
              type="text"
              id="temperature"
              placeholder="Enter Temperature in °C"
              className="w-full bg-white  border border-black rounded-lg p-2 outline-none"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="hydration"
            >
              Hydration Value:
            </label>
            <input
              type="text"
              id="hydration"
              placeholder="Enter Hydration Value (%)"
              className="w-full  border border-black bg-white rounded-lg p-2 outline-none"
              value={hydration}
              onChange={(e) => setHydration(e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <button
              className="bg-blue-500 border border-black hover:bg-blue-600 text-white p-3 rounded-lg w-[60%] sm:w-64 mx-auto block"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {!error && cropResult && (
        <div className="mt-4">
          <p className="text-center text-xl pb-4 font-bold font-mono text-green-700">
            Recommended Crop:{" "}
            {cropResult.charAt(0).toUpperCase() + cropResult.slice(1)}
          </p>
          <img
            src={(() => {
              switch (cropResult) {
                case "apple":
                  return appleImage;
                case "banana":
                  return bananaImage;
                case "orange":
                  return orangeImage;
                case "rice":
                  return riceImage;
                case "maize":
                  return maizeImage;
                case "chickpea":
                  return chickpeaImage;
                case "kidneybeans":
                  return kidneybeansImage;
                case "pigeonpeas":
                  return pigeonpeasImage;
                case "mothbeans":
                  return mothbeansImage;
                case "mungbean":
                  return mungbeanImage;
                case "blackgram":
                  return blackgramImage;
                case "lentil":
                  return lentilImage;
                case "pomegranate":
                  return pomegranateImage;
                case "watermelon":
                  return watermelonImage;
                case "muskmelon":
                  return muskmelonImage;
                case "coconut":
                  return coconutImage;
                case "cotton":
                  return cottonImage;
                case "jute":
                  return juteImage;
                case "coffee":
                  return coffeeImage;
                case "papaya":
                  return papayaImage;
                case "mango":
                  return mangoImage;
                case "grapes":
                  return grapesImage;
                default:
                  return ""; // Default to empty string or a placeholder image
              }
            })()}
            alt={cropResult}
            className="w-full max-w-sm mx-auto"
          />
        </div>
      )}

      {/* Render error message if there is an error */}
      {error && (
        <div className="mt-4">
          <p className="text-center font-mono font-bold text-red-500">
            {error}
          </p>
        </div>
      )}
       {!error && cropResult && (
        <div className="mt-4 flex justify-center">
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            onClick={handleDownloadPDF}
          >
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default CropPrediction;
