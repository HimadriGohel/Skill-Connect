import React, { useState } from "react";

function Accordion({ handleApplyFilter }) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedhourlyPay, setSelectedhourlyPay] = useState([]);
   const [customPrice, setCustomPrice] = useState("");


    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    const handleCityChange = (city) => {
        setSelectedCities((prev) =>
            prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
        );
    };
    const handleHourlyPayChange = (hourlyPay) => {
        setSelectedhourlyPay((prev) =>
            prev.includes(hourlyPay) ? prev.filter((c) => c !== hourlyPay) : [...prev, hourlyPay]
        );
    };

    const handleApply = () => {
        // Create a copy of selected hourly pays, excluding "Custom"
        const filteredPays = selectedhourlyPay.filter((pay) => pay !== "Custom");
        // If custom is selected and a price is entered, add it to the pays
        if (selectedhourlyPay.includes("Custom") && customPrice) {
            filteredPays.push(customPrice);
        }

        if (selectedhourlyPay.includes("Custom") && (!customPrice || isNaN(customPrice))) {
          alert("please enter valid price");
          return;
         }

        handleApplyFilter({
            category: selectedCategories,
            city: selectedCities,
            hourlyPay: filteredPays,
    
        });
    };

    return (
        <div className="accordion" id="accordionExample">

            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="false"
                        aria-controls="collapseOne">
                        Categories
                    </button>
                </h2>
                <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <ul>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Cleaning"
                                        onChange={() =>
                                            handleCategoryChange("Cleaning")
                                        }
                                    />
                                    Cleaning
                                </label>
                            </li>

                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Construction"
                                        onChange={() =>
                                            handleCategoryChange("Construction")
                                        }
                                    />
                                    Construction
                                </label>
                            </li>

                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Bathroom service"
                                        onChange={() =>
                                            handleCategoryChange("Bathroom service")
                                        }
                                    />
                                    Bathroom Service
                                </label>
                            </li>

                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Carpentry"
                                        onChange={() =>
                                            handleCategoryChange("Carpentry")
                                        }
                                    />
                                    Carpentry
                                </label>
                            </li>

                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Automobiles"
                                        onChange={() =>
                                            handleCategoryChange("Automobiles")
                                        }
                                    />
                                    Automobiles
                                </label>
                            </li>

                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Electricity"
                                        onChange={() =>
                                            handleCategoryChange("Electricity")
                                        }
                                    />
                                    Electricity
                                </label>
                            </li>

                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Doors service"
                                        onChange={() =>
                                            handleCategoryChange("Doors service")

                                        }
                                    />
                                    Doors service
                                </label>
                            </li>

                           <li>
                           <label>
                            <input
                            type="checkbox"
                            value="Security"                  
                            onChange={() => handleCategoryChange("Security")}   
                             />
                             Security
                          </label>
                          </li>

                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Interior design"
                                        onChange={() =>
                                            handleCategoryChange("Interior design")
                                        }
                                    />
                                    Interior design
                                </label>
                            </li>

                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Roofing & Exterior painting"
                                        onChange={() =>
                                            handleCategoryChange("Roofing & Exterior painting")
                                        }
                                    />
                                    Roofing & Exterior painting
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo">
                        Cities
                    </button>
                </h2>
                <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample">

                    <div className="accordion-body">
                        <ul>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="surat"
                                        onChange={() =>
                                            handleCityChange("surat")
                                        }
                                    />
                                    Surat
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="rajkot"
                                        onChange={() =>
                                            handleCityChange("rajkot")
                                        }
                                    />
                                    Rajkot
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="bhavnagar"
                                        onChange={() =>
                                            handleCityChange("bhavnagar")
                                        }
                                    />
                                    Bhavnagar
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="ahmedabad"
                                        onChange={() =>
                                            handleCityChange("ahmedabad")
                                        }
                                    />
                                    Ahmedabad
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="vadodara"
                                        onChange={() =>
                                            handleCityChange("vadodara")
                                        }
                                    />
                                    Vadodara
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                    >
                        Budget
                    </button>
                </h2>
                <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                >
                    <div className="accordion-body">
                        <ul>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        id="customPriceInput"
                                        value="Custom"
                                        onChange={() =>
                                        handleHourlyPayChange("Custom")
                                        }
                                    />
                                    Custom Price
                                </label>
                                {selectedhourlyPay.includes("Custom") && (
                                    <div>
                                        <input
                                            type="number"
                                            value={customPrice}
                                            onChange={(e) => setCustomPrice(e.target.value)}
                                            placeholder="Enter Price"
                                        />
                                    </div>
                                )}
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="500"
                                        onChange={() =>
                                            handleHourlyPayChange("500")
                                        }
                                    />
                                    Up to 500
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="1000"
                                        onChange={() =>
                                            handleHourlyPayChange("1000")
                                        }
                                    />
                                    Up to 1000
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Above1000"
                                        onChange={() =>
                                            handleHourlyPayChange("Above1000")
                                        }
                                    />
                                    Above 1000
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end">
                <button className="apply-btn primary-btn m-2" onClick={handleApply}>
                    Apply
                </button>
            </div>
        </div>
    );
}

export default Accordion;