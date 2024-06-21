import React from "react";

const HomePage = () => {
  return (
    <div className="mx-[30px] mt-3 xl:mx-[150px] xl:mt-[50px] font-primaryFont">
      <form className="flex flex-col space-y-3 xl:flex xl:flex-row xl:items-center xl:justify-between">
        <select className="w-[330px] xl:w-[300px] border-2 border-gray-300 px-[10px] py-[4px] rounded-[3px]">
          <option disabled>Location</option>
          <option>Tenkasi</option>
          <option>Surandai</option>
          <option>Tirunelveli</option>
        </select>
        <div className="flex items-center space-x-2">
          <select className="border-2 border-gray-300 w-[200px] px-[10px] py-[4px] rounded-[3px]">
            <option disabled>From</option>
            <option>Tenkasi</option>
            <option>Surandai</option>
            <option>Tirunelveli</option>
          </select>
          <select className="border-2 border-gray-300 w-[200px] px-[10px] py-[4px] rounded-[3px]">
            <option disabled>To</option>
            <option>Tenkasi</option>
            <option>Surandai</option>
            <option>Tirunelveli</option>
          </select>
        </div>
      </form>
      <section className="flex items-baseline justify-between mt-10">
        <div className="flex items-center justify-between w-[550px]">
          <div>
            <h1 className="font-bold text-[23px]">Ganapathy</h1>
            <p className="text-[15px]">Surandai to Puliyankudi</p>
            <p className="text-[15px]">2.00 PM</p>
          </div>
          <div className="bg-red-500 px-4 py-3 font-bold rounded-full">G</div>
        </div>
        <div className="border-2 border-gray-300 w-[600px] h-[400px] hidden xl:block">
            <p>Click bus and find routes</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
