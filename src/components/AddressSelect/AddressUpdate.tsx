"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Label, Select } from 'flowbite-react';


function AddressUpdate({
  setProvince = () => {}, 
  setDistrict = () => {}, 
  setWard = () => {},
  address} : any){
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const host = 'https://provinces.open-api.vn/api/';

  useEffect(() => {
    callAPI(`${host}p?depth=2`);
    console.log(address);
  }, []);

  const callAPI = (api: string) => {
    axios.get(api).then((response) => {
      setCities(response.data);
    });
  };

  const callApiDistrict = (api: string) => {
    axios.get(api).then((response) => {
      setDistricts(response.data.districts);
      console.log(response.data.name);
      setProvince(response.data.name)
    });
  };

  const callApiWard = (api: string) => {
    axios.get(api).then((response) => {
      setWards(response.data.wards);
      console.log(response.data.name)
      setDistrict(response.data.name);
    });
  };

  const callNameWard = (api: string) => {
    axios.get(api).then((response) => {
      setWard(response.data.name);
      console.log(response.data.name);
    })
  }

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityCode = event.target.value;
    setSelectedCity(cityCode);
    setSelectedDistrict('');
    setSelectedWard('');
    if (cityCode) {
      callApiDistrict(`${host}p/${cityCode}?depth=2`);
    }

    console.log('');
  };

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const districtCode = event.target.value;
    setSelectedDistrict(districtCode);
    setSelectedWard('');
    if (districtCode) {
      callApiWard(`${host}d/${districtCode}?depth=2`);
    }
    //console.log(districts);
  };

  const handleWardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWard(event.target.value);
    const wardCode = event.target.value;
    if (wardCode) {
      callNameWard(`${host}w/${wardCode}?depth=2`);
    }
    setWard(event.target.value);
  };

  return (
    <div className=' flex justify-between pl-3'>
      <Select className=' my-1 w-60' id="city" value={selectedCity} onChange={handleCityChange}>
        <option value={selectedCity} disabled>
          Chọn tỉnh thành
        </option>
        {cities.map((city: any) => (
          <option key={city.code} value={city.code}>
            {city.name}
          </option>
        ))}
      </Select>

      <Select className=' my-1 w-60' id="district" value={selectedDistrict} onChange={handleDistrictChange}>
        <option value={selectedDistrict} disabled>
          Chọn quận huyện
        </option>
        {districts.map((district: any) => (
          <option key={district.code} value={district.code}>
            {district.name}
          </option>
        ))}
      </Select>

      <Select className=' my-1 w-60' id="ward" value={selectedWard} onChange={handleWardChange}>
        <option value={selectedCity} disabled>
          Chọn phường xã
        </option>
        {wards.map((ward: any) => (
          <option key={ward.code} value={ward.code}>
            {ward.name}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default AddressUpdate;