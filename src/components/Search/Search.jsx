import React, { useState } from "react";
import { FAKE_DATA_PHONES } from "../../api/FakeData/DataPhones";

const Search = () => {
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;
    
    const filteredResults = FAKE_DATA_PHONES.filter((phone) =>
      phone.name && phone.name.toLowerCase().includes(query.toLowerCase())
    );
    // Lưu kết quả tìm kiếm vào state
    setResults(filteredResults);
  };

  return (
    <div className="flex relative">
      <button>
        <input
        type="search"
        class="peer block min-h-auto w-full rounded-2xl border bg-transparent px-8 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-blue-600 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id="Searcha"
        placeholder="Type query"
        onChange={handleSearch} />
      <label
        for="Searcha"
        class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
          Tìm kiếm</label>
        <ul className="absolute right-0 w-60 mt-2 overflow-visible bg-white border border-gray-300 rounded-md shadow-lg">
          {results.map((result) => (
            <a href="">
            <li key={result._id} class="flex relative">
              <img src={result.image} class="w-6 h-6 mt-[0.3rem]"/> 
              <p href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white">
                {result.name}
              </p>
            </li>
            </a>
          ))}
        </ul>
      </button>
    </div>
  );
};

export default Search;